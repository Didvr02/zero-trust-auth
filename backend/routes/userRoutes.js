const express = require('express');
const router = express.Router();
const { getMe, getAllUsers, deleteUser } = require('../controllers/userController');
const { requireAuth, requireRole } = require('../middleware/authMiddleware');

router.get('/me', requireAuth, getMe);
router.get('/all', requireAuth, requireRole('admin'), getAllUsers);
router.delete('/:id', requireAuth, requireRole('admin'), deleteUser);

module.exports = router;
