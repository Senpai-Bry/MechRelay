const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Milestone badges computed from real post count.
// Add more tiers here later as the reputation system grows.
function computeBadges(postCount) {
  const badges = [];
  if (postCount >= 1)  badges.push({ id: 'first-post',   name: 'First Post',   tier: 'bronze' });
  if (postCount >= 5)  badges.push({ id: 'active-tech',  name: 'Active Tech',  tier: 'silver' });
  if (postCount >= 10) badges.push({ id: 'wrench-master', name: 'Wrench Master', tier: 'gold' });
  return badges;
}

// GET public profile data for a mechanic — real data only, no mocks.
router.get('/:username', (req, res) => {
  try {
    const user = db.prepare(
      'SELECT username, created_at FROM users WHERE username = ?'
    ).get(req.params.username);

    if (!user) return res.status(404).json({ error: 'User not found' });

    const { count: postCount } = db.prepare(
      'SELECT COUNT(*) as count FROM posts WHERE user = ?'
    ).get(req.params.username);

    res.json({
      username: user.username,
      memberSince: user.created_at,
      postCount,
      badges: computeBadges(postCount),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;