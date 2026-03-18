import cors from 'cors'
import express from 'express'
import pool from './database/database'
import promotionRouter from './routes/promotion.route'
import stripeRouter from './routes/stripe.route'
import paypalRouter from './routes/paypal.route'
import paymentRouter from './routes/payment.route'
import { authenticateApiKey, validatePaymentRequest, sanitizePaymentData, rateLimitMiddleware } from './middleware/auth.middleware'

export { pool }

const app = express()

app.use(cors())
app.use(express.json())

// Apply security middleware to payment routes
app.use('/api/payments', rateLimitMiddleware)
app.use('/api/payments', authenticateApiKey)
app.use('/api/payments', sanitizePaymentData)
app.use('/api/payments', validatePaymentRequest)

app.use('/api', promotionRouter)
app.use('/api/stripe', stripeRouter)
app.use('/api/paypal', paypalRouter)
app.use('/api/payments', paymentRouter)

export default app
