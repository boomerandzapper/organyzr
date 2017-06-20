exports.up = function(knex, Promise) {
  return knex.schema.alterTable('games_users', function(table) {
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('games_users', function(table) {
    table.dropTimestamps()
  })
};
