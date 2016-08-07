
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('equipment').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('equipment').insert({equipment_name:'spoon' , user_id:1 , batch_id:1 , clean:true , clean_time:5 , clean_notes:'Scrub Harder' }),
        knex('equipment').insert({equipment_name:'bucket' , user_id:1 , batch_id:1 , clean:true , clean_time:5 , clean_notes:'Scrub Harder' }),
        knex('equipment').insert({equipment_name:'spoon' , user_id:1 , batch_id:2 , clean:true , clean_time:5 , clean_notes:'Scrub Harder' }),
        knex('equipment').insert({equipment_name:'bucket' , user_id:1 , batch_id:2 , clean:true , clean_time:5, clean_notes:'Scrub Harder' }),
        knex('equipment').insert({equipment_name:'spoon' , user_id:1 , batch_id:3 , clean:true , clean_time:5, clean_notes:'Scrub Harder' }),
        knex('equipment').insert({equipment_name:'bucket' , user_id:1 , batch_id:3 , clean:true , clean_time:5, clean_notes:'Scrub Harder' }),
        knex('equipment').insert({equipment_name:'spoon' , user_id:1 , batch_id:4 , clean:true , clean_time:5, clean_notes:'Scrub Harder' }),
        knex('equipment').insert({equipment_name:'bucket' , user_id:1 , batch_id:4 , clean:true , clean_time:5, clean_notes:'Scrub Harder' }),

      ]);
    });
};
