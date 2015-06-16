const Path = require('path');
const path = Path.join(process.cwd(), 'package.json');
const pkg = require(path);
const plugins =
  Object
    .keys(pkg.dependencies)
    .filter((moduleName) => {
      return moduleName.match(/^uku-/);
    });


exports.server = require('./lib/server');

exports.plugins = (require) => {
  return plugins.map((moduleName) => {
    console.log('Registering ', moduleName);
    return require(moduleName);
  });
};

exports.printStatus = function printStatus() {
  console.log(`${pkg.name} running at: ${exports.server.info.uri}`);
};

exports.registerPlugins = function(require, done) {
  // register all the plugins
  exports.server.register(exports.plugins(require), (err) => {
    done(err);
  });
}
