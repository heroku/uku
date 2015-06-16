const conf = require('../config');
const enforceEncryption = conf.get('/server/enforceEncryption');


// automatically include any `uku-` plugins specified in `package.json`
const plugins =
  Object
    .keys(require('../package.json').dependencies)
    .filter((moduleName) => {
      return moduleName.match(/^uku-/);
    })
    .map((moduleName) => {
      return require(moduleName);
    });

// [optionally] enforce https/SSL connections
if (enforceEncryption) {
  plugins.push(require('hapi-require-https'));
}

module.exports = plugins;
