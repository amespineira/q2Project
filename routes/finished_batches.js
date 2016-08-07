var express = require('express');
var router = express.Router();
var Finished = require('../queries/finished_batches');
var Equipment = require('../queries/equipment');
var BrewerNotes = require('../queries/brewer_notes');
var BeerStats = require('../queries/beerStats');
var Ingredients = require('../queries/ingredients');
var Inventory = require('../queries/inventory');
var Batch = require('../queries/batch');


router.get('/:batchId', function(req, res, next){
  var batchId = req.params.batchId;

  Finished.all(batchId).then(function(finished_batch){
    Batch.beer_id(batchId).then(function(beerId){
      Finished.findIngredients(beerId.rows[0].beer_id).then(function(ingredients){
        Equipment.getBatchEquipment(batchId).then(function(equipment){
          BeerStats.allBeerStats(batchId).then(function(stats){
            BrewerNotes.allBrewerNotes(beerId.rows[0].beer_id).then(function(notes){
              Batch.batchInfo(batchId).then(function(batchInfo){
                res.render('finished_batch/index', {finished_batch: finished_batch.rows[0], ingredients: ingredients.rows, equipment: equipment.rows, brewer_notes: notes.rows, beer_stats: stats.rows[0], batch: batchInfo.rows[0]})

              })
            })
          })
        })
      })
    })
  })
});




module.exports = router;
