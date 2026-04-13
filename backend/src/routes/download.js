import { Router } from 'express'
import { db } from '../db/database.js'
import { validateBody } from '../middleware/validate.js'
import { sendDownloadNotification } from '../services/mailer.js'

const router = Router()

router.post(
  '/',
  validateBody({
    name: { required: true },
    email: { required: true, email: true },
    agreed: { required: true },
  }),
  async (req, res) => {
    const { name, email, filename, agreed } = req.body
    const stmt = db.prepare(`
      INSERT INTO download_submissions(name, email, filename, agreed)
      VALUES (?, ?, ?, ?)
    `)
    stmt.run(name, email, filename || '', agreed ? 1 : 0)
    await sendDownloadNotification(req.body)
    return res.json({ success: true })
  },
)

export default router
