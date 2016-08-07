exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('beer_ingredients').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('beer_ingredients').insert({beer_id:1 , ingredient_id:1 , amount:4}),
        knex('beer_ingredients').insert({beer_id:2 , ingredient_id:2 , amount:4}),
        knex('beer_ingredients').insert({beer_id:3 , ingredient_id:3 , amount:4}),
        knex('beer_ingredients').insert({beer_id:4 , ingredient_id:1 , amount:4}),

      ]);
    });
};
