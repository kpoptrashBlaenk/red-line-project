import cors from 'cors'
import express from 'express'
import pool from './database/database'
import addressRouter from './routes/address.route'
import authRouter from './routes/auth.route'
import categoryRouter from './routes/category.route'
import characteristicRouter from './routes/characteristic.route'
import homeTextRouter from './routes/homeText.route'
import orderRouter from './routes/order.route'
import paymentRouter from './routes/payment.route'
import productRouter from './routes/product.route'
import promotionRouter from './routes/promotion.route'
import userRouter from './routes/user.route'

export { pool }

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))

app.use('/v1', promotionRouter)
app.use('/v1', homeTextRouter)
app.use('/v1', categoryRouter)
app.use('/v1', characteristicRouter)
app.use('/v1', productRouter)
app.use('/v1', authRouter)
app.use('/v1', userRouter)
app.use('/v1', addressRouter)
app.use('/v1', paymentRouter)
app.use('/v1', orderRouter)

export default app
