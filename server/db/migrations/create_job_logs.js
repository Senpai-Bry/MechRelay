const db = require('../database');

db.exec(`
  CREATE TABLE IF NOT EXISTS job_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user TEXT NOT NULL,
    vehicle TEXT NOT NULL,
    repair_type TEXT NOT NULL,
    notes TEXT DEFAULT '',
    status TEXT DEFAULT 'completed',
    date TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log('job_logs table created.');