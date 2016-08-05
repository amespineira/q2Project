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
  },
  copyRecipie:function(id, userid){
    return knex.raw(`SELECT * FROM beer WHERE id=${id}`).then(function(toCopy){
      console.log(toCopy);
      return knex.raw(`INSERT INTO beer VALUES (DEFAULT, ${toCopy.rows[0].user_id}, '${toCopy.rows[0].beer_name}', '${toCopy.rows[0].type}', '${toCopy.rows[0].style}')`).then(function(){
        return knex.raw(`SELECT MAX (id) FROM beer WHERE user_id=${userid}`).then(function(newCopyId){
          return knex.raw(`SELECT * FROM beer_ingredients WHERE beer_id=${id}`).then(function(beerIng){
            console.log();
            return module.exports.copyBeerIngredients(newCopyId.rows[0].max, beerIng.rows)
          })
        })
      })
    })
  },
  copyBeerIngredients:function(newCopyId, beerIng){
    var curr=beerIng.pop()
    return knex.raw(`INSERT INTO beer_ingredients VALUES (DEFAULT, ${newCopyId}, ${curr.id}, ${curr.amount})`).then(function(){
        return (beerIng.length>0)? module.exports.copyBeerIngredients(newCopyId, beerIng) : Promise.resolve(true);
    })
  }
}
