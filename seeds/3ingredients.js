
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('ingredients').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('ingredients').insert({ingredient_name: 'citra', ingredient_type: 'hop', units: 'ounces', flavor_notes: 'citrus notes'}),
        knex('ingredients').insert({ingredient_name: 'ipa malt', ingredient_type: 'grain', units: 'grams', flavor_notes: 'wheaty'}),
        knex('ingredients').insert({ingredient_name: 'american yeast', ingredient_type: 'dry_yeast', units: 'grams', flavor_notes: 'rich'})
      ]);
    });
};
