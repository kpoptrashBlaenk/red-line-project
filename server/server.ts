import cors from 'cors'
import dotenv from 'dotenv'
import express, { type Request, type Response } from 'express'
import pool from './database/database.ts'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.json({ answer: 'Hello from Express!' })
})

pool.connect()
  .then(() => {
    console.log('Connected to database')
  })
  .catch(err => {
    console.error('Error connecting to database', err)
  })

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
