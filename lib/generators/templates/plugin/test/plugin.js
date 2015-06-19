const Code = require('code');
const Lab = require('lab');
const Hapi = require('hapi');

const lab = exports.lab = Lab.script();
const server = new Hapi.Server();
const expect = Code.expect;

const plugin = require('../index');

lab.experiment('plugin', function () {

  lab.test('calls next', function(done) {
    plugin.register(server, {}, () => {
      expect(arguments.length).to.equal(0);
      done();
    });
  });
});
