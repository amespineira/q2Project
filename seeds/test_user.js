
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 0, username: 'Alex the Black Beard', password:'hashbrows', google_token:'goog', facebook_token:'face'})
      ]);
    });
};
