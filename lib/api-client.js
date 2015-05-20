const conf = require('../config');
const Bluebird = require('bluebird');
const Request = require('request');


module.exports = function(bearerToken) {
  return Bluebird.promisifyAll(Request.defaults({
    baseUrl: `https://${conf.get('/heroku/api')}/`,
    auth: { bearer: bearerToken },
    headers: {
      'x-heroku-legacy-ids': true,
      'user-agent': conf.get('/heroku/user_agent')
    },
    timeout: conf.get('/http/timeout'),
    json: true,
    gzip: true
  }));
};
