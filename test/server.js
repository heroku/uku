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
  plugins: []
};
let server;

lab.experiment('server', function () {

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
    Uku.ready(err1, null, null, function(err2) {

      expect(err1).to.equal(err2);
      done();
    });
  });

});
