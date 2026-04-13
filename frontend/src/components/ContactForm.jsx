import { useState } from 'react'
import { submitContact } from '../services/api'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function ContactForm() {
  const [fields, setFields] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    color: '',
    size: '',
    details: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const setField = (field) => (e) => {
    setFields((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const validate = () => {
    const next = {}
    if (!fields.name.trim()) next.name = 'Required'
    if (!fields.email.trim()) next.email = 'Required'
    else if (!EMAIL_RE.test(fields.email)) next.email = 'Invalid email format'
    if (!fields.details.trim()) next.details = 'Required'
    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nextErrors = validate()
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setStatus('submitting')
    try {
      await submitContact(fields)
      setStatus('success')
    } catch (err) {
      if (err?.errors) setErrors(err.errors)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success show" id="contact-success">
        ✓ Inquiry received! Thank you — DBG will respond within 24-48 hours.
      </div>
    )
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-name">
          Name *
        </label>
        <input className="form-input" id="contact-name" onChange={setField('name')} value={fields.name} />
        {errors.name && <div className="field-error">{errors.name}</div>}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-company">
          Company
        </label>
        <input className="form-input" id="contact-company" onChange={setField('company')} value={fields.company} />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-email">
          Email *
        </label>
        <input className="form-input" id="contact-email" onChange={setField('email')} type="email" value={fields.email} />
        {errors.email && <div className="field-error">{errors.email}</div>}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-phone">
          Phone
        </label>
        <input className="form-input" id="contact-phone" onChange={setField('phone')} value={fields.phone} />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-service">
          Service
        </label>
        <select className="form-select" id="contact-service" onChange={setField('service')} value={fields.service}>
          <option value="">Select one...</option>
          <option>3D Scanning</option>
          <option>Reverse Engineering</option>
          <option>3D Printing</option>
          <option>Coaching</option>
          <option>Multiple Services / Not Sure</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-color">
          Color
        </label>
        <input className="form-input" id="contact-color" onChange={setField('color')} value={fields.color} />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-size">
          Size
        </label>
        <input className="form-input" id="contact-size" onChange={setField('size')} value={fields.size} />
      </div>
      <div className="form-group full">
        <label className="form-label" htmlFor="contact-details">
          Project Details *
        </label>
        <textarea className="form-textarea" id="contact-details" onChange={setField('details')} value={fields.details} />
        {errors.details && <div className="field-error">{errors.details}</div>}
      </div>
      <div className="form-group full form-submit">
        <button className="btn btn--primary" disabled={status === 'submitting'} type="submit">
          {status === 'submitting' ? 'Sending...' : 'Send Inquiry →'}
        </button>
        {status === 'error' && !Object.keys(errors).length ? (
          <div className="form-error">Something went wrong. Please try again.</div>
        ) : null}
      </div>
    </form>
  )
}
