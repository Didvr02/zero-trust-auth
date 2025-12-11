const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret_jwt_key';

const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header) return res.status(401).json({ message: 'No token provided' });
  
  const parts = header.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid token format (Expected: Bearer <token>)' });
  }
  
  const token = parts[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const requireRole = (role) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' }); 
  if (req.user.role !== role) {
    return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
  }
  next();
};

module.exports = { requireAuth, requireRole };
