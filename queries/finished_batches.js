var knex = require('../db/knex');

module.exports = {

    all: function(batchId) {
        return knex.raw(`SELECT * from finished_batches WHERE batch_id = ${batchId}`)
    },
    findIngredients: function(beerId) {
        return knex.raw(`SELECT ingredient_name from ingredients JOIN beer_ingredients ON beer_ingredients.ingredient_id=ingredients.id WHERE beer_id=${beerId};`)
    },
    updateBeerStats: function(stats){
        return knex.raw(`INSERT INTO beer_stats VALUES (DEFAULT, ${stats.batch_id}, ${stats.wort_collection}, ${stats.batch_size}, ${stats.efficiency}, ${stats.gravity} )`)
    },
    updateFinishedBatches: function(finishedBatch){
        return knex.raw(`INSERT INTO finished_batches VALUES (DEFAULT, '${finishedBatch.beer_name}', ${finishedBatch.user_id}, ${finishedBatch.batch_id}, '${finishedBatch.taste}', '${finishedBatch.aftertaste}', '${finishedBatch.smell}', '${finishedBatch.mouth_feel}', '${finishedBatch.drinkability}')`)
    },



}
