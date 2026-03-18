import * as dotenv from 'dotenv'
import app, { pool } from './app'
import { config } from './config/config'
import { logger } from './utils/logger'

dotenv.config()

// Database connection with retry logic
async function connectToDatabase(retries: number = 3, delay: number = 5000): Promise<void> {
  try {
    await pool.connect()
    logger.info('✅ Database connection established')
  } catch (error) {
    if (retries > 0) {
      logger.warn(`⚠️ Database connection failed, retrying in ${delay/1000}s... (${retries} attempts left)`)
      await new Promise(resolve => setTimeout(resolve, delay))
      await connectToDatabase(retries - 1, delay * 2)
    } else {
      logger.error('❌ Failed to connect to database after multiple attempts')
      process.exit(1)
    }
  }
}

// Graceful shutdown
function gracefulShutdown(signal: string) {
  logger.info(`🛑 Received ${signal}, shutting down gracefully...`)
  
  // Close server
  server.close(() => {
    logger.info('👋 HTTP server closed')
    
    // Close database connection
    pool.end().then(() => {
      logger.info('🔌 Database connection closed')
      process.exit(0)
    }).catch(err => {
      logger.error('❌ Error closing database connection:', err)
      process.exit(1)
    })
  })
  
  // Force shutdown after timeout
  setTimeout(() => {
    logger.error('⏰ Shutdown timeout reached, forcing exit')
    process.exit(1)
  }, 30000)
}

// Start server
const server = app.listen(config.PORT, async () => {
  try {
    // Connect to database
    await connectToDatabase()
    
    logger.info(`🚀 Server running on http://localhost:${config.PORT}`)
    logger.info(`🌐 Environment: ${config.NODE_ENV}`)
    logger.info('📡 Press Ctrl+C to stop the server')
    
    // Set up graceful shutdown
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
    process.on('SIGINT', () => gracefulShutdown('SIGINT'))
    
    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      logger.error('❌ Uncaught Exception:', error)
      gracefulShutdown('uncaughtException')
    })
    
    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason) => {
      logger.error('❌ Unhandled Rejection:', reason)
    })
    
  } catch (error) {
    logger.error('❌ Failed to start server:', error)
    process.exit(1)
  }
})

export { server }
