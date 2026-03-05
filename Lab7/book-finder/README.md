# BookShelf — Online Book Finder

A full-stack book search & query system using **Node.js**, **Express**, and **MongoDB**.

---

## 📁 File Structure

```
book-finder-app/
│
├── client/
│   └── index.html              # Single-page frontend (HTML + CSS + JS)
│
└── server/
    ├── server.js               # Express entry point + MongoDB connection
    ├── seed.js                 # Script to insert 26 sample books
    ├── package.json            # Dependencies
    ├── .env                    # MONGO_URI, DB_NAME, PORT
    └── routes/
        └── books.js            # All query route handlers
```

---

## 🚀 Quick Start

```bash
cd server
npm install

# Seed sample data (run ONCE)
npm run seed

# Start server
npm start
```

Open: **http://localhost:4000**

---

## 📡 API Endpoints

| Method | Endpoint                   | Module              | MongoDB Query                              |
|--------|----------------------------|---------------------|--------------------------------------------|
| GET    | /books?page=2              | Pagination          | `.skip(6).limit(6)`                        |
| GET    | /books/search?title=mongo  | Search by Title     | `{title:{$regex:"mongo",$options:"i"}}`    |
| GET    | /books/category/programming| Filter by Category  | `{category:"Programming"}`                 |
| GET    | /books/sort/price          | Sort by Price       | `.sort({price:1})`                         |
| GET    | /books/sort/rating         | Sort by Rating      | `.sort({rating:-1})`                       |
| GET    | /books/top                 | Top Rated           | `{rating:{$gte:4}}.limit(5)`              |
| GET    | /books/categories          | List Categories     | `.distinct("category")`                    |

---

## 🗄️ MongoDB Document Schema

```json
{
  "_id": "ObjectId",
  "title": "JavaScript Essentials",
  "author": "John Smith",
  "category": "Programming",
  "price": 450,
  "rating": 4.5,
  "year": 2023
}
```

Collection: `books` | Database: `book_finder_db`

---

## ✨ Features
- ✅ Title search with regex (case-insensitive)
- ✅ Filter by category (dynamic chips)
- ✅ Sort by price (ascending) or rating (descending)
- ✅ Top 5 rated books strip (rating ≥ 4.0)
- ✅ Pagination (6 books per page)
- ✅ Live search with debounce
- ✅ 26 pre-seeded books across 7 categories
- ✅ Warm editorial monochromatic UI (Playfair Display + Inconsolata)
