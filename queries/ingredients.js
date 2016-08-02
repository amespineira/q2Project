var knex=require('../db/knex');
var bcrypt=require('bcrypt')
module.exports={
  getDefaultIng:function(ing){ //gets ingredients for a certain default beer, will not work for beer ids
    var query=`SELECT * FROM ingredients WHERE id=${ing[0]}`;
    for(var i=1; i<ing.length; i++){
      query+=`OR id=${ing[i]}`
    }
    return knex.raw(query)
  },
  createIfMissing:function(ingredients){
    var curr=ingredients.pop()
    var query=`SELECT * FROM ingredients WHERE ingredient_name='${curr.name}' AND ingredient_type='${curr.type}' AND units='${curr.units}'`
    var insert=`INSERT INTO ingredients VALUES (DEFAULT, '${curr.name}', '${curr.type}', '${curr.units}', 'No description')`
    knex.raw(query).then(function(matches){
      if(matches.rows.length===0){
        knex.raw(insert).then(function(){
        })
      }
    })
    return (ingredients.length>0)? this.createIfMissing(ingredients) : Promise.resolve(true);
  }
}
