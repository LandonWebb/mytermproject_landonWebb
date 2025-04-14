exports.up = function(knex) {
  return knex.schema.createTable('albums', (table) => {
    table.increments('id').primary();
    table.string('title').notNullable();
    table.string('artist').notNullable();
    table.date('release_date');
    table.string('genre');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('albums');
};
