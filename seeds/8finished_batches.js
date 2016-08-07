exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('finished_batches').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('finished_batches').insert({beer_name:'Alex Beer 4' , user_id:1 , batch_id:4 , taste:'delicious' , aftertaste:'hoppy', appearance:'cloudy' , smell:'skunky' , mouth_feel:'grainy' ,drinkability:'yes' }),

      ]);
    });
};
