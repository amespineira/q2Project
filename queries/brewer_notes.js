var knex= require('../db/knex')

module.exports={

allBrewerNotes: function(beerId){
  return knex.raw(`SELECT * from brewer_notes WHERE beer_id = ${beerId}`)

},

};
