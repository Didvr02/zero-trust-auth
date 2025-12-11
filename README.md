# Zero trust project
Zero Trust Authentication System — Project Documentation
Overview

This project demonstrates a lightweight Zero Trust Authentication Model using a Node.js backend (Express, JWT, bcryptjs) and a static HTML/CSS/JavaScript frontend.
It follows the Zero Trust principles:

Never trust, always verify

Least-Privilege Access

Role-Based Access Control (RBAC)

Session expiration (10–15 minutes)

Protected API routes

Logging user actions

The system includes login, registration, protected pages, admin-only functionality, and session management.

Project Structure
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
  js/*.js

📌 Backend Description (Node.js / Express)
Backend Responsibilities

User registration and login

Password hashing with bcryptjs

JWT token generation and verification

Role-based authorization (admin / user)

Protected routes

User listing and deletion (admin)

Logging events into app.log

Reading/writing users from users.json

Key Backend Files
File	Purpose
server.js	Entry point for backend
authController.js	Registration & login logic
userController.js	User info, list, delete
authMiddleware.js	JWT validation & RBAC
users.js	User storage logic
logger.js	Logging system
generateToken.js	JWT generator
User Format (users.json)
{
  "id": 1,
  "email": "admin@example.com",
  "password_hash": "$2b$10$...",
  "role": "admin"
}

📌 Frontend Description
Frontend Responsibilities

Sends login/registration requests

Stores JWT, id, role, exp in localStorage

Page protection via checkAuth()

Admin user management table

UI messaging system

Protected routes & session timeout

Key Frontend Files
File	Purpose
index.html	Landing page
login.html	Login form
register.html	Registration page
protected.html	Admin/user protected page
account.html	Profile page
api.js	API client (postData/getData)
auth.js	Login/register logic
guard.js	Auth checking
ui.js	UI message system
style.css	Visual design
📌 API Endpoints
Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
User Routes
Method	Endpoint	Role	Description
GET	/api/users/me	user/admin	Get logged user data
GET	/api/users/all	admin	Get all users
DELETE	/api/users/:id	admin	Delete user
📌 Data Flow
Registration/Login

User submits form

Frontend sends request

Backend validates input, hashes password, generates JWT

Frontend saves token + metadata

Protected pages require valid token

Protected Routes

Backend validates token with middleware

Admin-only endpoints require admin role

Expired tokens force logout

📌 Environment Variables (.env)
PORT=4000
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=15m

📌 Running the Project
Install dependencies
cd backend
npm install

Start backend
npm run dev

Open frontend
http://localhost:4000

📌 Zero Trust Features Implemented

✔ Least Privilege

✔ Role-Based Access Control

✔ JWT Authorization

✔ Session Timeout

✔ No Implicit Trust

✔ Logging

📌 Screenshots

Place screenshots inside:

/docs/screenshots/


Then include in README like:

![Login Page](docs/screenshots/login.png)
![Protected Page](docs/screenshots/protected.png)
