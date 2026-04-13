import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { db } from './db/database.js'
import { initDb } from './db/schema.js'
import contactRouter from './routes/contact.js'
import downloadRouter from './routes/download.js'
import youtubeRouter from './routes/youtube.js'

const app = express()

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173' }))
app.use(express.json())

initDb(db)

app.use('/api/contact', contactRouter)
app.use('/api/youtube', youtubeRouter)
app.use('/api/download', downloadRouter)

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`[backend] listening on ${port}`)
})
