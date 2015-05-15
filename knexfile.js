const conf = require('./config');

module.exports = conf.get('/postgresql');

// necessary to satisfy `knex migrate:make ___`
module.exports.development = module.exports.staging = module.exports.production = module.exports;

