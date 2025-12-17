import cors from 'cors';
import express, { type Request, type Response } from 'express';
import pool from './database/database';
import categoryRouter from './router/category.route';
import promotionalRouter from './router/promotional.route';
// import { Promotion, PromotionBody } from '$/types';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', promotionalRouter);
app.use('/api', categoryRouter);

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

// app.get('/', (req: Request, res: Response) => {
//   res.json({ anwser: 'Hello from Express!' });

//   const body =  req.body as PromotionBody;

//   console.log(body);

//   let promotionToReturn: Promotion

//   return promotionToReturn
// })

pool.connect()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Error connecting to database', err);
  });

export default app;
