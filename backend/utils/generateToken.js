const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_jwt_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

module.exports = generateToken;
