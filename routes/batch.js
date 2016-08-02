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

//recieving the beer id in req.params.id
router.get('/', function(req, res, next){
  Batch().select().then(function(batches){
    res.render('batch/index', {batches: batches})
  })
})

router.post('/:id', function(req, res, next){
  //will be req.params.id instead of hardcode
  Beer().where({id: req.params.id}).select().then(function(beer){
    knex.raw(`INSERT into batch values(default, ${req.session.id}, ${req.params.id}, ${Date()}, ${req.body.end_date}, ${req.body.expected_yeild}, ${null}, ${1})`)
    res.redirect('/batch')
  })
})

router.get('/:id', function(req, res, next){
  
})

router.get('/', function(req, res, next){
  res.render('batch/show')
})




module.exports = router;
