var info = require('../package.json');
var endpoints = require('../endpoints');

exports.register = function (server, options, next) {

  // Load up the endpoints
  endpoints.forEach(function(r) {
    server.route(r);
  });

  return next();
};

exports.register.attributes = {
  name: 'endpoints',
  version: info.version
};
