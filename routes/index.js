var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('splashpage')
});
router.get('/auth/signup', function(req, res, next){
  res.render('auth/signup', {error: null})
})
router.get('/auth/signin', function(req, res, next){
  res.render('auth/signin')
});
router.get('/login', function(req, res, next){
  res.render('login')
})



module.exports = router;
