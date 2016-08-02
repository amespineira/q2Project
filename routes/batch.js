var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

function Batch(){
  return knex('batch');
}
function Beer(){
  return knex('beer');
}
function Beer_ingredients(){
  return knex('beer_ingredients');
}

router.post('/time', function(req, res, next){
  console.log(req.body);
})

router.post('/:id', function(req, res, next){
  //will be req.params.id instead of hardcode
  Beer().where({id: req.params.id}).select().then(function(beer){
    knex.raw(`INSERT into batch values(default, ${req.session.id}, ${beer[0].user_id}, ${beer[0].id}, default, )`)
      console.log(beer);
  })
})

router.get('/', function(req, res, next){
  res.render('batch/show')
})




module.exports = router;
