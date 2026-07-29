const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create users table if it doesn't exist
const Database = require('better-sqlite3');
const db = new Database('./db/mechrelay.db');

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// Routes
const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);

const aiRouter = require('./routes/ai');
app.use('/api/ai-assist', aiRouter);

const searchRouter = require('./routes/search');
app.use('/api/search', searchRouter);

const uploadRouter = require('./routes/upload');
app.use('/api/upload', uploadRouter);

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const joblogRouter = require('./routes/joblog');
app.use('/api/joblog', joblogRouter);

const bookmarksRouter = require('./routes/bookmarks');
app.use('/api/bookmarks', bookmarksRouter);

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  console.log(`MechRelay server running on http://localhost:${PORT}`);
});