const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET all bookmarks for a user
router.get('/:user', (req, res) => {
  try {
    const bookmarks = db.prepare(
      'SELECT * FROM bookmarks WHERE user = ? ORDER BY created_at DESC'
    ).all(req.params.user);
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new bookmark
router.post('/', (req, res) => {
  try {
    const { user, type, post_id, saved_username } = req.body;
    if (!user || !type) return res.status(400).json({ error: 'user and type are required' });

    // Prevent duplicates
    const existing = db.prepare(
      'SELECT * FROM bookmarks WHERE user = ? AND type = ? AND post_id IS ? AND saved_username IS ?'
    ).get(user, type, post_id ?? null, saved_username ?? null);
    if (existing) return res.status(200).json(existing);

    const result = db.prepare(
      'INSERT INTO bookmarks (user, type, post_id, saved_username) VALUES (?, ?, ?, ?)'
    ).run(user, type, post_id ?? null, saved_username ?? null);
    const bookmark = db.prepare('SELECT * FROM bookmarks WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a bookmark
router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM bookmarks WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;