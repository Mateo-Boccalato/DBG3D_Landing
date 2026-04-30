import { Router } from 'express'
import { db } from '../db/database.js'
import { validateBody } from '../middleware/validate.js'
import { sendEmailSignupNotification } from '../services/mailer.js'

const router = Router()
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000
const RATE_LIMIT_MAX = 5
const ALLOWED_SOURCES = new Set(['intent-popup'])
const attempts = new Map()

function rateLimitSignup(req, res, next) {
  const key = req.ip || req.socket?.remoteAddress || 'unknown'
  const now = Date.now()
  const entry = attempts.get(key) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS }

  if (entry.resetAt <= now) {
    entry.count = 0
    entry.resetAt = now + RATE_LIMIT_WINDOW_MS
  }

  entry.count += 1
  attempts.set(key, entry)

  if (entry.count > RATE_LIMIT_MAX) {
    return res.status(429).json({ errors: { email: 'Too many signup attempts. Please try again later.' } })
  }

  return next()
}

function normalizeSource(source) {
  if (typeof source !== 'string') return ''
  const trimmed = source.trim()
  return ALLOWED_SOURCES.has(trimmed) ? trimmed : ''
}

router.post(
  '/',
  rateLimitSignup,
  validateBody({
    email: { required: true, email: true },
  }),
  async (req, res) => {
    const email = String(req.body.email).trim().toLowerCase()
    const source = normalizeSource(req.body.source)

    try {
      const stmt = db.prepare(`
        INSERT OR IGNORE INTO email_signups(email, source)
        VALUES (?, ?)
      `)
      const result = stmt.run(email, source)
      if (result.changes > 0) await sendEmailSignupNotification({ email, source })
      return res.json({ success: true })
    } catch (err) {
      console.warn('[email-signup] Failed to save signup:', err?.message || err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  },
)

export default router
