const Project = require('../index');
const Code = require('code');
const Lab = require('lab');

const expect = Code.expect;
const lab = exports.lab = Lab.script();

const StubPlugins = {
  'production': {
    'foo': {}
  },
  'always': {
    'bar': {}
  }
};

lab.experiment('server', () => {

  lab.test('production plugins are omitted when NODE_ENV=development', (done) => {
    const active = Project.activePlugins('development', StubPlugins);
    const always = StubPlugins.always;

    expect(active).to.equal(always);
    expect(Object.keys(active).length).to.equal(1);

    done();
  });

  lab.test('production plugins are included when NODE_ENV=production', (done) => {
    const active = Project.activePlugins('production', StubPlugins);
    const always = StubPlugins.always;

    expect(active).to.not.equal(always);
    expect(Object.keys(active).length).to.equal(2);

    done();
  });
});
