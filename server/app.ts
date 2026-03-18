import cors from 'cors'
import express from 'express'
import pool from './database/database'
import { config } from './config/config'
import { logger, requestLogger } from './utils/logger'
import { ErrorMiddleware } from './middleware/error.middleware'
import { HealthService } from './utils/health'
import categoryRouter from './routes/category.route'
import characteristicRouter from './routes/characteristic.route'
import homeTextRouter from './routes/homeText.route'
import promotionRouter from './routes/promotion.route'
import authRouter from './routes/auth.route'
import paymentRouter from './routes/payment.route'
import healthRouter from './routes/health.route'

export { pool }

const app = express()

// Trust proxy for production
app.set('trust proxy', config.NODE_ENV === 'production' ? 1 : 0)

// Request logging middleware
app.use(requestLogger())

// CORS configuration
app.use(cors({
  origin: config.CORS_ORIGIN || '*',
  methods: config.CORS_METHODS.split(','),
  credentials: config.CORS_CREDENTIALS,
}))

// JSON parsing with limit
app.use(express.json({ limit: config.UPLOAD_LIMIT }))

// Static files
app.use('/uploads', express.static(config.UPLOAD_DIR))

// API routes
app.use('/api', promotionRouter)
app.use('/api', homeTextRouter)
app.use('/api', categoryRouter)
app.use('/api', characteristicRouter)
app.use('/api/auth', authRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/health', healthRouter)

// Health check endpoints (no auth required)
app.get('/health', HealthService.checkHealth)
app.get('/ready', HealthService.checkReadiness)

// 404 handler
app.use(ErrorMiddleware.notFound)

// Error handler
app.use(ErrorMiddleware.errorHandler)

// Log server start
logger.info('✅ Server initialized successfully')
logger.info(`📋 Environment: ${config.NODE_ENV}`)
logger.info(`🚀 Port: ${config.PORT}`)
logger.info('🌐 Routes loaded:')
app._router.stack.forEach((layer: any) => {
  if (layer.route) {
    logger.info(`  ${Object.keys(layer.route.methods).join(', ').toUpperCase()} ${layer.route.path}`)
  }
})

export default app
