var express = require('express');
var router = express.Router();
var Auth=require('../queries/auth.js')
var passport = require('passport');

var bcrypt=require('bcrypt')
/* GET users listing. */
router.post('/signup', function(req, res, next) {
  var error=Auth.validate(req.body.username, req.body.password)
  if(error===true) {
    Auth.getUser(req.body.username).then(function(exists){
      if(exists.rows.length>0){
        error='Username is taken'
        res.render('auth/signup', {error:error})
      }
      else{
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        Auth.createUser(req.body.username, hash).then(function(){
          Auth.getUser(req.body.username).then(function(user){
            req.session.loggedin=true;
            req.session.id=user.rows[0].id
            res.redirect('/')
          })
        })
      })
      }
    })
  }
  else{
    res.render('auth/signup', {error:error})
  }
});
router.post('/signin', function(req, res, next){
  Auth.getUser(req.body.username).then(function(user){
    if(user.rows.length>0){
      if(bcrypt.compareSync(req.body.password, user.rows[0].password)){
        req.session.id=user.rows[0].id
        req.session.loggedin=true;
        res.redirect('/main')
      }
      else{
        res.render('auth/signin', {error: 'Invalid Password'})
      }
    }
    else{
      res.render('auth/signin', {error: 'Invalid Username'})
    }

  })
})
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), function(req, res, next){
  res.locals.user = req.user
  console.log(req.user);
  knex.raw(`SELECT * FROM users WHERE linkedin_id='${req.user._json.id}'`).then(function(matches){
    if(matches.rows.length!=0){
      res.redirect('/')
    }
    else{
      knex.raw(`INSERT INTO users VALUES (DEFAULT, '${req.user._json.firstName}', '${req.user._json.lastName}', '${req.user._json.id}')`).then(function(thing){
        res.redirect('/')
      })
    }
  })
});

module.exports = router;
