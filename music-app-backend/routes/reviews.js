const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile').development);

// CREATE review
router.post('/', async (req, res) => {
  try {
    const [id] = await knex('reviews').insert(req.body);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await knex('reviews');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE review
router.put('/:id', async (req, res) => {
  try {
    await knex('reviews').where('id', req.params.id).update(req.body);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE review
router.delete('/:id', async (req, res) => {
  try {
    await knex('reviews').where('id', req.params.id).del();
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
