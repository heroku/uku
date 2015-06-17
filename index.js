const Path = require('path');
const pkgPath = Path.join(process.cwd(), 'package.json');
const pkg = require(pkgPath);
const isRunFromCLI = (require.main === module);

const server = exports.server = require('./lib/server');

const pluginModules = (require) => {
  return Object.keys(pkg.dependencies)
               .filter((moduleName) => {
                 return moduleName.match(/^uku-/);
               })
               .map((moduleName) => {
               // $lab:coverage:off$
               if (isRunFromCLI) {
                 console.log('registering uku plugin: ', moduleName);
               }
               // $lab:coverage:on$

               return require(moduleName);
             });
};

exports.printStatus = function printStatus() {
  console.log(`${pkg.name} running at: ${server.info.uri}`);
};

exports.registerPlugins = function(require, additionalPlugins, done) {
  const pluginsPath = Path.join(__dirname, 'lib/plugins');
  const plugins = pluginModules(require).concat(require(pluginsPath)).concat(additionalPlugins);

  // register all the plugins
  server.register(plugins, (err) => {
    if (err) { return done(err); }

    server.start(done);
  });
};
