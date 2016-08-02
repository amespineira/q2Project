var express = require('express');
var router = express.Router();

router.get('/inventory', function(req, res, next){
  res.render('inventory');
})

router.get('/perishable', function(req, res, next){
  res.render('')
})

module.exports = router
