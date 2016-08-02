exports.up = function(knex, Promise) {
  return knex.schema.createTable('equipment', function(table){
    table.increments();
    table.string('equipment_name')
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.integer('batch_id');
    table.foreign('batch_id').references('id').inTable('batch');
    table.boolean('clean');
    table.integer('clean_time');
    table.string('clean_notes');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('equipment');
};
