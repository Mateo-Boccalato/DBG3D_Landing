const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateBody(schema) {
  return (req, res, next) => {
    const errors = {}

    for (const [field, rules] of Object.entries(schema)) {
      const value = req.body?.[field]

      if (rules.required) {
        const missing =
          value === undefined ||
          value === null ||
          (typeof value === 'string' && value.trim() === '') ||
          (typeof value === 'boolean' && value === false)
        if (missing) {
          errors[field] = 'Required'
          continue
        }
      }

      if (rules.email && value && !EMAIL_RE.test(String(value))) {
        errors[field] = 'Invalid email format'
      }
    }

    if (Object.keys(errors).length) {
      return res.status(400).json({ errors })
    }

    next()
  }
}
