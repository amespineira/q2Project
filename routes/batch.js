var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var Queries_batch = require('../queries/batch');
var Beer = require('../queries/beer')
var Ing=require('../queries/ingredients.js')
var Equip=require('../queries/equipment.js')
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


router.post('/create', function(req, res, next){
  var specs={
    user_id:req.session.id,
    name:req.body.beer_name,
    type:req.body.type,
    style:req.body.style
  }
  Beer.create(specs).then(function(){
    Beer.getLatestBeer(req.session.id).then(function(beerid){
      Beer.getOne(beerid.rows[0].max).then(function(userBeer){
        Equip.getAllEquipment(req.session.id).then(function(equipment){
          Queries_batch.createBatch(req.body, req.session.id, beerid.rows[0].max).then(function(){
            Queries_batch.getLatestBatch(req.session.id).then(function(newBatch){
              console.log(newBatch);
              res.render('batch/create', {beer:userBeer.rows, equipment:equipment.rows, beerid:beerid.rows[0].max, batchid:newBatch.rows[0].max})
            })
          })
        })
      })
    })
  })
})

router.post('/step/:id', function(req, res, next){
  //recieving batch.id
  console.log(req.body);
  Queries_batch.addStep(req.body, req.params.id).then(function(){
    res.redirect('/batch/'+req.params.id)

  })
})

router.post('/equipment/:batchid', function(req, res, next){
    var specs={
      equipment_name:req.body.equipmentName,
      batch_id:req.params.batchid,
      clean:req.body.clean,
      cleaning_time:req.body.cleanTime,
      cleaning_notes:''
    }
    console.log("in equipment thing");
  Equip.createEquipment(specs, req.session.id).then(function() {
    console.log("about to redirect");
    res.redirect(`/batch/${req.params.batchid}`)
  })
})
router.post('/ingredient/:beerid/:batchid', function(req,res,next){
  console.log("request recived");
  console.log(req.body);
  var ingredients=[]
  var ingredients2=[]
  ingredients.push({
    name:req.body.ingredientName,
    type:req.body.ingredientType,
    units:req.body.ingredientUnits
  })
  ingredients2.push({
    name:req.body.ingredientName,
    type:req.body.ingredientType,
    units:req.body.ingredientUnits,
    amount:req.body.ingredientAmount,
  })
  console.log("arrays made");
  Ing.createIfMissing(ingredients).then(function(){
    console.log('made missing');
    Ing.createBeerIngredients(ingredients2, req.params.beerid).then(function(result){
      'inserted into bi table'
      res.redirect(`/batch/${req.params.batchid}`)

    })
  })
})


router.post('/notes/:id', function(req, res, next){
  Queries_batch.add_notes(req.params.id, req.body.beer_id, req.body.notes).then(function(){
    res.redirect(`/batch/${req.body.batch_id}`)
  })
})

router.get('/create/:id', function(req, res, next){
  var fortnightAway = new Date(+new Date + 12096e5);
  Batch().join('beer', 'beer.id', '=', 'batch.beer_id').where({'beer.user_id': req.session.id}).then(function(batches){
    res.render('batch/index', {batches: batches, modalVar: 1, beer_id: req.params.id, date: fortnightAway.toISOString().split('T')[0]})
  })
})




router.post('/submit/:beerid/:batchid', function(req, res, next){
  console.log("what the fuck is happening");
  console.log(req.body);
  console.log(req.params.beerid);
  console.log(req.params.batchid);
  var ingredients=[];
  var ingredients2=[];
  if(Array.isArray(req.body.ingredientName)){
    for(var i=0; i<req.body.ingredientName.length; i++){
      ingredients.push({
        name:req.body.ingredientName[i],
        type:req.body.ingredientType[i],
        units:req.body.ingredientUnits[i]
      })
      ingredients2.push({
        name:req.body.ingredientName[i],
        type:req.body.ingredientType[i],
        units:req.body.ingredientUnits[i],
        amount:req.body.ingredientAmount[i],
      })
    }
  }
  else{
    ingredients.push({
      name:req.body.ingredientName,
      type:req.body.ingredientType,
      units:req.body.ingredientUnits
    })
    ingredients2.push({
      name:req.body.ingredientName,
      type:req.body.ingredientType,
      units:req.body.ingredientUnits,
      amount:req.body.ingredientAmount,
    })
  }
  var notesOut=[]
  if(Array.isArray(req.body.notes)){
    for(var i=0; i<req.body.notes.length; i++){
      notesOut.push(req.body.notes[i])
    }
  }
  else{
    notesOut.push(req.body.notes)
  }
  Ing.createIfMissing(ingredients).then(function(){
    console.log("here");
    Ing.createBeerIngredients(ingredients2, req.params.beerid).then(function(result){
      console.log("here now");
      Queries_batch.addManyNotes(req.session.id, req.params.beerid, notesOut).then(function(){
        console.log("here again");
        res.redirect('/batch/'+req.params.batchid)
      })
    })
  })
})
router.post('/create/beer/:beerid', function(req,res,next){
  Beer.copyRecipie(req.params.beerid, req.session.id).then(function(){
    Beer.getLatestBeer(req.session.id).then(function(latest){
      Queries_batch.createBatch(req.body, req.session.id, latest.rows[0].max).then(function(){
        Queries_batch.getLatestBatch(req.session.id).then(function(newBatch){
          console.log(newBatch);
          res.redirect('/batch/'+newBatch.rows[0].max)
        })
      })
    })
  })
})
router.get('/:id', function(req, res, next){
  Queries_batch.beer_id(req.params.id).then(function(id){
    Promise.all([Beer.getOne(id.rows[0].beer_id),Ing.getBeersIng(id.rows[0].beer_id)]).then(function(results){
      Queries_batch.equipment(req.params.id).then(function(equip){
        Queries_batch.brewer_notes(id.rows[0].beer_id).then(function(notes){
          Queries_batch.batchInfo(req.params.id).then(function(batch){
            Queries_batch.steps(req.params.id).then(function(steps){
              console.log('*************');
              console.log(steps.rows);
          if(results[0].rows.length === 0){
            res.redirect('/beer')
          }else if (results[0].rows[0].user_id === req.session.id){
            res.render('batch/show', {beer: results[0].rows, ing: results[1].rows, beer_id: id.rows[0].beer_id, batch_id: req.params.id,
              equipment: equip.rows, notes: notes.rows, curr_stage: batch.rows[0].curr_stage, steps: steps.rows})
          } else {
            res.redirect('/');
          }
            })
          })
        })
      })
    })
  })
})



module.exports = router;
