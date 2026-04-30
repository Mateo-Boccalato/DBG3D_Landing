import { useEffect, useMemo, useRef, useState } from 'react'
import { submitEmailSignup } from '../services/api'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function EmailCaptureModal({ open, onClose, onSuccess }) {
  const modalRef = useRef(null)
  const firstInputRef = useRef(null)
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const submitting = status === 'submitting'

  useEffect(() => {
    if (open) return
    setEmail('')
    setErrors({})
    setStatus('idle')
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape' && !submitting) onClose()
      if (e.key !== 'Tab' || !modalRef.current) return

      const focusable = Array.from(
        modalRef.current.querySelectorAll(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      )
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, submitting])

  useEffect(() => {
    if (!open) return
    firstInputRef.current?.focus()
  }, [open])

  const validationErrors = useMemo(() => {
    const next = {}
    if (!email.trim()) next.email = 'Required'
    else if (!EMAIL_RE.test(email)) next.email = 'Invalid email format'
    return next
  }, [email])

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
      await submitEmailSignup({ email, source: 'intent-popup' })
      setStatus('success')
      onSuccess?.()
    } catch (err) {
      if (err?.errors) setErrors(err.errors)
      setStatus('error')
    }
  }

  return (
    <div
      className="modal-overlay open"
      onClick={() => {
        if (!submitting) onClose()
      }}
    >
      <div
        aria-modal="true"
        className="modal lead-modal"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        role="dialog"
      >
        <button className="modal-close" onClick={() => !submitting && onClose()} type="button">
          x
        </button>
        <div className="modal-title">Stay Connected With DBG3D</div>
        <div className="modal-sub">
          Share your email and DBG3D will follow up with relevant scanning, CAD, and part-library
          updates when they are ready.
        </div>

        {status !== 'success' ? (
          <form className="form-grid" onSubmit={handleSubmit} style={{ gap: 12 }}>
            <div className="form-group full">
              <label className="form-label" htmlFor="lead-email">
                Email Address
              </label>
              <input
                className="form-input"
                id="lead-email"
                onChange={(e) => setEmail(e.target.value)}
                ref={firstInputRef}
                type="email"
                value={email}
              />
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>
            <div className="form-group full">
              <button className="btn btn--primary" disabled={submitting} style={{ width: '100%' }} type="submit">
                {submitting ? 'Submitting...' : 'Submit Email'}
              </button>
              {status === 'error' && !Object.keys(errors).length ? (
                <div className="form-error">Something went wrong. Please try again.</div>
              ) : null}
            </div>
          </form>
        ) : (
          <div className="form-success show" style={{ marginTop: 12 }}>
            Confirmed. Your email has been received.
          </div>
        )}
      </div>
    </div>
  )
}
