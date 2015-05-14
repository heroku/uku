const Code = require('code');
const Lab = require('lab');

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const server = require('../lib/server');


lab.experiment('server', function () {

  lab.after(function (done) {

    server.stop(done);
  });

  lab.test('begins listening for requests', function (done) {

    expect(server.info.port).to.be.a.number();
    server.start(done);
  });
});
