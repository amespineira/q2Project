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
  knex.raw(`SELECT batch.id AS id, batch.start_date, batch.end_date, batch.expected_yield, beer.beer_name FROM batch JOIN beer ON beer.id=batch.beer_id WHERE batch.user_id=${req.session.id}`).then(function(batches){
    console.log(batches);
    res.render('batch/index', {batches: batches.rows, modalVar: 0, beer_id: '', date: ''})
  })
})



module.exports = router;
