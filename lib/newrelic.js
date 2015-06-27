const Chalk = require('chalk');
const isRunningInProduction = (process.env.NODE_ENV || '').toLowerCase() === 'production';
const NEW_RELIC_LICENSE_KEY = process.env.NEW_RELIC_LICENSE_KEY;

if (isRunningInProduction && NEW_RELIC_LICENSE_KEY) {
  module.exports = require('newrelic');
} else if (isRunningInProduction) {
  console.error(`\r\nProduction app detected with${Chalk.underline('out')} ${Chalk.blue('New Relic')}; did you forget to set ${Chalk.bold('NEW_RELIC_LICENSE_KEY')}?\r\n`);
}
