const info = require('../package.json');
const conf = require('../config');

exports.register = function (server, options, next) {

  // redirect all http request to secure route
  if (conf.get('/server/enforceSSL')) {
    server.ext('onRequest', function (request, reply) {

      if (request.headers['x-forwarded-proto'] !== 'https') {
        return reply('Forwarding to a more secure route')
              .redirect(`https://${request.headers.host}${request.url.path}`);
      }

      reply();
    });
  }

  next();
};

exports.register.attributes = {
  name: 'enforce-ssl',
  version: info.version
};
