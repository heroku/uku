require('./lib/newrelic');
const Glue = require('glue');
const Hoek = require('hoek');

exports.run = function (manifest, options) {
  // register plugins based on NODE_ENV
  // and convert them to `registrations` syntax
  // that the newer version of Glue expects
  let activePlugins = exports.activePlugins(process.env.NODE_ENV, manifest.plugins);
  manifest.registrations = [];

  for (var plugin in activePlugins) {
    manifest.registrations.push({
      plugin: {
        register: plugin,
        options: activePlugins[plugin]
      }
    });
  };
  delete manifest.plugins;

  return new Promise(function (resolve, reject) {
    try {
      // error(s) are silently ignored without wrapping this in a try/catch
      return Glue.compose(manifest, options, function (err, server) {

        exports.ready(err, server, resolve, reject);
      });
    } catch (glueError) { return reject(glueError); }
  });
};

exports.ready = function (err, server, resolve, reject) {

  if (err) {

    return reject(err);
  }

  else {

    return server.start(function () {

      return resolve(server);
    });
  }
};

exports.activePlugins = function (env, plugins) {

  if (!plugins) { return {}; }

  switch(env) {
    case 'production':
      return Hoek.applyToDefaults(Hoek.clone(plugins.always || {}), plugins.production || {});
    default:
      return plugins.always || {};
  }
};
