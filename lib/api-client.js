const conf = require('../config');
const Bluebird = require('bluebird');
const Request = require('request');


module.exports = function() {
  return Bluebird.promisifyAll(Request.defaults({
    baseUrl: `https://${conf.get('/heroku/api')}/`,
    headers: {
      'accept': conf.get('/heroku/variant'),
      'user-agent': conf.get('/heroku/user_agent'),
      'x-heroku-legacy-ids': true,
      'heroku-ignore-rate-limiting': conf.get('/heroku/rateLimitSecret'),
    },
    timeout: conf.get('/http/timeout'),
    json: true,
    gzip: true
  }));
};
