exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('beer').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('beer').insert({id: 1, user_id:1 , beer_name:'Alex Beer 1' , type:'Ale' , style:'Amber' }),
        knex('beer').insert({id: 2, user_id:1 , beer_name:'Alex Beer 2' , type:'Lager' , style:'Brown'}),
        knex('beer').insert({id: 3, user_id:2 , beer_name:'Ben Beer 1' , type:'Stout' , style:'Blonde'}),
        knex('beer').insert({id: 4, user_id:2 , beer_name:'Ben Beer 2' , type:'Porter' , style:'Cream'}),
        knex('beer').insert({id: 5, user_id:3 , beer_name:'Andres Beer 1' , type:'Malt' , style:'Fruit'}),
        knex('beer').insert({id: 6, user_id:3 , beer_name:'Andres Beer 2' , type:'Ale' , style:'Golden'}),
        knex('beer').insert({id: 7, user_id:4 , beer_name:'Mike Beer 1' , type:'Lager' , style:'Honey'}),
        knex('beer').insert({id: 8, user_id:4 , beer_name:'Mike Beer 2' , type:'Stout' , style:'Cream'}),

      ]);
    });
};
