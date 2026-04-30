import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { db } from './db/database.js'
import { initDb } from './db/schema.js'
import contactRouter from './routes/contact.js'
import downloadRouter from './routes/download.js'
import emailSignupRouter from './routes/emailSignup.js'
import youtubeRouter from './routes/youtube.js'

const app = express()

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Referrer-Policy', 'no-referrer')
  next()
})
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || 'http://localhost:5173' }))
app.use(express.json({ limit: '10kb' }))

initDb(db)

app.use('/api/contact', contactRouter)
app.use('/api/youtube', youtubeRouter)
app.use('/api/download', downloadRouter)
app.use('/api/email-signup', emailSignupRouter)

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`[backend] listening on ${port}`)
})
