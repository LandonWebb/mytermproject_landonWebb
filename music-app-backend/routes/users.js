const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');


const db = new sqlite3.Database('./dev.sqlite3', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Example of creating a users table (run once)
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT)');
});

// Register route
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required' });
  }

  // Check if the user already exists
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (row) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to register user' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, row.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and sign a JWT
    const token = jwt.sign({ email: row.email }, 'secretkey', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  });
});

// Ensure proper cleanup when closing the app
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database closed');
    }
    process.exit(0);
  });
});

module.exports = router;
