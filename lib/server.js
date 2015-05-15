const Hapi = require('hapi');
const EndpointsPlugin = require('../plugins/endpoints');
const EnforceSSLPlugin = require('../plugins/enforce-ssl');
const conf = require('../config');

const server = new Hapi.Server({ load: conf.get('/server/load') });
const port = conf.get('/server/port');

server.connection({ port: port });

server.register({
  register: EnforceSSLPlugin
}, function (/* err */) {

});

server.register({
  register: EndpointsPlugin,
  options: {

    route: { prefix: '/api' }
  }
}, function (/* err */) {

});

module.exports = server;
