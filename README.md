# FUTURE_FS_02 — Client Lead Management System (Mini CRM)

> Task 2 | Future Interns | Full Stack Web Development Track

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens)

---

## 📋 Overview

**LeadFlow CRM** is a full-stack Client Lead Management System built for the Future Interns Task 2. It allows admins to manage leads from website contact forms — tracking their status, adding notes, setting follow-ups, and monitoring pipeline value through a clean dashboard.

---

## ✨ Features

### 🔐 Authentication
- Secure JWT-based login & registration
- Protected API routes
- Token stored in localStorage
- 7-day session expiry

### 📊 Dashboard
- Live stats — Total, New, Contacted, Converted, Lost
- Animated conversion rate donut chart
- Leads by source bar chart
- Total pipeline value display

### 👥 Lead Management (Full CRUD)
- Add leads with name, email, phone, company, source, status, priority, deal value, follow-up date
- View all leads in a sortable, filterable table
- Search by name, email, or company
- Filter by status and priority
- Click any lead to open the detail panel

### 🔄 Status Pipeline
- `New → Contacted → Qualified → Converted → Lost`
- One-click status updates from the lead detail panel
- Visual color-coded status badges

### 📝 Notes & Follow-ups
- Add timestamped notes to any lead
- Delete individual notes
- Notes stored in MongoDB as embedded documents

### 🔒 Security
- Passwords hashed with bcryptjs
- JWT auth on all lead routes
- Input validation on backend

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, CSS-in-JS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose ODM |
| Auth | JWT, bcryptjs |
| API | RESTful JSON API |

---

## 📁 Project Structure

```
FUTURE_FS_02/
├── backend/
│   ├── models/
│   │   ├── Lead.js          # Lead schema (with embedded notes)
│   │   └── User.js          # Admin user schema
│   ├── routes/
│   │   ├── leads.js         # CRUD + notes API
│   │   └── auth.js          # Login/register/me
│   ├── middleware/
│   │   └── auth.js          # JWT protect middleware
│   ├── server.js            # Express app entry point
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── LoginPage.jsx   # Auth screen
    │   │   ├── Sidebar.jsx     # Navigation + pipeline stats
    │   │   ├── Dashboard.jsx   # Stats overview
    │   │   ├── LeadsList.jsx   # Table + filters + detail panel
    │   │   └── LeadForm.jsx    # Add/edit lead form
    │   ├── context/
    │   │   └── AuthContext.jsx # Global auth state
    │   ├── api.js             # Fetch wrapper for all API calls
    │   ├── App.jsx            # Root component + routing
    │   ├── main.jsx           # React entry point
    │   └── index.css          # Global styles + animations
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas (free cloud)

### 1. Clone the repo
```bash
git clone https://github.com/AstitvaAnand06/FUTURE_FS_02.git
cd -FUTURE_FS_02
```

### 2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

### 4. Open the app
```
Frontend: http://localhost:3000
Backend:  http://localhost:5001
```

Register an admin account on first launch, then start adding leads!

---

## 🔌 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create admin account |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/leads` | Get all leads (filterable) |
| GET | `/api/leads/stats` | Dashboard stats |
| GET | `/api/leads/:id` | Single lead |
| POST | `/api/leads` | Create lead |
| PUT | `/api/leads/:id` | Update lead |
| DELETE | `/api/leads/:id` | Delete lead |
| POST | `/api/leads/:id/notes` | Add note |
| DELETE | `/api/leads/:id/notes/:noteId` | Delete note |

---

## 🌐 Deployment

### Backend — Render
1. Create a new Web Service on [render.com](https://render.com)
2. Connect your GitHub repo, set root to `backend/`
3. Add environment variables from `.env`
4. Deploy!

### Frontend — Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Set root to `frontend/`
3. Add `VITE_API_URL=https://your-backend.onrender.com/api`
4. Deploy!

---

© 2026 **Astitva Anand** — Future Interns Full Stack Internship
