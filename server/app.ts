import cors from 'cors'
import express from 'express'
import pool from './database/database'
import categoryRouter from './routes/category.route'
import characteristicRouter from './routes/characteristic.route'
import homeTextRouter from './routes/homeText.route'
import promotionRouter from './routes/promotion.route'
import errorHandler from './middleware/errorHandler'
import healthCheck from './middleware/healthCheck'
import logger from './middleware/logger'

export { pool }

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)
app.use('/uploads', express.static('uploads'))

app.get('/health', healthCheck)

app.use('/api', promotionRouter)
app.use('/api', homeTextRouter)
app.use('/api', categoryRouter)
app.use('/api', characteristicRouter)

app.use(errorHandler)

export default app
