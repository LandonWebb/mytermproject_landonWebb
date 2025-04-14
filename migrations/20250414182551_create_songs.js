exports.up = function(knex) {
  return knex.schema.createTable('songs', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.integer('album_id').references('id').inTable('albums').onDelete('CASCADE');
    table.integer('duration');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('songs');
};
