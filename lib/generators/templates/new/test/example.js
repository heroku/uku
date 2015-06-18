const Uku = require('../node_modules/uku');
const Code = require('code');
const Lab = require('lab');

const server = Uku.server;
const expect = Code.expect;
const lab = exports.lab = Lab.script();


lab.experiment('server', () => {
  const project = require('../index.js');

  lab.test('begins listening for requests when plugin registration succeeds', (done) => {
    const starts = function() { project.run(); };
    expect(starts).to.not.throw();
    expect(server.info.port).to.be.a.number();

    done();
  });
});
