import cors from 'cors'
import express from 'express'
import pool from './database/database'
import categoryRouter from './router/category.route'
import promotionalRouter from './router/promotional.route'

export { pool }

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', promotionalRouter)
app.use('/api', categoryRouter)

export default app
