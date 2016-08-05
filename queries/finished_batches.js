var knex=require('../db/knex');

module.exports = {

all: function(batchId){
  return knex.raw(`SELECT * from finished_batches WHERE batch_id = ${batchId}`)
},
findIngredients: function(beerId){
  console.log(beerId);
  return knex.raw(`SELECT ingredient_name from ingredients JOIN beer_ingredients ON beer_ingredients.ingredient_id=ingredients.id WHERE beer_id=${beerId};`)
}


}
