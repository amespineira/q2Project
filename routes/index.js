var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedin){
    res.redirect('/main')
  }
  else{
    res.render('splashpage')
  }
});
router.get('/signup', function(req, res, next){
  res.render('auth/signup', {error: null})
})
router.get('/signin', function(req, res, next){
  res.render('auth/signin', {error: null})
});
router.get('/login', function(req, res, next){
  res.render('login')
})
router.get('/logout', function(req, res, next){
  req.session= null;
  res.redirect('/')
})


module.exports = router;
