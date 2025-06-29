# LoopAI Financial Analytics Dashboard

A full-stack financial analytics dashboard for managing and visualizing transactions, built with modern web technologies.

---

## 🚀 Project Overview

LoopAI is a financial dashboard that allows users to:
- Register and log in securely JWT authentication
- Add, view, and filter transactions
- Visualize analytics and trends
- Export filtered transactions as CSV
A full-stack financial analytics dashboard with JWT authentication, dynamic charts, paginated/filterable transaction tables, and CSV export. Built with React, Chakra UI, Node.js, Express, TypeScript, and MongoDB Atlas.


---

## 🛠️ Tech Stack

**Frontend:**
- React
- TypeScript
- Chakra UI
- Recharts

**Backend:**
- Node.js
- Express
- TypeScript
- MongoDB Atlas
- JWT Authentication

---

## 📦 Folder Structure

```
/backend
  /src
    server.ts
    /controllers
    /models
    /routes
    /middleware
    /utils
/frontend
  /src
    index.tsx
    /components
    /pages
    /services
    /hooks
    /contexts
    /styles
    /types
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd LoopAI
```

### 2. Backend Setup
```bash
cd backend
npm install
```

#### Create a `.env` file in `backend/` with:
```
MONGODB_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

#### Start the Backend
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

#### Start the Frontend
```bash
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:4000](http://localhost:4000).

---

## 🔑 Environment Variables

- **Backend:**
  - `MONGODB_URI` — Your MongoDB Atlas connection string
  - `JWT_SECRET` — Secret for JWT token signing
  - `PORT` — (optional) Port for backend server (default: 5000)

---

## 📖 API Documentation

See [`apidocumation.md`](./apidocumation.md) for all available API endpoints, request/response formats, and usage examples.

---

## 📝 Notes
- Make sure MongoDB Atlas is accessible from your IP.
- Use Postman or similar tools for API testing (see API documentation).
- For any issues, check backend and frontend logs for errors.

---

## 👤 Author
- Vivek Dabhade

---

Enjoy using LoopAI Financial Analytics Dashboard! 