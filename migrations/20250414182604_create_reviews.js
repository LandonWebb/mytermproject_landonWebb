exports.up = function(knex) {
  return knex.schema.createTable('reviews', (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.integer('album_id').references('id').inTable('albums').onDelete('CASCADE');
    table.integer('rating').notNullable();
    table.text('review_text');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('reviews');
};
