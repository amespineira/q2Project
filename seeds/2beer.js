
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('beer').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('beer').insert({user_id:1 , beer_name:'Alex Beer 1' , type:'Ale' , style:'Amber' }),
        knex('beer').insert({user_id:1 , beer_name:'Alex Beer 2' , type:'Lager' , style:'Brown'}),
        knex('beer').insert({user_id:1 , beer_name:'Alex Beer 3' , type:'Stout' , style:'Blonde'}),
        knex('beer').insert({user_id:1 , beer_name:'Alex Beer 4' , type:'Porter' , style:'Cream'}),
      ]);
    });
};
