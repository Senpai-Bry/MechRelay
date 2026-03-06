const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET all posts
router.get('/', (req, res) => {
  try {
    const posts = db.prepare(`
      SELECT p.*, COUNT(r.id) as reply_count
      FROM posts p
      LEFT JOIN replies r ON r.post_id = p.id
      GROUP BY p.id
      ORDER BY p.created_at DESC
    `).all();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single post with replies
router.get('/:id', (req, res) => {
  try {
    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    const replies = db.prepare('SELECT * FROM replies WHERE post_id = ? ORDER BY created_at ASC').all(req.params.id);
    res.json({ ...post, replies });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new post
router.post('/', (req, res) => {
  try {
    const { user, question, tag } = req.body;
    if (!user || !question) return res.status(400).json({ error: 'User and question are required' });
    const time = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const result = db.prepare(
      'INSERT INTO posts (user, question, tag, time) VALUES (?, ?, ?, ?)'
    ).run(user, question, tag || 'General', time);
    const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ ...post, replies: [], reply_count: 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST reply to a post
router.post('/:id/replies', (req, res) => {
  try {
    const { user, text } = req.body;
    if (!user || !text) return res.status(400).json({ error: 'User and text are required' });
    const time = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const result = db.prepare(
      'INSERT INTO replies (post_id, user, text, time) VALUES (?, ?, ?, ?)'
    ).run(req.params.id, user, text, time);
    const reply = db.prepare('SELECT * FROM replies WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;