const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) return res.status(400).json({ error: 'Question is required' });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 512,
        system: 'You are a professional automotive mechanic assistant. Give clear, practical diagnostic answers in 3-5 numbered steps. Be concise and shop-floor friendly.',
        messages: [
          {
            role: 'user',
            content: `A mechanic posted this question: "${question}". Provide a practical diagnostic answer.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Anthropic API error:', err);
      return res.status(500).json({ error: err?.error?.message || 'AI request failed' });
    }

    const data = await response.json();
    const answer = data?.content?.[0]?.text || 'No answer available.';
    res.json({ answer });
  } catch (err) {
    console.error('AI route error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;