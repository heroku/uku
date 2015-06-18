const Uku = require('./node_modules/uku');

exports.run = function(callback) {
  const additionalPluggins = [];


  // add additional plugins, if necessary


  Uku.run(require, additionalPluggins, callback);
};
