exports.up = function(knex) {
  return knex.schema.createTable('examples', function(t) {
    t.increments().primary(); // id
    t.string('name');         // name
    t.timestamps();           // created_at, updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('examples');
};
