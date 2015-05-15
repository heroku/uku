const conf = require('../config');
const Request = require('request');

module.exports = function(bearerToken) {
  return Request.defaults({
    baseUrl: `https://${conf.get('/heroku/api')}/`,
    auth: { bearer: bearerToken },
    headers: {
      'x-heroku-legacy-ids': true,
      'user-agent': conf.get('/heroku/user_agent')
    },
    timeout: conf.get('/http/timeout'),
    json: true,
    gzip: true
  });
};
