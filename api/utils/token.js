const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const secretKey = process.env.JWT_SECRET || "fallbackSecret"; 
  const payload = { userId: user._id, email: user.email };
  return jwt.sign(payload, secretKey, { expiresIn: '1d' });
};

module.exports = { generateToken };