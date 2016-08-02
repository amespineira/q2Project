var express = require('express');
var router = express.Router();

router.get('/inventory', function(req, res, next){
  res.render('inventory');
})


module.exports = router
