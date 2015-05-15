const conf = require('../config');
const knex = require('knex')(conf.get('/postgresql')); // http://knexjs.org/
const bookshelf = require('bookshelf')(knex);          // http://bookshelfjs.org/

exports.knex = knex;
exports.bookshelf = bookshelf;
