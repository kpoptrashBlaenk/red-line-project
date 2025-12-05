import cors from 'cors'
import dotenv from 'dotenv'
import express, { type Request, type Response } from 'express'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Moddleware
app.use(cors())
app.use(express.json())

// Example API
app.get('/', (req: Request, res: Response) => {
  res.json({ answer: 'Hello from Express!' })
})

// Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
