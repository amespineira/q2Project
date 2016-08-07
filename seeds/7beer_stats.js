exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('beer_stats').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('beer_stats').insert({batch_id:1 , wort_collection:10 , batch_size:1 , efficiency:3 , gravity:1.1}),
        knex('beer_stats').insert({batch_id:2 , wort_collection:15 , batch_size:2 , efficiency:6 , gravity:1.2}),
        knex('beer_stats').insert({batch_id:3 , wort_collection:20 , batch_size:3 , efficiency:9 , gravity:1.3}),
        knex('beer_stats').insert({batch_id:4 , wort_collection:25 , batch_size:4 , efficiency:12 , gravity:1.4}),


      ]);
    });
};
