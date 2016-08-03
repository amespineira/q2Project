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

//recieving the beer id in req.params.id
router.get('/', function(req, res, next){
  Batch().join('beer', 'beer.id', '=', 'batch.beer_id').where({'beer.user_id': req.session.id}).then(function(batches){
    res.render('batch/index', {batches: batches, modalVar: 0, beer_id: ''})
  })
})

router.post('/:id', function(req, res, next){
  Queries_batch.createBatch(req.body, req.session.id, req.params.id).then(function(){
      res.redirect('/batch')
  })
})

router.get('/create/:id', function(req, res, next){
  Batch().join('beer', 'beer.id', '=', 'batch.beer_id').where({'beer.user_id': req.session.id}).then(function(batches){
    res.render('batch/index', {batches: batches, modalVar: 1, beer_id: req.params.id})
  })
})

router.post('/notes/:id', function(req, res, next){
  Queries_batch.add_notes(req.params.id, req.body.beer_id, req.body.notes).then(function(){
    res.redirect(`/batch/${req.body.batch_id}`)
  })
})

router.get('/:id', function(req, res, next){
  Queries_batch.beer_id(req.params.id).then(function(id){
    Promise.all([Beer.getOne(id.rows[0].beer_id),Ing.getBeersIng(id.rows[0].beer_id)]).then(function(results){
      Queries_batch.equiptment(req.params.id).then(function(equip){
        Queries_batch.brewer_notes(id.rows[0].beer_id).then(function(notes){
          if(results[0].rows.length === 0){
            res.redirect('/beer')
          }else if (results[0].rows[0].user_id === req.session.id){
            res.render('batch/show', {beer: results[0].rows, ing: results[1].rows, equipment: equip.rows, notes: notes.rows})
          } else {
            res.redirect('/');
          }
        })
      })
    })
  })
})




module.exports = router;
