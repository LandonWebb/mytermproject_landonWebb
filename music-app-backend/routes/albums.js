const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const db = new sqlite3.Database('./dev.sqlite3');
const authenticateToken = require('../middleware/auth'); // Add this import

// Example: Get All Albums (protected)
router.get('/', authenticateToken, (req, res) => {
  db.all('SELECT * FROM albums', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ albums: rows });
  });
});

// Create Album (protected)
router.post('/', authenticateToken, (req, res) => {
  const { title, artist, genre, year } = req.body;

  // Validate the incoming data
  if (!title || !artist || !genre || !year) {
    return res.status(400).json({ error: 'All fields (title, artist, genre, year) are required' });
  }

  // Insert new album into the database
  db.run('INSERT INTO albums (title, artist, genre, year) VALUES (?, ?, ?, ?)', 
    [title, artist, genre, year], 
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create album' });
      }
      res.status(201).json({ message: 'Album created successfully', id: this.lastID });
    }
  );
});

module.exports = router;
