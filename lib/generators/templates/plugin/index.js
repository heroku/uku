exports.register = function (server, options, next) {

  next();
};

exports.register.attributes = {
  name: '__plugin-name__',
  version: 1
};
