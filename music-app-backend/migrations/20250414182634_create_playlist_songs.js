exports.up = function(knex) {
  return knex.schema.createTable('playlist_songs', (table) => {
    table.increments('id').primary();
    table.integer('playlist_id').references('id').inTable('playlists').onDelete('CASCADE');
    table.integer('song_id').references('id').inTable('songs').onDelete('CASCADE');
    table.unique(['playlist_id', 'song_id']);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('playlist_songs');
};
