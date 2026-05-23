# 🚀 Synapse

A modern collaborative workspace platform built with React, TypeScript, Node.js, Express, and MongoDB.

Synapse helps teams organize projects, manage tasks through Kanban boards, monitor analytics, collaborate with members, and streamline workflow management in a clean and responsive interface.

---

## ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Secure API Access

### 📊 Dashboard
- Workspace Overview
- Task Statistics
- Project Statistics
- Recent Activity Monitoring
- Live Workspace Insights

### 📌 Kanban Board
- Create Tasks
- Update Tasks
- Delete Tasks
- Drag & Drop Workflow
- To Do / In Progress / Completed Columns
- Workspace-specific Boards

### 📁 Project Management
- Create Projects
- View Projects
- Delete Projects
- Project Details Tracking

### 👥 Workspace Management
- Create Workspace
- Join Workspace
- Leave Workspace
- Remove Members
- Workspace Rules Management

### 📈 Analytics
- Project Analytics
- Productivity Tracking
- Task Distribution Overview

### ⚙️ Settings
- User Preferences
- Dark Mode Support
- Workspace Configuration

### 📱 Responsive Design
- Desktop Support
- Tablet Support
- Mobile Friendly Layout

---

## 🛠 Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Zustand
- React Router DOM
- Framer Motion
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.io
- Cookie Parser
- CORS

### Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas

---

## 📂 Project Structure

```bash
synapse/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── store/
│   │   ├── context/
│   │   └── styles/
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/synapse.git
cd synapse
```

---

## Backend Setup

Navigate to server:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create `.env`

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run development server:

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## Frontend Setup

Navigate to client:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## Production Build

Frontend

```bash
npm run build
```

Backend

```bash
npm run build
npm start
```

---

## Environment Variables

### Server

```env
PORT=

MONGO_URI=

JWT_SECRET=
```

### Client

```env
VITE_API_URL=
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Tasks

```http
GET    /api/tasks/:workspaceId
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
```

### Projects

```http
GET    /api/projects
POST   /api/projects
DELETE /api/projects/:id
```

### Dashboard

```http
GET /api/dashboard
```

### Workspaces

```http
GET    /api/workspaces
POST   /api/workspaces/create
POST   /api/workspaces/join
PUT    /api/workspaces/:id/leave
PUT    /api/workspaces/:id/remove-member
DELETE /api/workspaces/:id
POST   /api/workspaces/:id/rules
```

---

## Screenshots

Add screenshots here:

```md
![Dashboard](docs/dashboard.png)

![Kanban Board](docs/kanban.png)

![Projects](docs/projects.png)
```

---

## Future Improvements

- Real-time Collaboration
- Team Chat
- File Sharing
- Notifications System
- Calendar Integration
- AI Productivity Assistant
- Advanced Analytics
- Mobile Application

---

## Author

**Aniket Saxena**

GitHub:
https://github.com/anisaxena7786-saxena

---

## License

This project is licensed under the MIT License.
