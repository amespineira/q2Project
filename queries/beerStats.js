var knex=require('../db/knex');

module.exports = {
allBeerStats: function(id){
  return knex.raw(`SELECT * from beer_stats WHERE batch_id=${id}`)
}
}
