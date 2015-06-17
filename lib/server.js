const Hapi = require('hapi');
const conf = require('../config');
const port = conf.get('/server/port');

const server = new Hapi.Server({ load: conf.get('/server/load') });
server.connection({ port: port });

module.exports = server;
