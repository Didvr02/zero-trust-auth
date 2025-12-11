# Zero Trust Project

## Zero Trust Authentication System — Project Documentation

---

## 📌 Overview

This project demonstrates a lightweight **Zero Trust Authentication Model** using a Node.js backend (Express, JWT, bcryptjs) and a static HTML/CSS/JavaScript frontend.

It follows the core Zero Trust principles:

- 🔒 **Never trust, always verify**  
- 🟦 **Least-Privilege Access**  
- 🧩 **Role-Based Access Control (RBAC)**  
- ⏳ **Session expiration (10–15 minutes)**  
- 🛡️ **Protected API routes**  
- 📄 **Logging user actions**

---

## 📁 Project Structure

/backend
controllers/
middleware/
routes/
utils/
users.json
server.js

/frontend
index.html
login.html
register.html
protected.html
account.html
css/style.css


---

## 🖥️ Backend Description (Node.js / Express)

### Backend Responsibilities

- User registration and login  
- Password hashing using **bcryptjs**  
- JWT token generation and verification  
- RBAC (admin/user)  
- Protected routes  
- Listing users (admin only)  
- Deleting users (admin only)  
- Logging actions  
- Storing users in `users.json`  

---

## 📌 Key Backend Files

| File | Purpose |
|------|---------|
| `server.js` | Main backend entry point |
| `controllers/authController.js` | Login & registration logic |
| `controllers/userController.js` | User info, list, delete |
| `middleware/authMiddleware.js` | JWT validation & RBAC guard |
| `utils/users.js` | User storage (read/write users.json) |
| `utils/logger.js` | Logging system |
| `utils/generateToken.js` | JWT token generator |

---

## 🗂️ User Format (`users.json`)

```json
{
  "id": 1,
  "email": "admin@example.com",
  "password_hash": "$2b$10$...",
  "role": "admin"
}

---

## 🌐 Frontend Description
Frontend Responsibilities

Sends login/registration requests

Stores token, id, role, and exp in localStorage

Protects pages with checkAuth()

Admin-only user table rendering

Delete user buttons (admin only)

UI message system (showMessage)

Session auto-expiration
js/*.js

