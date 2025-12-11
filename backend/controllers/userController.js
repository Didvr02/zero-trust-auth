const { readUsers, deleteUserById } = require('../utils/users');
const { info, warn } = require('../utils/logger');

const getMe = (req, res) => {
  res.json(req.user);
};

const getAllUsers = (req, res) => {
  const users = readUsers().map(u => ({ id: u.id, email: u.email, role: u.role }));
  res.json(users);
};

const deleteUser = (req, res) => {
  const id = req.params.id;

  if (Number(id) === Number(req.user.id)) {
    warn('User deletion blocked: attempt to delete self', { by: req.user.email, id });
    return res.status(400).json({ message: 'Cannot delete yourself' });
  }

  const ok = deleteUserById(id);
  if (!ok) {
    warn('User deletion failed: user not found', { by: req.user.email, id });
    return res.status(404).json({ message: 'User not found' });
  }

  info('User deleted', { by: req.user.email, id });
  res.json({ message: 'User deleted' });
};

module.exports = { getMe, getAllUsers, deleteUser };
