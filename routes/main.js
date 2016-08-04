var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Queries_batch = require('../queries/batch');
var Beer = require('../queries/beer')
var Ing=require('../queries/ingredients.js')

function Batch(){
return knex('batch');
}
function Beer(){
  return knex('beer');
}
function Beer_ingredients(){
  return ('beer_ingredients');
}


router.get('/', function(req, res, next){
  Batch().join('beer', 'beer.id', '=', 'batch.beer_id').where({'beer.user_id': req.session.id}).then(function(batches){
    res.render('batch/index', {batches: batches, modalVar: 0, beer_id: '', date: ''})
  })
})



module.exports = router;
