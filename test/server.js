const Code = require('code');
const Lab = require('lab');

const expect = Code.expect;
const lab = exports.lab = Lab.script();

const Uku = require('../index');
const manifest = {
  server: {},
  connections: [{
    port: '5000'
  }],
  plugins: {}
};

let pathToPlugin = require('path').resolve('./lib/no-op-plugin');
let plugins = { 'always': {}};
plugins.always[pathToPlugin] = {};

const manifestWithPlugins = {
  server: {},
  connections: [{
    port: '5000'
  }],
  plugins: plugins
};

let server;

lab.experiment('server without plugins', function () {

  lab.before(function (done) {

    Uku.run(manifest, {}).then((newServer) => {
      server = newServer;
      done();
    });
  });

  lab.afterEach(function (done) {

    server.stop(done);
  });

  lab.test('begins listening for requests', function (done) {

    expect(server.info.port).to.be.a.number();
    server.start(done);
  });

  lab.test('rejects when Glue returns an error', function (done) {

    const err1 = new Error();
    Uku.ready(err1, null, null, function (err2) {

      expect(err1).to.equal(err2);
      done();
    });
  });

  lab.test('catches bogus _always_ plugins', function (done) {
    
    Uku
      .run({ plugins:{ always: { 'non-existent':{}}}}, {})
      .catch(() => { done(); });
  });
});

lab.experiment('test production plugin error handling', function() {

  let initialNodeEnv = process.env.NODE_ENV;

  lab.before(function (done) {

    process.env.NODE_ENV = 'production';
    done();
  });

  lab.after(function (done) {

    process.env.NODE_ENV = initialNodeEnv;
    done();
  });

  lab.test('catches bogus _production_ plugins', function (done) {

    Uku
      .run({ plugins:{ production: { 'non-existent': {} } } }, {})
      .catch(() => { done(); });
  });

  lab.test('catches bogus _always_ plugins', function (done) {

    Uku
      .run({ plugins:{ always: { 'non-existent': {} } } }, {})
      .catch(() => { done(); });
  });

  lab.test('handles unspecified `always` plugins', function (done) {

    Uku
      .run({ plugins: {}}, {})
      .then(() => { done(); });
  });

  lab.test('handles null plugins', function (done) {

    Uku
      .run({ plugins: null }, {})
      .then(() => { done(); });
  });
});

lab.experiment('server with plugins', function () {

  lab.before(function (done) {

    Uku.run(manifestWithPlugins, {}).then((newServer) => {
      server = newServer;
      done();
    });
  });

  lab.afterEach(function (done) {

    server.stop(done);
  });

  lab.test('begins listening for requests', function (done) {

    expect(server.info.port).to.be.a.number();
    server.start(done);
  });

  lab.test('rejects when Glue returns an error', function (done) {

    const err1 = new Error();
    Uku.ready(err1, null, null, function(err2) {

      expect(err1).to.equal(err2);
      done();
    });
  });
});
