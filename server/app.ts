import cors from 'cors'
import express from 'express'
import pool from './database/database'
import categoryRouter from './routes/category.route'
import homeTextRouter from './routes/homeText.route'
import promotionRouter from './routes/promotion.route'

export { pool }

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/api', promotionRouter)
app.use('/api', homeTextRouter)
app.use('/api', categoryRouter)

export default app
