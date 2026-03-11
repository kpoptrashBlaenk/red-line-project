import dotenv from 'dotenv'
import app, { pool } from './app'

dotenv.config()

const PORT = process.env.PORT || 3000

pool
  .connect()
  .then(() => {
    console.log('Connected to database')
  })
  .catch((error: Error) => {
    console.error('Error connecting to database', error)
  })

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
