const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET all job logs for a user
router.get('/:user', (req, res) => {
  try {
    const logs = db.prepare(
      'SELECT * FROM job_logs WHERE user = ? ORDER BY created_at DESC'
    ).all(req.params.user);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new job log entry
router.post('/', (req, res) => {
  try {
    const { user, vehicle, repair_type, notes, status, date } = req.body;
    if (!user || !vehicle || !repair_type || !date) {
      return res.status(400).json({ error: 'user, vehicle, repair_type, and date are required' });
    }
    const result = db.prepare(
      'INSERT INTO job_logs (user, vehicle, repair_type, notes, status, date) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(user, vehicle, repair_type, notes || '', status || 'completed', date);
    const entry = db.prepare('SELECT * FROM job_logs WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a job log entry
router.delete('/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM job_logs WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
