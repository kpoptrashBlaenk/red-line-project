import cors from 'cors'
import express from 'express'
import pool from './database/database'
import addressRouter from './routes/address.route'
import authRouter from './routes/auth.route'
import categoryRouter from './routes/category.route'
import characteristicRouter from './routes/characteristic.route'
import homeTextRouter from './routes/homeText.route'
import productRouter from './routes/product.route'
import promotionRouter from './routes/promotion.route'
import userRouter from './routes/user.route'

export { pool }

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/api', promotionRouter)
app.use('/api', homeTextRouter)
app.use('/api', categoryRouter)
app.use('/api', characteristicRouter)
app.use('/api', productRouter)
app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', addressRouter)

export default app
