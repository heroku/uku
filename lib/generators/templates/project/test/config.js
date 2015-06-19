const Code = require('code');
const Lab = require('lab');

const expect = Code.expect;
const lab = exports.lab = Lab.script();

const config = require('../config');

lab.experiment('config', function() {

  lab.test('get', function(done) {

    const pkgName = require('../package.json').name;
    const configName = config.get('/name');
    expect(configName).to.equal(pkgName);
    done();
  });

  lab.test('meta', function(done) {

    const defaultMetaValue = 'This file configures the project.';
    const retrievedMetaValue = config.meta('/');
    expect(retrievedMetaValue).to.equal(defaultMetaValue);
    done();
  });
});
