var knex=require('../db/knex');

module.exports = {

all: function(batchId){
  console.log(batchId);
  return knex.raw(`SELECT * from finished_batches WHERE batch_id = ${batchId}`)
},
}
