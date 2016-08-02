var knex=require('../db/knex');

module.exports={
  getAllEquipment: function(userId){
    return knex.raw(`SELECT * FROM equipment where user_id=${userId}`)
  },
  createEquipment: function(equip, userId){
    console.log(equip);
    console.log(userId);
    // return knex.raw(`INSERT INTO equiment VALUES (DEFAULT, '${equip.name}', '${userID}', ')`)
  }
}
