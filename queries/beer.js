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
    return knex.raw(`INSERT INTO beer VALUES (DEFAULT, ${specs.user_id}, '${specs.name}', '${specs.type}', '${specs.style}')`)
  },
  getLatestBeer:function(userid){
    return knex.raw(`SELECT MAX (id) FROM beer WHERE user_id=${userid}`)
  },
  getBatchesUsingBeer:function(beerid){
    return knex.raw(`SELECT * FROM batch WHERE beer_id=${beerid}`)
  },
  deleteBeersIng:function(beerid){
    return knex.raw(`DELETE FROM beer_ingredients WHERE beer_id=${beerid}`)
  },
  deleteBeersNotes:function(beerid){
    return knex.raw(`DELETE FROM brewer_notes WHERE beer_id=${beerid}`)
  },
  deleteOne:function(id){
    return knex.raw(`DELETE FROM beer WHERE id=${id}`)
  }
}
