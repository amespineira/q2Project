exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('equipment').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('equipment').insert({equipment_name:'spoon' , user_id:1 , batch_id:1 , clean:true , clean_time:5 , clean_notes:'It was ok' }),
        knex('equipment').insert({equipment_name:'bucket' , user_id:1 , batch_id:2 , clean:true , clean_time:5 , clean_notes:'It sucked' }),
        knex('equipment').insert({equipment_name:'spoon' , user_id:2 , batch_id:3 , clean:true , clean_time:5 , clean_notes:'It was ok' }),
        knex('equipment').insert({equipment_name:'bucket' , user_id:2 , batch_id:4 , clean:true , clean_time:5, clean_notes:'It sucked' }),
        knex('equipment').insert({equipment_name:'spoon' , user_id:3 , batch_id:5 , clean:true , clean_time:5 , clean_notes:'It was ok' }),
        knex('equipment').insert({equipment_name:'bucket' , user_id:3 , batch_id:6 , clean:true , clean_time:5 , clean_notes:'It sucked' }),
        knex('equipment').insert({equipment_name:'spoon' , user_id:4 , batch_id:7 , clean:true , clean_time:5 , clean_notes:'It was ok' }),
        knex('equipment').insert({equipment_name:'bucket' , user_id:4 , batch_id:8 , clean:true , clean_time:5 , clean_notes:'It sucked' }),

      ]);
    });
};
