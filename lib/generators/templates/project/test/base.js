const Code = require('code');
const Lab = require('lab');

const expect = Code.expect;
const lab = exports.lab = Lab.script();

const Project = require('../index');
let server;

lab.experiment('server', function () {

  lab.before(function(done) {

    Project.run().then((newServer) => {
      server = newServer;
      done();
    });
  });

  lab.after(function (done) {

    server.stop(done);
  });

  lab.test('begins listening for requests', function (done) {

    expect(server.info.port).to.be.a.number();
    server.start(done);
  });
});
