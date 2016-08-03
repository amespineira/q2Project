exports.up = function(knex, Promise) {
  return knex.schema.createTable('stage', function(table){
    table.increments();
    table.integer('stage');
    table.string('name')
    table.text('notes');
    table.integer('batch_id')
    table.foreign('batch_id').references('id').inTable('batch');
    table.boolean('done')
    table.integer('order');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('stage');
};
