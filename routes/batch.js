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
  Batch().join('beer', 'beer.id', '=', 'batch.beer_id').where({'beer.user_id': req.session.id}).then(function(batches){
    res.render('batch/index', {batches: batches})
  })
})

router.post('/:id', function(req, res, next){
  Queries_batch.createBatch(req.body, req.session.id, req.params.id).then(function(){
      res.redirect('/batch')
  })
})

router.get('/create/:id', function(req, res, next){
  res.render('batch/form')
})

router.get('/:id', function(req, res, next){
    Queries_batch.equiptment(req.params.id).then(function(equip){
      Queries_batch.brewer_notes(data.rows[0].beer_id).then(function(notes){
        if(data.rows.length === 0){
          res.redirect('/beer')
        }else{
          res.render('batch/show', {batch: data.rows, equipment: equip.rows, notes: notes.rows})
        }
      })
  })
})




module.exports = router;
