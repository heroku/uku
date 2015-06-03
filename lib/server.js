const Hapi = require('hapi');
const Path = require('path');
const conf = require('../config');

const server = new Hapi.Server({ load: conf.get('/server/load') });
const plugins = [ { register: require('bell') },
                  { register: require('mrhorse'),
                    options: { policyDirectory: Path.join(__dirname, '..', 'policies') }
                  },
                  { register: require('hapi-auth-cookie') },
                  { register: require('../plugins/api-proxy') },
                  { register: require('../plugins/endpoints') }
                ];
 const port = conf.get('/server/port');
 server.connection({ port: port });

// [optionally] enforce https/SSL connections
if (conf.get('/server/enforceEncryption')) {
  plugins.push(require('hapi-require-https'));
}

// register all the plugins
server.register(plugins, (err) => {
  if (err) { throw err; }
});

module.exports = server;
