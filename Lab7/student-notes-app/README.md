# NoteVault — Student Notes Manager

A full-stack CRUD web application for managing student study notes using **Node.js**, **Express**, and **MongoDB**.

---

## 📁 File Structure

```
student-notes-app/
│
├── client/                     # Frontend (static files)
│   └── index.html              # Single-page application (HTML + CSS + JS)
│
└── server/                     # Backend (Node.js + Express)
    ├── server.js               # Entry point — Express app & MongoDB connection
    ├── package.json            # Dependencies
    ├── .env                    # Environment variables (MONGO_URI, PORT)
    └── routes/
        └── notes.js            # CRUD route handlers for /notes
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or MongoDB Atlas)

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment
Edit `server/.env`:
```env
MONGO_URI=mongodb://localhost:27017
DB_NAME=student_notes_db
PORT=3000
```

### 3. Start the Server
```bash
# Production
npm start

# Development (auto-restart)
npm run dev
```

### 4. Open the App
Visit: [http://localhost:3000](http://localhost:3000)

---

## 📡 REST API Reference

| Method | Endpoint       | Description        | Body                                      |
|--------|----------------|--------------------|-------------------------------------------|
| GET    | /notes         | Fetch all notes    | —                                         |
| GET    | /notes/:id     | Fetch single note  | —                                         |
| POST   | /notes         | Create a new note  | `{ title, subject, description }`        |
| PUT    | /notes/:id     | Update a note      | `{ title?, subject?, description? }`     |
| DELETE | /notes/:id     | Delete a note      | —                                         |
| GET    | /health        | Server health check| —                                         |

### Example Requests

#### Create Note
```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"MongoDB Basics","subject":"Database","description":"Introduction to MongoDB concepts"}'
```

#### Update Note
```bash
curl -X PUT http://localhost:3000/notes/<id> \
  -H "Content-Type: application/json" \
  -d '{"title":"MongoDB Advanced","description":"Aggregation and indexing"}'
```

#### Delete Note
```bash
curl -X DELETE http://localhost:3000/notes/<id>
```

---

## 🗄️ MongoDB Document Schema

```json
{
  "_id": "ObjectId",
  "title": "MongoDB Basics",
  "subject": "Database",
  "description": "Introduction to MongoDB concepts",
  "created_date": "2026-03-05"
}
```

Collection name: `notes` | Database: `student_notes_db`

---

## ✨ Features
- ✅ Create, Read, Update, Delete (full CRUD)
- ✅ AJAX/Fetch API — no page reloads
- ✅ Live search by title or subject
- ✅ Toast notifications for all actions
- ✅ Confirmation modal before delete
- ✅ Edit modal with pre-filled fields
- ✅ Character counter on description
- ✅ Monochromatic dark UI with Syne + DM Mono fonts
