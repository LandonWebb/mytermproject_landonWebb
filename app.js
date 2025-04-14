const express = require('express');
const app = express();

const usersRoutes = require('./routes/users');
const albumsRoutes = require('./routes/albums');
const reviewsRoutes = require('./routes/reviews');

app.use(express.json());
app.use('/api/users', usersRoutes);
app.use('/api/albums', albumsRoutes);
app.use('/api/reviews', reviewsRoutes);

module.exports = app;
