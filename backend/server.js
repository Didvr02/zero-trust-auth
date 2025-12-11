require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const { error } = require('./utils/logger');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Disable caching for API responses to avoid 304 Not Modified for JSON endpoints
app.use('/api', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  if (res.removeHeader) res.removeHeader('ETag');
  next();
});

app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  error('Unhandled Server Error', { message: err.message, stack: err.stack, url: req.originalUrl });
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
