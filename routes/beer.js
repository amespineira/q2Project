var express = require('express');
var router = express.Router();
var Beer=require('../queries/beer.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('logged in as '+req.session.id);
  Beer.getUsersBeers(req.session.id).then(function(beers){
    console.log(beers);
    res.render('beer/userbeers', {beers:beers.rows})
  })
})
router.get('/:id', function(req, res, next){
  Beer.getOne(req.params.id).then(function(beers){
    res.send(beers)
  })
})


module.exports = router;
