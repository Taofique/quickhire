# QuickHire 🚀

A modern full-stack job board where companies can post listings and job seekers can discover opportunities and apply — all in one place.

---

## Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS v4
- Zustand (state management)
- React Router v6
- Fonts: Clash Display + Epilogue

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- REST API

---

## Features

- 🔍 **Browse & filter jobs** by title, location, and category
- 📄 **Job detail page** with full description, requirements, and salary
- ✅ **Apply directly** with name, email, resume URL, and cover note
- 🛠️ **Admin dashboard** to post and delete job listings
- 📋 **View applications** per job — search by dropdown or Job ID
- 📱 **Fully responsive** across desktop, tablet, and mobile
- 📬 **Newsletter subscription** in the footer

---

## Project Structure

```
quickhire/
├── backend/
│   ├── models/
│   │   ├── job.model.js
│   │   └── application.model.js
│   ├── controllers/
│   │   ├── jobs.controller.js
│   │   └── applications.controller.js
│   ├── routes/
│   │   ├── jobs.route.js
│   │   └── applications.route.js
│   └── server.js
│
└── frontend/
    └── src/
        ├── components/
        │   ├── Navbar.jsx
        │   ├── HeroSection.jsx
        │   ├── CompaniesSection.jsx
        │   ├── CategorySection.jsx
        │   ├── FeaturedJobsSection.jsx
        │   ├── StartPostingSection.jsx
        │   └── Footer.jsx
        ├── pages/
        │   ├── HomePage.jsx
        │   ├── JobListingsPage.jsx
        │   ├── JobDetailPage.jsx
        │   └── AdminPage.jsx
        └── store/
            └── jobStore.js
```

---

## API Endpoints

### Jobs
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/jobs` | Get all job listings |
| `POST` | `/api/jobs` | Create a new job |
| `DELETE` | `/api/jobs/:id` | Delete a job |

### Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/applications` | Submit an application |
| `GET` | `/api/applications/:job_id` | Get applications for a job |

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the repo

```bash
git clone https://github.com/Taofique/quickhire.git
cd quickhire
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and proxies `/api` requests to `http://localhost:5000`.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Backend server port (default: 5000) |
| `MONGO_URI` | MongoDB connection string |

---

## Deployment

This project is deployed on **Render**.

- Backend: deployed as a Web Service
- Frontend: deployed as a Static Site with the Vite build output (`dist/`)

Set environment variables in the Render dashboard before deploying.

---

## License

MIT
