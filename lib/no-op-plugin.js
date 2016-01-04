exports.register = function (server, options, next) { next(); };

exports.register.attributes = {
  name: 'no-op',
  version: '1.0.0'
};
