const express = require('express');
const app = express();
const users = require('./routes/users');
const albums = require('./routes/albums');
const reviews = require('./routes/reviews');

app.use(express.json());
app.use('/api/users', users);
app.use('/api/albums', albums);
app.use('/api/reviews', reviews);

module.exports = app;
