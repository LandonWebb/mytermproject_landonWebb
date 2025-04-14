exports.up = function(knex) {
  return knex.schema.createTable('playlists', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('playlists');
};
