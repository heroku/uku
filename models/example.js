const knex = require('../lib/database').knex;
const bookshelf = require('../lib/database').bookshelf;

module.exports = bookshelf.Model.extend({

    // instance properties
    // http://bookshelfjs.org/#Model-extend

    tableName: 'examples'

    // relationships (e.g. hasOne, hasMany, belongsTo, belongsToMany)
    // http://bookshelfjs.org/#Model-relation-types
  },


  {

    // class properties
    // http://bookshelfjs.org/#Model-extend

    withName: Promise.method(function(name) {
      if (!name) {
        throw new TypeError('`name` is not valid.');
      }

      return knex('examples').where('name', name);
    })
  }
);
