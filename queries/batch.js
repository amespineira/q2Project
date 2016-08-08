var knex = require('../db/knex');

module.exports = {
  createBatch: function(body, id1, id2){
    var date = dateSplit(Date());
    return knex.raw(`INSERT into batch values(default, ${id1}, ${id2}, '${date}', '${body.end_date}', ${body.expected_yield}, ${null}, 4, 1);`)
  },
  beer_id: function(id){
    return knex.raw(`SELECT beer_id from batch where id=${id}`);
  },
  equipment: function(id){
    return knex.raw(`SELECT * from equipment where batch_id = ${id};`)
  },
  brewer_notes: function(id){
    return knex.raw(`SELECT notes from brewer_notes where beer_id = ${id};`)
  },
  add_notes: function(user, beer, text){
    return knex.raw(`INSERT into brewer_notes values(default, ${user}, ${beer}, '${text}');`)
  },
  addManyNotes: function(user, beer, notes){
    var promiseArray=[];
    for(var i=0; i<notes.length; i++){
      promiseArray[i]=knex.raw(`INSERT INTO brewer_notes VALUES (DEFAULT, ${user}, ${beer}, '${notes[i]}')`)
    }
    return Promise.all(promiseArray).then(values => {
    })
  },
  steps: function(id){
    return knex.raw(`SELECT * from steps where batch_id = ${id} ORDER by step_order ASC`)
  },
  getLatestBatch:function(userid){
    return knex.raw(`SELECT MAX (id) FROM batch WHERE user_id=${userid}`)
  },
  batchInfo: function(id){
    return knex.raw(`SELECT * from batch where id = ${id};`)
  },
<<<<<<< HEAD
  allStages: function(){
    return knex.raw(`SELECT * FROM batch`)
  },
  addStep:function(stepSpecs, batchId){
    return knex.raw(`SELECT MAX(step_order) FROM steps WHERE batch_id=${batchId} AND stage=${stepSpecs.stage};`).then(function(max){
      var order=max.rows[0].max+1
      return knex.raw(`INSERT INTO steps VALUES (DEFAULT, ${stepSpecs.stage}, '${stepSpecs.name}', '${stepSpecs.notes}', ${batchId}, false, ${order})`)
    })
  },
  deleteBatch:function(batchId){
    return knex.raw(`DELETE FROM batch WHERE id=${batchId}`)
  },
  deleteSteps:function(batchId){
    return knex.raw(`DELETE FROM steps WHERE batch_id=${batchId}`)
  },
  curr_stage: function(batch){
    return knex.raw(`SELECT curr_stage from batch where id = ${batch}`)
  },
  stageDone: function(batch){
    return knex.raw(`UPDATE batch set curr_stage = (curr_stage + 1) where id=${batch};`)
  },
  stepsDone: function(stage, batch){
    return knex.raw(`UPDATE steps set done = true where stage = ${stage} AND batch_id = ${batch};`)
  },
  beerName: function(batch){
    return knex.raw(`SELECT beer.id AS beer_id, beer.beer_name AS beer_name from beer join batch on batch.beer_id = beer.id where batch.id = ${batch};`)
=======
  addSteps: function(steps, batchid){
    var curr=steps.pop()
    return knex.raw(`INSERT INTO steps VALUES (DEFAULT, ${curr.stage}, '${curr.name}', '${curr.notes}', ${batchid}, false, ${curr.step_order})`).then(function(){
        return (steps.length>0)? module.exports.addSteps(steps, batchid) : Promise.resolve(true);
    })
>>>>>>> stepValidation
  }
}


function dateSplit(date){
var res = date.split(' ')
//5th space
var res2 = '';
for (var i = 0; i < 5; i++) {
  res2 += (' ' + res[i]);
  }
  return res2;
}
