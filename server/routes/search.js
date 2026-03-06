const express = require('express');
const router = express.Router();
const db = require('../db/database');

// POST search
router.post('/', (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'Query is required' });

    const results = db.prepare(`
      SELECT p.*, COUNT(r.id) as reply_count
      FROM posts p
      LEFT JOIN replies r ON r.post_id = p.id
      WHERE p.question LIKE ? OR p.tag LIKE ? OR p.user LIKE ?
      GROUP BY p.id
      ORDER BY p.created_at DESC
      LIMIT 10
    `).all(`%${query}%`, `%${query}%`, `%${query}%`);

    res.json({ results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;