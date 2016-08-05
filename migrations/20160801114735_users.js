exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('username');
    table.string('password');
    table.string('twitter_token');
    table.string('google_token');
    table.string('facebook_token')
    table.string('auth_type')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
