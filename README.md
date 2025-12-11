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

---

```md
🌐 Frontend Description

Frontend Responsibilities

- Sends login and registration requests  
- Stores **JWT token**, **role**, **id**, **expiration** in `localStorage`  
- Protects pages using `checkAuth()`  
- Verifies token expiration and logs user out automatically  
- Displays dynamic UI messages  
- Renders admin-only user table  
- Allows deleting users (admin role only)  
- Loads personal account information  

---

📌 Key Frontend Files

| File | Purpose |
|------|---------|
| `index.html` | Landing page |
| `login.html` | Login form |
| `register.html` | User registration page |
| `protected.html` | Protected page with admin dashboard |
| `account.html` | User account page |
| `js/api.js` | API helper for GET/POST requests |
| `js/auth.js` | Handles login and registration |
| `js/guard.js` | Verifies token & handles auto-logout |
| `js/ui.js` | Displays messages and UI alerts |
| `css/style.css` | Main styling |

---

📡 API Endpoints

Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **POST** | `/api/auth/register` | Register a new user |
| **POST** | `/api/auth/login` | Login user and receive JWT |

---

User Endpoints

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| **GET** | `/api/users/me` | user/admin | Get current user data |
| **GET** | `/api/users/all` | admin | Get list of users |
| **DELETE** | `/api/users/:id` | admin | Delete user by ID |

---

🔄 Data Flow (How It Works)

 1️⃣ Registration & Login Process

1. User enters credentials  
2. Frontend sends request to backend  
3. Backend hashes password using bcryptjs  
4. Backend generates JWT token  
5. Token + role + id + expiration are saved in `localStorage`  
6. User is redirected to protected page  

---

 2️⃣ Protected Page Workflow

- `checkAuth()` validates token  
- If token expired → auto logout  
- Backend validates JWT via middleware  
- Admin-only endpoints check user role  
- Unauthorized requests are blocked  

---

 ⚙️ Environment Variables (`.env`)


 🗂️ User Format (`users.json`)

```json
{
  "id": 1,
  "email": "admin@example.com",
  "password_hash": "$2b$10$...",
  "role": "admin"
}

---


