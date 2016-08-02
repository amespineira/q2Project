

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({id: 1, username: 'AlexTheBlackBeard', password: '$2a$10$NyTPUAgPEA1ynBqr3cxtRu7s.0TW112.LR1aWxQw3nWehVlFkuXyi', google_token:'goog', facebook_token:'face'}),
        knex('users').insert({id: 2, username: 'BenAndJerry', password: '$2a$10$NyTPUAgPEA1ynBqr3cxtRu7s.0TW112.LR1aWxQw3nWehVlFkuXyi', google_token:'goog', facebook_token:'face'}),
        knex('users').insert({id: 3, username: 'AndresTheGiant', password: '$2a$10$NyTPUAgPEA1ynBqr3cxtRu7s.0TW112.LR1aWxQw3nWehVlFkuXyi', google_token:'goog', facebook_token:'face'}),
        knex('users').insert({id: 4, username: 'MikeHunt', password: '$2a$10$NyTPUAgPEA1ynBqr3cxtRu7s.0TW112.LR1aWxQw3nWehVlFkuXyi', google_token:'goog', facebook_token:'face'})
      ]);
    });
};
