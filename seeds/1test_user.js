

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({username: 'AlexTheBlackBeard', password: '$2a$10$LTVhSAVgxA7Ks40cfUPDBOPfxcLDn3qs4ZFIrqqwWeOcsTikCfzcq', google_token:'goog', facebook_token:'face'}),
        knex('users').insert({username: 'BenAndJerry', password: '$2a$10$LTVhSAVgxA7Ks40cfUPDBOPfxcLDn3qs4ZFIrqqwWeOcsTikCfzcq', google_token:'goog', facebook_token:'face'}),
        knex('users').insert({username: 'AndresTheGiant', password: '$2a$10$LTVhSAVgxA7Ks40cfUPDBOPfxcLDn3qs4ZFIrqqwWeOcsTikCfzcq', google_token:'goog', facebook_token:'face'}),
        knex('users').insert({username: 'MikeHunt', password: '$2a$10$LTVhSAVgxA7Ks40cfUPDBOPfxcLDn3qs4ZFIrqqwWeOcsTikCfzcq', google_token:'goog', facebook_token:'face'})
      ]);
    });
};
