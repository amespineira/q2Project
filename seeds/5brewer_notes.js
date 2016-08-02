
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('brewer_notes').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('brewer_notes').insert({user_id:1 , beer_id:1 , notes:'good' }),
        knex('brewer_notes').insert({user_id:1 , beer_id:1 , notes:'meh' }),
        knex('brewer_notes').insert({user_id:1 , beer_id:2 , notes:'good' }),
        knex('brewer_notes').insert({user_id:1 , beer_id:2 , notes:'meh' }),
        knex('brewer_notes').insert({user_id:2 , beer_id:3 , notes:'good' }),
        knex('brewer_notes').insert({user_id:2 , beer_id:3 , notes:'meh' }),
        knex('brewer_notes').insert({user_id:2 , beer_id:4 , notes:'good' }),
        knex('brewer_notes').insert({user_id:2 , beer_id:4 , notes:'meh' }),
        knex('brewer_notes').insert({user_id:3 , beer_id:5 , notes:'good' }),
        knex('brewer_notes').insert({user_id:3 , beer_id:5 , notes:'meh' }),
        knex('brewer_notes').insert({user_id:3 , beer_id:6 , notes:'good' }),
        knex('brewer_notes').insert({user_id:3 , beer_id:6 , notes:'meh' }),
        knex('brewer_notes').insert({user_id:4 , beer_id:7 , notes:'good' }),
        knex('brewer_notes').insert({user_id:4 , beer_id:7 , notes:'meh' }),
        knex('brewer_notes').insert({user_id:4 , beer_id:8 , notes:'good' }),
        knex('brewer_notes').insert({user_id:4 , beer_id:8 , notes:'meh' })
      ]);
    });
};
