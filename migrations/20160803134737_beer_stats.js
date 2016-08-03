exports.up = function(knex, Promise) {
  return knex.schema.createTable('beer_stats', function(table){
    table.increments();
    table.integer('batch_id')
    table.foreign('batch_id').references('id').inTable('batch');
    table.float('wort_collection');
    table.float('batch_size');
    table.float('efficiency');
    table.float('gravity');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('beer_stats');
};
