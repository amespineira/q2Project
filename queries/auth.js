var knex=require('../db/knex');
var bcrypt=require('bcrypt')
module.exports={
  createUser:function(username, hash){
    return knex.raw(`INSERT INTO users VALUES (DEFAULT, '${username}', '${hash}', null, null, null, 'standard')`)
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
  },
  authTwit:function(token, tokenSecret, profile, cb) {
    console.log("here");
    bcrypt.hash(token, 10, function(err, hash) {
        knex.raw(`SELECT * FROM users WHERE username='${profile.username}' AND auth_type='twitter'`).then(function(matches){

          if(matches.rows.length===0){
            knex.raw(`INSERT INTO users VALUES (DEFAULT, '${profile.username}', '', '${hash}', '', '', 'twitter')`).then(function(){
              knex.raw(`SELECT * FROM users WHERE username='${profile.username}' AND auth_type='twitter'`).then(function(inMatches){
                inMatches.rows.forEach(function(match){
                  if(bcrypt.compareSync(token, match.twitter_token)){
                    return cb(null, match)
                  }
                })
              })
            })
          }
          else{
            matches.rows.forEach(function(match){
              if(bcrypt.compareSync(token, match.twitter_token)){
                return cb(null, match)
              }
            })
          }
        })

      })
  }
}
