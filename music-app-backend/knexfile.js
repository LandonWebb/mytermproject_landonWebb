module.exports = {
    development: {
      client: 'sqlite3',
      connection: {
        filename: './music.sqlite3' 
      },
      useNullAsDefault: true,
      migrations: {
        directory: './migrations' 
      },
      seeds: {
        directory: './db/seeds' 
      }
    }
  };
  