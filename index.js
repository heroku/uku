require('./lib/newrelic');
const Glue = require('glue');
const Hoek = require('hoek');

exports.run = function (manifest, options) {

  // register plugins based on NODE_ENV
  manifest.plugins = exports.activePlugins(process.env.NODE_ENV, manifest.plugins);

  return new Promise(function (resolve, reject) {

    return Glue.compose(manifest, options, function (err, server) {

      exports.ready(err, server, resolve, reject);
    });
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
  switch(env) {
    case 'production':
      return Hoek.applyToDefaults(Hoek.clone(plugins.always), plugins.production);
    default:
      return plugins.always;
  }
};
