var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Queries_batch = require('../queries/batch');

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
  Batch().join('beer', 'beer.id', '=', 'batch.beer_id').then(function(batches){
    res.render('batch/index', {batches: batches})
  })
})

router.post('/:id', function(req, res, next){
  Queries_batch.createBatch(req.body, req.session.id, req.params.id).then(function(){
      res.redirect('/batch')
  })
})

router.get('/:id', function(req, res, next){
  Queries_batch.ingredientData(req.params.id).then(function(data){
    console.log(data.rows);
    res.render('batch/show', {batch: data.rows})
  })
})




module.exports = router;
