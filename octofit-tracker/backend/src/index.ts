import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect('mongodb://localhost:27017/octofit_db')
  .then(() => console.log('Connected to MongoDB (octofit_db)'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/api', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running', baseUrl });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log(`Base URL: ${baseUrl}`);
});
