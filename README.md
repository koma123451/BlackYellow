🛍️ BlackYellow — Full-Stack E-Commerce App
A modern full-stack e-commerce application built with React, Node.js, MongoDB, and JWT authentication.
Users can register, log in, browse products, add items to cart, and manage their shopping session securely.

🔗 Live Demo: (部署后填)
📦 Backend Repo: (可选)
🎨 Frontend Repo: (可选，或者写 Monorepo)
🚀 Features
Functions status
User Registration & Login ✅
JWT Auth with HttpOnly Cookies ✅
Protected Routes ✅
CRUD Product Management ✅
Shopping Cart with Persistent State ✅
Logout & Session Handling ✅
Responsive UI (Chakra UI) ✅

---

🧠 Tech Stack
Frontend

React + Vite

Zustand (Global State)

React Router

Chakra UI

Backend

Node.js / Express

MongoDB + Mongoose

JWT Authentication (HttpOnly Cookies)

## REST API Architecture

🔐 Authentication Flow
flowchart TD
A[User submits login form] --> B[Backend validates credentials]
B --> C[Create JWT]
C --> D[Send HttpOnly Cookie]
D --> E[Frontend stores user in global state]
E --> F[Protected pages unlocked]

---

📄 API Endpoints
Method Endpoint Description Auth Required
POST /api/auth/register Create new account ❌
POST /api/auth/login Login + return token cookie ❌
POST /api/auth/logout Clear session cookie ✔
GET /api/auth Get current user from token ✔
GET /api/products Fetch all products ❌
POST /api/products Create product ✔ (admin optional)
GET /api/cart Get user's cart ✔
POST /api/cart/:id Add item ✔
DELETE /api/cart/:id Remove item ✔

---

🛠️ Installation & Setup
1️⃣ Clone repo
git clone https://github.com/<your-name>/blackyellow.git
cd blackyellow
2️⃣ Install dependencies
npm install
3️⃣ Create .env
MONGO_URI=your_connection_string
JWT_SECRET=your_random_secret_key
NODE_ENV=development
4️⃣ Run backend
cd backend
npm run dev
5️⃣ Run frontend
cd frontend
npm run dev

---

📸 Screenshots

---

🧩 Future Improvements

Admin dashboard

Product search + filters

Stripe payments

## Favorites / Wishlist

👤 Author

Bowen Dai
📍 Toronto, Canada
💼 Seeking Junior Full-Stack / Frontend roles
