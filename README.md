Zero Trust Project
Zero Trust Authentication System — Project Documentation
📌 Overview

This project demonstrates a lightweight Zero Trust Authentication Model using a Node.js backend (Express, JWT, bcryptjs) and a static HTML/CSS/JavaScript frontend.

It follows the core Zero Trust principles:

🔒 Never trust, always verify

🟦 Least-Privilege Access

🧩 Role-Based Access Control (RBAC)

⏳ Session expiration (10–15 minutes)

🛡️ Protected API routes

📄 Logging user actions

The system includes:

Login

Registration

Protected pages

Account page

Admin-only functionality (view & delete users)

📁 Project Structure
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

🖥️ Backend Description (Node.js / Express)
Backend Responsibilities

User registration

Login with password validation

Password hashing using bcryptjs

JWT token generation and validation

RBAC (admin/user)

Protected API routes

Listing users (admin only)

Deleting users (admin only)

Logging actions (info/warn/error)

Storing users in users.json

📌 Key Backend Files
File	Purpose
server.js	Main backend entry point
controllers/authController.js	Login & registration logic
controllers/userController.js	User info, list, delete
middleware/authMiddleware.js	JWT validation & RBAC guard
utils/users.js	User storage (read/write users.json)
utils/logger.js	Logging system
utils/generateToken.js	JWT token generator
🗂️ User Format (users.json)
{
  "id": 1,
  "email": "admin@example.com",
  "password_hash": "$2b$10$...",
  "role": "admin"
}

🌐 Frontend Description
Frontend Responsibilities

Sends login/registration requests to backend

Stores token, id, role, and exp in localStorage

Protects pages with checkAuth()

Admin-only user table rendering

Delete user buttons (admin)

UI message system (showMessage)

Session auto-expiration

📌 Key Frontend Files
File	Purpose
index.html	Landing page
login.html	Login page
register.html	Registration page
protected.html	Admin/User protected page
account.html	User profile page
js/api.js	HTTP client (postData/getData)
js/auth.js	Handles login & registration
js/guard.js	Token expiration check
js/ui.js	Message display system
css/style.css	Application styling
📌 API Endpoints
🔑 Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
👤 User Routes
Method	Endpoint	Role	Description
GET	/api/users/me	user/admin	Get current user
GET	/api/users/all	admin	Get all users
DELETE	/api/users/:id	admin	Delete user
🔄 Data Flow (How It Works)
1. Registration / Login

User enters data on frontend

Frontend sends API request

Backend validates input

Backend hashes password (registration)

Backend generates JWT token

Frontend stores token + role + id + expiration

User is redirected to protected page

2. Protected Routes Workflow

Browser requests protected page

checkAuth() verifies session expiration

Backend verifies JWT via middleware

For admin endpoints → RBAC check

If token invalid or expired → logout

⚙️ Environment Variables (.env)
PORT=4000
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=15m

🚀 Running the Project
1. Install Dependencies
cd backend
npm install

2. Start Backend
npm run dev

3. Open Frontend
http://localhost:4000

🛡️ Zero Trust Features Implemented
Feature	Status
Least Privilege	✔
Role-Based Access Control	✔
JWT Authorization	✔
Session Timeout	✔
No Implicit Trust	✔
Logging	✔
