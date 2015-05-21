const Hapi = require('hapi');
const Path = require('path');
const conf = require('../config');

const server = new Hapi.Server({ load: conf.get('/server/load') });
const port = conf.get('/server/port');
server.connection({ port: port });

// Enforce SSL in production
server.register({
  register: require('../plugins/enforce-ssl')
}, function (/* err */) {

});

// Register Platform API proxy
server.register({
  register: require('../plugins/api-proxy')
}, {}, function (/* err */) {

});

// Register HTTP endpoints
server.register({register: require('../plugins/endpoints')}, {
  routes: { prefix: '/api' }
}, function (/* err */) {

});

server.register({
  register: require('mrhorse'),
  options: {
    policyDirectory: Path.join(__dirname, '..', 'policies')
  }
},
function(/* err */) {

});

module.exports = server;
