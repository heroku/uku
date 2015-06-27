require('./lib/newrelic');
const Glue = require('glue');

exports.run = function (manifest, options) {

  return new Promise(function (resolve, reject) {

    return Glue.compose(manifest, options, function (err, server) {

      exports.ready(err, server, resolve, reject);
    });
  });
};

exports.ready = function (err, server, resolve, reject) {

  if (err) {

    return reject(err);
  }

  else {

    return server.start(function () {

      return resolve(server);
    });
  }
};
