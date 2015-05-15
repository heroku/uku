const Hapi = require('hapi');
const conf = require('../config');

const server = new Hapi.Server({ load: conf.get('/server/load') });
const port = conf.get('/server/port');

server.connection({ port: port });

const EndpointsPlugin = require('../plugins/endpoints');
server.register({
  register: EndpointsPlugin,
  options: {

    route: { prefix: '/api' }
  }
}, function (/* err */) {

});

module.exports = server;
