const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateToken = (user) => {
  const secretKey = crypto.randomBytes(32).toString('hex');
  const payload = { userId: user._id, email: user.email };
  return jwt.sign(payload, secretKey, { expiresIn: '1d' });
};

module.exports = { generateToken };