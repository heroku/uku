const Code = require('code');
const Lab = require('lab');

const expect = Code.expect;
const lab = exports.lab = Lab.script();
const server = require('../lib/server');


lab.experiment('endpoints', function () {

  lab.before(function (done) {

    // Wait 1 millisecond
    setTimeout(function () { done(); }, 1);
  });

  lab.beforeEach(function (done) {

    // Run before every single test
    done();
  });

  lab.after(function (done) {

    // Wait 1 millisecond
    setTimeout(function () { done(); }, 1);
  });

  lab.afterEach(function (done) {

    // Run after every single test
    done();
  });


  lab.test('resolves example request', function (done) {
    server.inject({
      method: 'POST',
      url: '/example',
      headers: {
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify({
        user: {
          name: 'foo',
          email: 'foo@bar.baz'
        }
      })
    }, function (response) {
      const payload = JSON.parse(response.payload);
      expect(response.statusCode).to.equal(200);
      expect(payload.bank).to.be.an.object();
      expect(payload.bank.balance).to.be.a.number();
      expect(payload.bank.asOf).to.be.a.string();

      done();
    });
  });
});
