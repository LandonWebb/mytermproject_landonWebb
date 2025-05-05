const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './middleware/.env' });


const SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  console.log('Received token:', token); // Log the token for debugging

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('Error verifying token:', err.message); // Log the error
    return res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;
