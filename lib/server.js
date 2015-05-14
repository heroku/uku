const Hapi = require('hapi');
const conf = require('../config');
const server = new Hapi.Server({ load: conf.get('/server/load') });

server.connection({ port: conf.get('/server/port') });
server.app.db = null;

var EndpointsPlugin = require('../plugins/endpoints');
server.register({
  register: EndpointsPlugin,
  options: { route: { prefix: '/api' } }
},function (err) {
  if (err) { console.error('Failed to load the Core API:', err); }
});

module.exports = server;
