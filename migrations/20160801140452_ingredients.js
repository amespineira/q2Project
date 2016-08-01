exports.up = function(knex, Promise) {
  return knex.schema.createTable('ingredients', function(table){
    table.increments();
    table.string('ingredient_name');
    table.string('ingredient_type');
    table.string('units');
    table.string('flavor_notes');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('ingredients');
};
