const express = require('express');
const router = express.Router();
const db = require('../db/database');
const verifyToken = require('../middleware/auth');

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

// POST a new bookmark — requires valid token; owner is always the logged-in user
router.post('/', verifyToken, (req, res) => {
  try {
    const { type, post_id, saved_username } = req.body;
    const user = req.user.username;
    if (!type) return res.status(400).json({ error: 'type is required' });

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

// DELETE a bookmark — requires valid token + ownership
router.delete('/:id', verifyToken, (req, res) => {
  try {
    const bookmark = db.prepare('SELECT * FROM bookmarks WHERE id = ?').get(req.params.id);
    if (!bookmark) return res.status(404).json({ error: 'Bookmark not found' });
    if (bookmark.user !== req.user.username) return res.status(403).json({ error: 'You can only delete your own bookmarks.' });
    db.prepare('DELETE FROM bookmarks WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;