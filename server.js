require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const app = express();
const reviewsRoutes = require('./routes/reviews');

app.use(express.json());
app.use('/api/reviews', reviewsRoutes);
