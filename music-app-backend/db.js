const sqlite3 = require('sqlite3').verbose();

// Open the existing database (it should be dev.sqlite3)
const db = new sqlite3.Database('./dev.sqlite3', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create tables
db.serialize(() => {
  console.log("Creating tables...");

  // Albums table
  db.run(`
    CREATE TABLE IF NOT EXISTS albums (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      artist TEXT,
      genre TEXT,
      year INTEGER
    )
  `, (err) => {
    if (err) {
      console.error("Error creating albums table:", err.message);
    } else {
      console.log("Albums table created or exists.");
    }
  });

  // Reviews table
  db.run(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      album_id INTEGER,
      rating INTEGER,
      comment TEXT,
      user_email TEXT,
      FOREIGN KEY (album_id) REFERENCES albums(id)
    )
  `, (err) => {
    if (err) {
      console.error("Error creating reviews table:", err.message);
    } else {
      console.log("Reviews table created or exists.");
    }
  });
});

module.exports = db;
