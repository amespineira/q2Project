exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('batch').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('batch').insert({id: 1, user_id:1 , beer_id:1 , start_date:'6-15-2015' , end_date:'7-16-2015' , expected_yield:1, actual_yield:2 , gravity:1.0 }),
        knex('batch').insert({id: 2, user_id:1 , beer_id:2 , start_date:'7-16-2015' , end_date:'8-17-2015' , expected_yield:1, actual_yield:2 , gravity:1.1 }),
        knex('batch').insert({id: 3, user_id:2 , beer_id:3 , start_date:'8-17-2015' , end_date:'9-17-2015' , expected_yield:1, actual_yield:2 , gravity:1.2 }),
        knex('batch').insert({id: 4, user_id:2 , beer_id:4 , start_date:'9-18-2015' , end_date:'10-17-2015' , expected_yield:1, actual_yield:2 , gravity:1.3 }),
        knex('batch').insert({id: 5, user_id:3 , beer_id:5 , start_date:'10-19-2015' , end_date:'11-17-2015' , expected_yield:1, actual_yield:2 , gravity:1.4 }),
        knex('batch').insert({id: 6, user_id:3 , beer_id:6 , start_date:'11-20-2015' , end_date:'12-17-2015' , expected_yield:1, actual_yield:2 , gravity:1.5 }),
        knex('batch').insert({id: 7, user_id:4 , beer_id:7 , start_date:'12-21-2015' , end_date:'1-17-2016' , expected_yield:1, actual_yield:2 , gravity:1.6 }),
        knex('batch').insert({id: 8, user_id:4 , beer_id:8 , start_date:'1-22-2015' , end_date:'2-17-2015' , expected_yield:1, actual_yield:2 , gravity:1.7 }),

      ]);
    });
};
