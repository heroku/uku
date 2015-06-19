const Uku = require('./node_modules/uku');
const config = require('./config');
const plugins = require('./plugins');
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


Uku.run(manifest, options, function(err) {

  if (err) { throw err; }
  else     { console.log(`${config.get('/name')} running at: ${this.server.info.uri}`); }
});
