const Uku = require('./node_modules/uku');
const config = require('./config');


const manifest = {
  server: {
    load: config.get('/server/load'),
    debug: {
      request: ['error']
    }
  },

  connections: [{
    port: config.get('/server/port')
  }],

  plugins: config.get('/server/plugins')
};

const options = {
  relativeTo: __dirname
};


exports.run = function run () {

  return Uku.run(manifest, options);
};
