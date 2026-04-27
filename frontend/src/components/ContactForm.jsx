import { useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '58af5a5e-114c-4fc3-ad4d-b3b7ca4360ee'

export function ContactForm() {
  const INITIAL_FIELDS = {
    name: '',
    email: '',
    service: '',
    details: '',
  }
  const [fields, setFields] = useState({
    ...INITIAL_FIELDS,
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
      const formData = new FormData(e.currentTarget)
      formData.append('access_key', WEB3FORMS_ACCESS_KEY)
      formData.append('subject', 'New DBG3D Contact Inquiry')
      formData.append('from_name', 'DBG3D Contact Form')

      const response = await fetch(WEB3FORMS_URL, {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message || 'Submission failed')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <>
        <div className="form-success show" id="contact-success">
          ✓ Quote request received. DBG will respond within 24-48 hours.
        </div>
        <button
          className="btn btn--outline"
          onClick={() => {
            setFields(INITIAL_FIELDS)
            setErrors({})
            setStatus('idle')
          }}
          style={{ marginTop: 12 }}
          type="button"
        >
          Submit Another Inquiry
        </button>
      </>
    )
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-name">
          Name *
        </label>
        <input
          className="form-input"
          id="contact-name"
          name="name"
          onChange={setField('name')}
          required
          value={fields.name}
        />
        {errors.name && <div className="field-error">{errors.name}</div>}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-email">
          Email *
        </label>
        <input
          className="form-input"
          id="contact-email"
          name="email"
          onChange={setField('email')}
          required
          type="email"
          value={fields.email}
        />
        {errors.email && <div className="field-error">{errors.email}</div>}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="contact-service">
          Service Focus
        </label>
        <select
          className="form-select"
          id="contact-service"
          name="service"
          onChange={setField('service')}
          value={fields.service}
        >
          <option value="">Select one...</option>
          <option>3D Scanning</option>
          <option>Product Design</option>
          <option>3D Printing</option>
          <option>Coaching</option>
          <option>Multiple Services / Not Sure</option>
        </select>
      </div>
      <div className="form-group full">
        <label className="form-label" htmlFor="contact-details">
          Project Details (part, goal, timeline) *
        </label>
        <textarea
          className="form-textarea"
          id="contact-details"
          name="details"
          onChange={setField('details')}
          required
          value={fields.details}
        />
        {errors.details && <div className="field-error">{errors.details}</div>}
      </div>
      <div className="form-group full form-submit">
        <button className="btn btn--primary" disabled={status === 'submitting'} type="submit">
          {status === 'submitting' ? 'Submitting Quote Request...' : 'Get My Quote →'}
        </button>
        <div className="form-note">By submitting, you agree to be contacted about this project request.</div>
        {status === 'error' && !Object.keys(errors).length ? (
          <div className="form-error">Something went wrong. Please try again.</div>
        ) : null}
      </div>
    </form>
  )
}
