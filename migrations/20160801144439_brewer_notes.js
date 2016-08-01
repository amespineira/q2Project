exports.up = function(knex, Promise) {
  return knex.schema.createTable('brewer_notes', function(table){
    table.increments();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.integer('beer_id');
    table.foreign('beer_id').references('id').inTable('beer');
    table.text('notes');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('brewer_notes');
};
