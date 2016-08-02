exports.up = function(knex, Promise) {
  return knex.schema.createTable('batch', function(table){
    table.increments();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.integer('beer_id');
    table.foreign('beer_id').references('id').inTable('beer');
    table.dateTime('start_date');
    table.dateTime('end_date');
    table.integer('expected_yield');
    table.integer('actual_yield');
    table.float('gravity');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('batch');
};
