exports.up = function(knex, Promise) {
  return knex.schema.createTable('beer_ingredients', function(table){
    table.increments();
    table.integer('beer_id');
    table.foreign('beer_id').references('id').inTable('beer');
    table.integer('ingredient_id');
    table.foreign('ingredient_id').references('id').inTable('ingredients');
    table.integer('amount');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('beer_ingredients');
};
