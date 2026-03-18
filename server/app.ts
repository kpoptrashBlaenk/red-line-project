import cors from 'cors'
import express from 'express'
import pool from './database/database'
import promotionRouter from './routes/promotion.route'
import authRouter from './routes/auth.route'

export { pool }

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/promotion', promotionRouter)
app.use('/api/auth', authRouter)

export default app
