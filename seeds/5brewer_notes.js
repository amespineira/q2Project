
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('brewer_notes').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('brewer_notes').insert({user_id:1 , beer_id:1 , notes:'tastes fine, smells awful' }),
        knex('brewer_notes').insert({user_id:1 , beer_id:2 , notes:'big and bold' }),
        knex('brewer_notes').insert({user_id:1 , beer_id:3 , notes:'pairs nicely with captain crunch' }),
        knex('brewer_notes').insert({user_id:1 , beer_id:4 , notes:'a radioactive wasteland' }),
      ]);
    });
};
