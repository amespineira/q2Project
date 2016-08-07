

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({username: 'AlexTheBlackBeard', password: '$2a$10$LTVhSAVgxA7Ks40cfUPDBOPfxcLDn3qs4ZFIrqqwWeOcsTikCfzcq', twitter_token:'twit', google_token:'goog', facebook_token:'face', auth_type:'auth'}),
      ]);
    });
};
