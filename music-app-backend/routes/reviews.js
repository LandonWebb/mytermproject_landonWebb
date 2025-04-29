const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile').development);

// CREATE review
// CREATE review
router.post('/', async (req, res) => {
  console.log("POST / - Creating review:", req.body);  // Log the incoming data
  try {
    const [id] = await knex('reviews').insert(req.body);
    console.log(`Review created with ID: ${id}`); // Log the inserted review ID
    res.status(201).json({ id });
  } catch (err) {
    console.error("Error creating review:", err.message); // Log any errors
    res.status(500).json({ error: err.message });
  }
});


// READ all reviews
router.get('/', async (req, res) => {
  console.log("GET / - Fetching reviews");  // Log when the route is hit
  try {
    const reviews = await knex('reviews');
    console.log("Reviews fetched:", reviews);  // Log the fetched reviews
    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err.message); // Log any errors
    res.status(500).json({ error: err.message });
  }
});

// UPDATE review
router.put('/:id', async (req, res) => {
  console.log(`PUT /${req.params.id} - Updating review`, req.body); // Log the review ID and body to update
  try {
    await knex('reviews').where('id', req.params.id).update(req.body);
    console.log(`Review with ID: ${req.params.id} updated`);  // Log update confirmation
    res.sendStatus(204);
  } catch (err) {
    console.error("Error updating review:", err.message); // Log any errors
    res.status(500).json({ error: err.message });
  }
});


// DELETE review
router.delete('/:id', async (req, res) => {
  console.log(`DELETE /${req.params.id} - Deleting review`); // Log the review ID to delete
  try {
    await knex('reviews').where('id', req.params.id).del();
    console.log(`Review with ID: ${req.params.id} deleted`);  // Log delete confirmation
    res.sendStatus(204);
  } catch (err) {
    console.error("Error deleting review:", err.message); // Log any errors
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
