require('dotenv').config();
const jwt = require('jsonwebtoken');

// Mock user data (you can use any user data)
const user = { id: 1, name: 'Test User' };

// Generate a token using the secret from the .env file
const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

console.log("Generated Token:", token);  // Make sure the token is logged
