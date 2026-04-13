import { useEffect, useMemo, useState } from 'react'
import { submitDownload } from '../services/api'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function DownloadModal({ open, filename, onClose, onSuccess }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const submitting = status === 'submitting'

  useEffect(() => {
    if (open) return
    setName('')
    setEmail('')
    setAgreed(false)
    setErrors({})
    setStatus('idle')
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape' && !submitting) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, submitting])

  const validationErrors = useMemo(() => {
    const next = {}
    if (!name.trim()) next.name = 'Required'
    if (!email.trim()) next.email = 'Required'
    else if (!EMAIL_RE.test(email)) next.email = 'Invalid email format'
    if (!agreed) next.agreed = 'You must agree to proceed'
    return next
  }, [name, email, agreed])

  if (!open) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    setStatus('submitting')
    setErrors({})
    try {
      await submitDownload({ name, email, filename, agreed })
      setStatus('success')
      onSuccess?.()
    } catch (err) {
      if (err?.errors) setErrors(err.errors)
      setStatus('error')
    }
  }

  return (
    <div
      className={`modal-overlay ${open ? 'open' : ''}`}
      onClick={() => {
        if (!submitting) onClose()
      }}
    >
      <div
        aria-modal="true"
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <button className="modal-close" onClick={() => !submitting && onClose()} type="button">
          ✕
        </button>
        <div className="modal-title">Access STP File</div>
        <div className="modal-sub">
          To download the parametric file for <strong>{filename || 'selected model'}</strong>, provide
          your details and acknowledge the license.
        </div>
        <div className="license-box">
          <strong>DBG Intellectual Property License — Personal & Educational Use Only</strong>
          <br />
          <br />
          This CAD file is the exclusive intellectual property of Designing Blueprints Group (DBG) and
          is provided for personal and educational use only.
        </div>

        {status !== 'success' ? (
          <form className="form-grid" onSubmit={handleSubmit} style={{ gap: 12 }}>
            <div className="form-group">
              <label className="form-label" htmlFor="dl-name">
                Full Name
              </label>
              <input
                className="form-input"
                id="dl-name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              {errors.name && <div className="field-error">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="dl-email">
                Email Address
              </label>
              <input
                className="form-input"
                id="dl-email"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
              />
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>
            <div className="checkbox-row" style={{ gridColumn: '1 / -1' }}>
              <input
                checked={agreed}
                id="dl-agree"
                onChange={(e) => setAgreed(e.target.checked)}
                type="checkbox"
              />
              <label htmlFor="dl-agree">
                I have read and agree to the DBG license terms. Commercial use requires written
                authorization.
              </label>
            </div>
            {errors.agreed && (
              <div className="field-error" style={{ gridColumn: '1 / -1' }}>
                {errors.agreed}
              </div>
            )}
            <div className="form-group full">
              <button className="btn btn--primary" disabled={submitting} style={{ width: '100%' }} type="submit">
                {submitting ? 'Submitting...' : 'Agree & Access File →'}
              </button>
              {status === 'error' && !Object.keys(errors).length ? (
                <div className="form-error">Something went wrong. Please try again.</div>
              ) : null}
            </div>
          </form>
        ) : (
          <div className="form-success show" style={{ marginTop: 12 }}>
            ✓ Confirmed! Your download request has been received.
          </div>
        )}
      </div>
    </div>
  )
}
