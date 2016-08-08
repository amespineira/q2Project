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
  getBeersIng:function(id){
    return knex.raw(`SELECT * FROM ingredients JOIN beer_ingredients ON beer_ingredients.ingredient_id=ingredients.id WHERE beer_ingredients.beer_id=${id}`)
  },
  createIfMissing:function(ingredients){
    var curr=ingredients.pop()
    var query=`SELECT * FROM ingredients WHERE ingredient_name='${curr.name}' AND ingredient_type='${curr.type}' AND units='${curr.units}'`
    var insert=`INSERT INTO ingredients VALUES (DEFAULT, '${curr.name}', '${curr.type}', '${curr.units}', 'No description')`
    return knex.raw(query).then(function(matches){
      if(matches.rows.length===0){
        knex.raw(insert).then(function(){
          return (ingredients.length>0)? module.exports.createIfMissing(ingredients) : Promise.resolve(true);
        })
      }
      else{
        return (ingredients.length>0)? module.exports.createIfMissing(ingredients) : Promise.resolve(true);
      }
    })
  },

  createBeerIngredients:function(ingredients, beerid){
    var curr=ingredients.pop()
    var query=`SELECT * FROM ingredients WHERE ingredient_name='${curr.name}' AND ingredient_type='${curr.type}' AND units='${curr.units}'`
    return  knex.raw(query).then(function(matches){
      console.log(curr);
      console.log(matches);
      return knex.raw(`INSERT INTO beer_ingredients VALUES (DEFAULT, ${beerid}, ${matches.rows[0].id}, ${curr.amount})`).then(function(){
        return (ingredients.length>0)? module.exports.createBeerIngredients(ingredients, beerid) : Promise.resolve(true);
      })
    })
  },
  createBITest2:function(ingredients, beerid){
    //get id of ingredient,create beer ingredient
    console.log("in bites2");
    var promiseArray=[];
    for(var i=0; i<ingredients.length; i++){
      console.log("createing promise "+i);
      promiseArray[i]=knex.raw(`SELECT * FROM ingredients WHERE ingredient_name='${ingredients[i].name}' AND ingredient_type='${ingredients[i].type}' AND units='${ingredients[i].units}'`)
    }
    return Promise.all(promiseArray).then(values => {
      console.log("first array complete");
      var pa2=[]
      for(var i=0; i<values.length; i++){
        console.log("creating second promise array");
        pa2[i]=knex.raw(`INSERT INTO beer_ingredients VALUES (DEFAULT, ${beerid}, ${values[i].rows[0].id}, ${ingredients[i].amount})`);
        console.log("at line 49");
      }
      console.log("finished second array");
      return Promise.all(pa2).then(values => {
        console.log("second done");
        return 'done'
      })
    });
  },

}
