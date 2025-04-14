const express = require('express');
const app = express();

const authenticateToken = require('./middleware/auth'); 

const usersRoutes = require('./routes/users');
const albumsRoutes = require('./routes/albums');
const reviewsRoutes = require('./routes/reviews');

app.use(express.json());

app.use('/api/users', usersRoutes);

app.use('/api/albums', authenticateToken, albumsRoutes);
app.use('/api/reviews', authenticateToken, reviewsRoutes);

module.exports = app;
