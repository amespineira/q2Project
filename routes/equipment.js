var express = require('express');
var router = express.Router();

router.get('/equipment', function(req, res, next){
  res.render('equipment');
})


module.exports = router
