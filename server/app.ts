import cors from 'cors'
import express, { type Request, type Response } from 'express'
import pool from './database/database'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.json({ answer: 'Hello from Express!' })
})

pool
  .connect()
  .then(() => {
    console.log('Connected to database')
  })
  .catch((err) => {
    console.error('Error connecting to database', err)
  })

export default app
