var express = require('express');
var router = express.Router();
var Finished = require('../queries/finished_batches');

router.get('/:batchId', function(req, res, next){
  console.log(req.params.batchId)
  Finished.all(req.params.batchId).then(function(finished_batch){
    console.log(finished_batch.rows)
    res.render('finished_batch/index', {finished_batch: finished_batch.rows})

  })
});

module.exports = router;
