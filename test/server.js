const Code = require('code');
const Lab = require('lab');

const expect = Code.expect;
const lab = exports.lab = Lab.script();

let server;


lab.experiment('server', function () {

  lab.before(function(done) {

    require('glue').compose({}, {}, function(err, _server) {

      if (err) { throw err; }

      server = _server;
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
