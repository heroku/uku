var Boom = require('boom');

var needsAPI = function(request, reply, next) {
  const authorization = request.headers.authorization;
  const bearer = authorization && authorization.split(' ')[1];

  // verify existence of Bearer token
  if (!bearer) {
    return next(Boom.unauthorized(), false);
  }

  // attach new API client to current request
  request.app.api = require('../lib/api-client')(bearer);

  next(null, true);
};

// These are optional
needsAPI.pre = true;   // default
needsAPI.post = false; // default

module.exports = needsAPI;
