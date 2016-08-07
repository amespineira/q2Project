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

router.post('/:batchId', function(req, res, nex){
  var stats = {
    user_id: req.session.id,
    batch_id: req.params.batch_id,
    wort_collection: req.body.wort_collection,
    batch_size: req.body.batch_size,
    efficiency: req.body.efficiency,
    gravity: req.body.gravity,
    beer_name: req.body.beer_name,
    taste: req.body.taste,
    aftertaste: req.body.aftertaste,
    smell: req.body.smell,
    mouth_feel: req.body.mouth_feel,
    drinkability: req.body.drinkability,
  }
  Finished.updateBeerStats(stats).then(function(){
    Finished.updateFinishedBatches(stats).then(function(){
      res.redirect('/main')
    })
  })
})





module.exports = router;
