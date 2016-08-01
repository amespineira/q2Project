var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('splashpage')
});
router.get('/signup', function(req, res, next){
  res.render('signup', {error: null})
})
router.get('/signin', function(req, res, next){
  res.render('signin')
});
router.get('/login', function(req, res, next){
  res.render('login')
})



module.exports = router;
