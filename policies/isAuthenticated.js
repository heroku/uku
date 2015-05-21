const Boom = require('boom');
const Bluebird = require('bluebird');

const needsAPI = function(request, reply, next) {
  const authorization = request.headers.authorization;
  const bearer = authorization && authorization.split(' ')[1];

  // verify existence of Bearer token
  if (!bearer) {
    return next(Boom.unauthorized(), false);
  }

  // attach new API client to current request
  const api = require('../lib/api-client')(bearer)

  // return console.dir(api.get('/foo').headers);

  request.app.bearer = bearer;
  request.app.api = Bluebird.promisifyAll(api.defaults({auth: { bearer: bearer }}));

  next(null, true);
};

// These are optional
needsAPI.pre = true;   // default
needsAPI.post = false; // default

module.exports = needsAPI;
