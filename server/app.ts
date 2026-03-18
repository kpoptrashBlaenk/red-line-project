import cors from 'cors'
import express from 'express'
import pool from './database/database'
import categoryRouter from './routes/category.route'
import characteristicRouter from './routes/characteristic.route'
import homeTextRouter from './routes/homeText.route'
import promotionRouter from './routes/promotion.route'
import authRouter from './routes/auth.route'
import paymentRouter from './routes/payment.route'

export { pool }

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/api', promotionRouter)
app.use('/api', homeTextRouter)
app.use('/api', categoryRouter)
app.use('/api', characteristicRouter)
app.use('/api/auth', authRouter)
app.use('/api/payment', paymentRouter)

export default app
