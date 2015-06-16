const Hapi = require('hapi');

const plugins = require('./plugins');
const conf = require('../config');
const port = conf.get('/server/port');

const server = new Hapi.Server({ load: conf.get('/server/load') });
server.connection({ port: port });

// register all the plugins
server.register(plugins, (err) => {
  if (err) { throw err; }
});

module.exports = server;
