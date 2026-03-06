const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// POST upload photo
router.post('/', (req, res) => {
  try {
    // Create uploads folder if it doesn't exist
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    res.json({ message: 'Upload received' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;