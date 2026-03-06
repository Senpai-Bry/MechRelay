const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');

const SECRET = process.env.JWT_SECRET || 'mechrelay-secret';

// REGISTER
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: 'All fields are required.' });
  if (password.length < 6)
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });

  const hashed = bcrypt.hashSync(password, 10);
  try {
    const result = db.prepare(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)'
    ).run(username, email, hashed);
    const token = jwt.sign({ id: result.lastInsertRowid, username }, SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, username });
  } catch (err) {
    if (err.message.includes('UNIQUE'))
      return res.status(400).json({ error: 'Username or email already taken.' });
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error:'All fields are required.' });

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return res.status(400).json({ error: 'Invalid email or password.' });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid email or password.' });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '7d' });
  res.json({ token, username: user.username });
});

module.exports = router;