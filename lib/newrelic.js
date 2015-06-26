const isRunningInProduction = (process.env.NODE_ENV || '').toLowerCase() === 'production';
const NEW_RELIC_LICENSE_KEY = process.env.NEW_RELIC_LICENSE_KEY;

if (isRunningInProduction && NEW_RELIC_LICENSE_KEY) {
  module.exports = require('newrelic');
} else if (isRunningInProduction) {
  const Chalk = require('chalk');
  console.error(`Production app detected without newrelic initialized; did you forget to set ${Chalk.bold('NEW_RELIC_LICENSE_KEY')}?`);
}
