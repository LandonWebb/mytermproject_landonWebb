// routes/albums.js
const express = require('express');
const router = express.Router();

// Example: Get All Albums (protected)
router.get('/', (req, res) => {
  res.json({ message: 'List of albums' });
});

module.exports = router;
