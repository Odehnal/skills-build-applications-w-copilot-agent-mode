import express from 'express';
import cors from 'cors';
import apiRoutes from './routes';
import { connectDatabase, DATABASE_NAME } from './config/database';

const app = express();
const PORT = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

connectDatabase()
  .then(() => console.log(`Connected to MongoDB (${DATABASE_NAME})`))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/api', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running', baseUrl });
});

app.use('/api', apiRoutes);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log(`Base URL: ${baseUrl}`);
});
