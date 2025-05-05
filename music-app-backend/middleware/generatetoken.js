const jwt = require('jsonwebtoken');

const SECRET = 'TacoBellRocksYummy1254'; // Hardcoded secret
const user = { id: 1, name: 'Test User' };

const token = jwt.sign(user, SECRET, { expiresIn: '1h' });

console.log("Generated Token:", token);
