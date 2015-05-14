const Hapi = require('hapi');
const conf = require('../config');
const server = new Hapi.Server({ load: conf.get('/server/load') });

server.connection({ port: conf.get('/server/port') });
server.app.db = null;

module.exports = server;
