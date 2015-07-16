const pkg = require('./package.json');

exports.register = function (server, options, next) {

  // implement your plugin here

  // if you depend on another plugin being registered first,
  // then declare that dependency here and specify a callback
  // to be executed after the depedencies are resolved
  // server.dependency(['uku-bearer-token', 'uku-heroku-client'], exports.ready);
  next();
};

// based on the example above, this will be
// be called if/when the uku-bearer-token
// and uku-heroku-client dependencies are
// resolved in the project registering this plugin
exports.ready = function (server, next) {

  // perhaps register some http endpoints?
  // server.route(require('./lib/routes'));

  next();
};

exports.register.attributes = {
  name: pkg.name,
  version: pkg.version
};
