const express = require('express');
const app = express();

const authenticateToken = require('./middleware/auth'); 

const usersRoutes = require('./routes/users');
const albumsRoutes = require('./routes/albums');
const reviewsRoutes = require('./routes/reviews');

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Music App API!');
});

app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/albums', authenticateToken, albumsRoutes);
app.use('/api/reviews', authenticateToken, reviewsRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
