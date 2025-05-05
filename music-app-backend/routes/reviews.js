const express = require('express'); 
const router = express.Router();
const knex = require('knex')(require('../knexfile').development);
const authenticateToken = require('../middleware/auth');

router.use(authenticateToken); // Protect all routes

// CREATE review
router.post('/', async (req, res) => {
  console.log("POST / - Creating review:", req.body);

  const { album_id, rating, comment } = req.body;
  const user_email = req.user.email; // From JWT

  if (!album_id || !rating || !comment) {
    return res.status(400).json({ error: 'album_id, rating, and comment are required' });
  }

  // Validate rating range (example: 1-5)
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  try {
    const [id] = await knex('reviews').insert({
      album_id,
      rating,
      comment,
      user_email
    });

    console.log(`Review created with ID: ${id}`);
    res.status(201).json({ id });
  } catch (err) {
    console.error("Error creating review:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// READ all reviews
router.get('/', async (req, res) => {
  console.log("GET / - Fetching reviews");

  const { album_id, user_email } = req.query; // Optional query params for filtering

  try {
    let reviewsQuery = knex('reviews');

    if (album_id) {
      reviewsQuery = reviewsQuery.where('album_id', album_id);
    }

    if (user_email) {
      reviewsQuery = reviewsQuery.where('user_email', user_email);
    }

    const reviews = await reviewsQuery;
    console.log("Reviews fetched:", reviews);
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// UPDATE review
router.put('/:id', async (req, res) => {
  console.log(`PUT /${req.params.id} - Updating review`, req.body);

  const { rating, comment } = req.body;

  // Validate rating range
  if (rating && (rating < 1 || rating > 5)) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5' });
  }

  try {
    const updatedRows = await knex('reviews')
      .where('id', req.params.id)
      .update({
        rating,
        comment
      });

    if (updatedRows > 0) {
      console.log(`Review with ID: ${req.params.id} updated`);
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (err) {
    console.error("Error updating review:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE review
router.delete('/:id', async (req, res) => {
  console.log(`DELETE /${req.params.id} - Deleting review`);
  try {
    const deletedRows = await knex('reviews').where('id', req.params.id).del();
    if (deletedRows > 0) {
      console.log(`Review with ID: ${req.params.id} deleted`);
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (err) {
    console.error("Error deleting review:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
