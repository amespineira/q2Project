var knex=require('../db/knex');
var bcrypt=require('bcrypt')
module.exports={
  createUser:function(username, hash){
    return knex.raw(`INSERT INTO users VALUES (DEFAULT, '${username}', '${hash}', null, null)`)
  },
  validate:function(username, password){
    if(username.length<5){
      return 'Username was too short';
    }
    else if(username.length>20){
      return 'Username was too long'
    }
    if(password.length<4){
      return 'Password was too short'
    }
    if(password.length>50){
      return 'Password was too long'
    }
    return true
  },
  getUser:function(username){
    return knex.raw(`SELECT * FROM users WHERE username='${username}'`)
  }
}
