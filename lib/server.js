const Hapi = require('hapi');
const conf = require('../config');

const server = new Hapi.Server({ load: conf.get('/server/load') });
const port = conf.get('/server/port');

const EnforceSSLPlugin = require('../plugins/enforce-ssl');
const EndpointsPlugin = require('../plugins/endpoints');
const ApiProxyPlugin = require('../plugins/api-proxy');

server.connection({ port: port });

// Enforce SSL in production
server.register({
  register: EnforceSSLPlugin
}, function (/* err */) {

});

// Register Platform API proxy
server.register({
  register: ApiProxyPlugin
}, {}, function (/* err */) {

});

// Register HTTP endpoints
server.register({
  register: EndpointsPlugin,
  options: { route: { prefix: '/api' } }
}, function (/* err */) {

});

module.exports = server;
