
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('batch').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('batch').insert({user_id:1 , beer_id:1 , start_date:'6-15-2015' , end_date:'7-16-2015' , expected_yield:1, actual_yield:2, curr_stage: 1}),
        knex('batch').insert({user_id:1 , beer_id:2 , start_date:'6-15-2015' , end_date:'7-16-2015' , expected_yield:1, actual_yield:2, curr_stage: 2}),
        knex('batch').insert({user_id:1 , beer_id:3 , start_date:'6-15-2015' , end_date:'7-16-2015' , expected_yield:1, actual_yield:2, curr_stage: 3}),
        knex('batch').insert({user_id:1 , beer_id:4 , start_date:'6-15-2015' , end_date:'7-16-2015' , expected_yield:1, actual_yield:2, curr_stage: 4}),

      ]);
    });
};
