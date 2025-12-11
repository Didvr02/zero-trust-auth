const bcrypt = require('bcryptjs');
const { findUserByEmail, addUser } = require('../utils/users');
const { info, warn, error } = require('../utils/logger');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    warn('Registration failed: Missing fields', { body: req.body });
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  const existingUser = findUserByEmail(email);
  if (existingUser) {
    warn('Registration failed: User already exists', { email });
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    const newUser = await addUser(email, password, role);

    const payload = { id: newUser.id, email: newUser.email, role: newUser.role };
    const token = generateToken(payload);

    info('User registered successfully', { id: newUser.id, email, role });
    res.json({ token, user: { email: newUser.email, role: newUser.role } });
  } catch (err) {
    error('Registration failed due to server error', { error: err.message, email });
    return res.status(500).json({ message: 'Server error during registration' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  const user = findUserByEmail(email);
  const passwordHash = user ? user.password_hash : '';

  if (!user) {
    warn('Login attempt failed: User not found', { email });
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const match = await bcrypt.compare(password, passwordHash);
  if (!match) {
    warn('Login attempt failed: Invalid password', { email });
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const payload = { id: user.id, email: user.email, role: user.role };
  const token = generateToken(payload);

  info('User logged in successfully', { id: user.id, email: user.email, role: user.role });
  res.json({ token, user: { email: user.email, role: user.role } });
};
