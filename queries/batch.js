var knex = require('../db/knex');

module.exports = {
  createBatch: function(body, id1, id2){
    return knex.raw(`INSERT into batch values(default, ${id1}, ${id2}, ${Date()}, ${body.end_date}, ${body.expected_yeild}, ${null}, ${1});`)
  },
  ingredientData: function(id){
    return knex.raw(`SELECT beer_name.id, ingredient_name.id, amount, ingredient_type, units, type, style, notes from beer_ingredients JOIN ingredients ON beer_ingredients.ingredient_id = ingredients.id JOIN beer ON beer_ingredients.beer_id = beer.id JOIN brewer_notes ON brewer_notes.beer_id = beer_ingredients.beer_id WHERE beer_ingredients.beer_id = ${id};`);
  }
}
