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
  try {
    const reviews = await knex('reviews');
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
  try {
    await knex('reviews').where('id', req.params.id).update(req.body);
    console.log(`Review with ID: ${req.params.id} updated`);
    res.sendStatus(204);
  } catch (err) {
    console.error("Error updating review:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// DELETE review
router.delete('/:id', async (req, res) => {
  console.log(`DELETE /${req.params.id} - Deleting review`);
  try {
    await knex('reviews').where('id', req.params.id).del();
    console.log(`Review with ID: ${req.params.id} deleted`);
    res.sendStatus(204);
  } catch (err) {
    console.error("Error deleting review:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
