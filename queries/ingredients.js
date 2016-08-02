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
  },
  createBeerIngredients:function(ingredients, beerid){
    var curr=ingredients.pop()
    var query=`SELECT * FROM ingredients WHERE ingredient_name='${curr.name}' AND ingredient_type='${curr.type}' AND units='${curr.units}'`
    knex.raw(query).then(function(matches){
      console.log(matches);
      knex.raw(`INSERT INTO beer_ingredients VALUES (${beerid}, ${matches.rows[0].id}, ${curr.amount})`)
    })
    return (ingredients.length>0)? this.createBeerIngredients(ingredients, beerid) : Promise.resolve(true);
  },
  createBITest2:function(ingredients, beerid){
    //get id of ingredient,create beer ingredient
    var promiseArray=[];
    for(var i=0; i<ingredients.length; i++){
      promiseArray[i]=knex.raw(`SELECT * FROM ingredients WHERE ingredient_name='${ingredients[i].name}' AND ingredient_type='${ingredients[i].type}' AND units='${ingredients[i].units}'`)
    }
    return Promise.all(promiseArray).then(values => {
      var pa2=[]
      for(var i=0; i<values.length; i++){
        pa2[i]=knex.raw(`INSERT INTO beer_ingredients VALUES (DEFAULT, ${beerid}, ${values[i].rows[0].id}, ${ingredients[i].amount})`)
      }
      return Promise.all(pa2).then(values => {
        return 'done'
      })
    });
  },

}
