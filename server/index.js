const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const postsRouter = require('./routes/posts');
app.use('/api/posts', postsRouter);

const aiRouter = require('./routes/ai');
app.use('/api/ai-assist', aiRouter);

const searchRouter = require('./routes/search');
app.use('/api/search', searchRouter);

const uploadRouter = require('./routes/upload');
app.use('/api/upload', uploadRouter);

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`MechRelay server running on http://localhost:${PORT}`);
});