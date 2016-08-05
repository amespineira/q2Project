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
  allStages: function(){
    return knex.raw(`SELECT * FROM batch`)
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
