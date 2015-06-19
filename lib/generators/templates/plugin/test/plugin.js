const Hapi = require('hapi');
const Code = require('code');
const Lab = require('lab');
const Plugin = require('../index');

const expect = Code.expect;
const lab = exports.lab = Lab.script();

let server;

lab.experiment('plugin', function () {

  lab.beforeEach(function(done) {

    server = new Hapi.Server();
    server.connection({});

    done();
  });

  lab.test('can successfully register the plugin', function (done) {

    server.register(Plugin, function (err) {

      expect(err).to.equal(undefined);
      done();
    });
  });


  lab.test('throws an error when plugin registration fails', function (done) {

    expect(function () { Plugin.ready(new Error()); }).to.throw();
    done();
  });
});
