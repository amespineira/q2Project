var knex = require('../db/knex');

module.exports = {
  createBatch: function(body, id1, id2){
    var date = dateSplit(Date());
    return knex.raw(`INSERT into batch values(default, ${id1}, ${id2}, '${date}', '${body.end_date}', ${body.expected_yield}, ${null}, ${null});`)
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
    console.log(notes);
    var note=notes.pop()
    knex.raw(`INSERT into brewer_notes values(default, ${user}, ${beer}, '${note}');`)
    return (notes.length>0)? addManyNotes(user, beer, notes) : Promise.resolve(true)
  },
  getLatestBatch:function(userid){
    return knex.raw(`SELECT MAX (id) FROM batch WHERE user_id=${userid}`)
  },
  batchInfo: function(id){
    return knex.raw(`SELECT * from batch where id = ${id};`)
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
