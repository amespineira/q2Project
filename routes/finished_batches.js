var express = require('express');
var router = express.Router();
var Finished = require('../queries/finished_batches');
var Equipment = require('../queries/equipment');
var BrewerNotes = require('../queries/brewer_notes')
var BeerStats = require('../queries/beerStats')
router.get('/:batchId/:beerId', function(req, res, next){
  Finished.all(req.params.batchId).then(function(finished_batch){
    Finished.findIngredients(req.params.beerId).then(function(ingredients){
      Equipment.getAllEquipment(req.session.id).then(function(equipment){
        BrewerNotes.allBrewerNotes(req.params.beerId).then(function(brewer_notes){
          BeerStats.allBeerStats(5).then(function(beerStats){
          res.render('finished_batch/index', {finished_batch: finished_batch.rows[0], ingredients: ingredients.rows, equipment: equipment.rows, brewer_notes: brewer_notes.rows, beer_stats: beerStats.rows[0]})
          })
        })
      })
    })
  })
});


module.exports = router;
