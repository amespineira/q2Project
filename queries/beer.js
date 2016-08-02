var knex=require('../db/knex');
var bcrypt=require('bcrypt')
module.exports={
  getUsersBeers:function(id){
    return knex.raw(`SELECT * FROM beer WHERE user_id=${id}`)
  },
  getOne:function(id){
    return knex.raw(`SELECT * FROM beer WHERE id='${id}'`)
  },
  getMatch:function(specs){
    return knex.raw(`SELECT * FROM beer WHERE user_id=${specs.user_id} AND beer_name='${specs.name}' AND type='${specs.type}' AND style='${specs.style}'`)
  },
  create:function(specs){
    return knex.raw(`INSERT INTO beer VALUES(DEFAULT, ${specs.user_id}, '${specs.name}', '${specs.type}', '${specs.style}')`)
  }
}
