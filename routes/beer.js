var express = require('express');
var router = express.Router();
var Beer=require('../queries/beer.js')
var defaults=[
  {
    type:'ale',
    stlye:'dark',
    description:'what a thing',
    ingredients:[1,2]
  }
]
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
    if(beers.rows[0].user_id===req.session.id){
    res.render('beer/showbeer', {beers:beers.rows})
    }
    else{
      res.send('not your beer, get out of here')
    }
  })
})
router.get('/create', function(req, res, next){
  res.render('beer/select', {defaults:defaults})
})

module.exports = router;
