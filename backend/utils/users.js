const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFile = path.join(__dirname, '..', 'users.json');

const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFile, 'utf-8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

const writeUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

const findUserByEmail = (email) => {
  const users = readUsers();
  return users.find(u => u.email === email);
};

const addUser = async (email, password, role = 'user') => {
  const users = readUsers();
  const id = users.length ? users[users.length - 1].id + 1 : 1;

  const password_hash = await bcrypt.hash(password, 10);

  const newUser = { id, email, password_hash, role };
  users.push(newUser);
  writeUsers(users);
  return newUser;
};

const deleteUserById = (id) => {
  const users = readUsers();
  const idx = users.findIndex(u => u.id === Number(id));
  if (idx === -1) return false;
  users.splice(idx, 1);
  writeUsers(users);
  return true;
};

module.exports = { readUsers, writeUsers, findUserByEmail, addUser, deleteUserById };
