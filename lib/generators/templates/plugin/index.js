exports.register = function (server, options, next) {

  const plugins = [

  ];

  // register all the plugins
  server.register(plugins, function (err) {
    exports.ready(err, server, next);
  });
};

exports.ready = function (err, server, next) {

  if (err) { throw err; }

  next();
};

exports.register.attributes = {
  name: '__plugin-name__',
  version: 1
};
