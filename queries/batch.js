var knex = require('../db/knex');

module.exports = {
  createBatch: function(body, id1, id2){
    return knex.raw(`INSERT into batch values(default, ${id1}, ${id2}, ${Date()}, ${body.end_date}, ${body.expected_yeild}, ${null}, ${1});`)
  },
  equiptment: function(id){
    return knex.raw(`SELECT * from equipment where batch_id = ${id};`)
  },
  brewer_notes: function(id){
    return knex.raw(`SELECT notes from brewer_notes where beer_id = ${id};`)
  }
}
