var knex=require('../db/knex');

module.exports={
  getAllEquipment: function(userId){
    return knex.raw(`SELECT * FROM equipment where user_id=${userId}`)
  },
  createEquipment: function(equip, userId){
    return knex.raw(`INSERT INTO equipment VALUES (DEFAULT, '${equip.equipment_name}', ${userId}, '${equip.batch_id}', '${equip.clean}', '${equip.cleaning_time}', '${equip.cleaning_notes}')`)
  },
  findOneEquipment: function(id){
    return knex.raw(`SELECT * FROM equipment WHERE id= ${id}`)
  },
  updateOneEquipment: function(equip, id){
    return knex.raw(`UPDATE equipment SET equipment_name='${equip.equipment_name}' , batch_id=${equip.batch_id} , clean='${equip.clean}' , clean_time='${equip.cleaning_time}' , clean_notes='${equip.cleaning_notes}' WHERE id=${id}; `)
  },
  deleteOneEquipment: function(id){
    return knex.raw(`DELETE FROM equipment WHERE id=${id}`)
  }
}
