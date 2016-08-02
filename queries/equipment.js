var knex=require('../db/knex');

module.exports={
  getAllEquipment: function(userId){
    return knex.raw(`SELECT * FROM equipment where user_id=${userId}`)
  }
}
