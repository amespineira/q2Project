var knex=require('../db/knex');
var bcrypt=require('bcrypt')
module.exports={
  getUsersBeers:function(id){
    return knex.raw(`SELECT * FROM beer WHERE user_id=${id}`)
  },
  getOne:function(id){
    return knex.raw(`SELECT * FROM beer WHERE id='${id}'`)
  },
  // create:function(specs){
  //   return knex.raw(`INSERT INTO beer VALUES(DEFAULT, )`)
  // }
}
