import cors from 'cors';
import express, { type Request, type Response } from 'express';
import pool from './database/database';
import promotionalRouter from './router/promotional.route';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', promotionalRouter);

app.get('/', (req: Request, res: Response) => {
  res.json({ answer: 'Hello from Express!' });
});

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ now: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

pool.connect()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Error connecting to database', err);
  });

export default app;
