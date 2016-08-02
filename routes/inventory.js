var express = require('express');
var router = express.Router();
var Inventory = require('../queries/inventory.js')

router.get('/', function(req, res, next){
  res.render('inventory');
})

router.get('/perishable', function(req, res, next){
  res.render('inventory/perishable')
})

router.get('/non-perishable', function(req, res, next){
  res.render('inventory/non-perishable')
})

module.exports = router
