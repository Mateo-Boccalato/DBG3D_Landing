import { Router } from 'express'
import { db } from '../db/database.js'
import { validateBody } from '../middleware/validate.js'
import { sendContactNotification } from '../services/mailer.js'

const router = Router()

router.post(
  '/',
  validateBody({
    name: { required: true },
    email: { required: true, email: true },
    details: { required: true },
  }),
  async (req, res) => {
    const { name, company, email, phone, service, color, size, details } = req.body
    const stmt = db.prepare(`
      INSERT INTO contact_submissions(name, company, email, phone, service, color, size, details)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    stmt.run(name, company || '', email, phone || '', service || '', color || '', size || '', details)
    await sendContactNotification(req.body)
    return res.json({ success: true })
  },
)

export default router
