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
  },
  authTwit:function(token, tokenSecret, profile, cb) {

    // return knex.raw(`SELECT * FROM users `)
    console.log(token);
    // console.log(tokenSecret);
    console.log(profile.id);
    // console.log(cb);
    // if(bcrypt.compareSync(req.body.password, user.rows[0].password)){
    //   req.session.id=user.rows[0].id
    //   req.session.loggedin=true;
    //   res.redirect('/main')
    // }
    bcrypt.hash(token, 10, function(err, hash) {
        knex.raw(`SELECT * FROM users WHERE username='${profile.username}'`).then(function(matches){
          if(matches.rows.length===0){
            knex.raw(`INSERT INTO users VALUES (DEFAULT, '${profile.username}', '', '${hash}', '', '')`).then(function(){
              knex.raw(`SELECT * FROM users WHERE twitter_token='${profile.username}'`).then(function(inMatches){
                inMatches.rows.forEach(function(match){
                  if(bcrypt.compareSync(token, match.twitter_token)){
                    req.session.id=match.id
                    req.session.loggedin=true;
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
