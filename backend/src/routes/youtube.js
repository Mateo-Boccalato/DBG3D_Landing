import { Router } from 'express'
import { db } from '../db/database.js'
import { validateBody } from '../middleware/validate.js'
import { sendYTNotification } from '../services/mailer.js'

const router = Router()

router.post(
  '/',
  validateBody({
    name: { required: true },
    email: { required: true, email: true },
    type: { required: true },
  }),
  async (req, res) => {
    const { name, email, type, episode, details } = req.body
    const stmt = db.prepare(`
      INSERT INTO youtube_submissions(name, email, type, episode, details)
      VALUES (?, ?, ?, ?, ?)
    `)
    stmt.run(name, email, type, episode || '', details || '')
    await sendYTNotification(req.body)
    return res.json({ success: true })
  },
)

export default router
