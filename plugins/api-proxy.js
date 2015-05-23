const info = require('../package.json');
const conf = require('../config');

exports.register = function (server, options, next) {

  server.route({
    method: '*',                            // all methods
    path: '/proxy/{path}',                  // all routes prefixed with `/api/`
    handler: {
      proxy: {
        passThrough: true,                  // forwards the headers sent from the client to the upstream service
        xforward: true,                     // sets the 'X-Forwarded-For', 'X-Forwarded-Port', 'X-Forwarded-Proto' headers
        timeout: conf.get('/http/timeout'), // number of milliseconds before aborting the upstream request

        // SIMPLE
        // host: conf.get('/heroku/api'),
        // port: 443,
        // protocol: 'https',

        // ADVANCED
        mapUri: function(request, callback) {
          const host = conf.get('/heroku/api');
          const path = request.url.path.slice(4); // strip `/api` prefix

          // set custom headers
          const headers = Hoek.applyToDefaults(request.headers, {
            'host': host,
            'x-heroku-legacy-ids': true,
            'user-agent': conf.get('/heroku/user-agent')
          });

          callback(null, `https://${host}${path}`, headers);
        }
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'proxy',
  version: info.version,
  multiple: true
};
