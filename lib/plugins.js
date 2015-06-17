const conf = require('../config');
const enforceEncryption = conf.get('/server/enforceEncryption');
const plugins = [];

// [optionally] enforce https/SSL connections
if (enforceEncryption) {
  plugins.push(require('hapi-require-https'));
}

module.exports = plugins;
