exports.up = function(knex, Promise) {
  return knex.schema.createTable('beer', function(table){
    table.increments();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.string('beer_name');
    table.string('type');
    table.string('style');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('beer');
};
