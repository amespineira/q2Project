exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('username');
    table.string('password');
    table.string('google_token');
    table.string('facebook_token')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
