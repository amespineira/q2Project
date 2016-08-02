var knex=require('../db/knex');
var bcrypt=require('bcrypt')
module.exports={
  getDefaultIng:function(ing){ //gets ingredients for a certain default beer, will not work for beer ids
    var query=`SELECT * FROM ingredients WHERE id=${ing[0]}`;
    for(var i=1; i<ing.length; i++){
      query+=`OR id=${ing[i]}`
    }
    return knex.raw(query)
  }
}
