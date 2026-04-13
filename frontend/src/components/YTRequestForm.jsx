import { useState } from 'react'
import { submitYTRequest } from '../services/api'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function YTRequestForm() {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    type: '',
    episode: '',
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
    if (!fields.type.trim()) next.type = 'Required'
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
      await submitYTRequest(fields)
      setStatus('success')
    } catch (err) {
      if (err?.errors) setErrors(err.errors)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success show" id="yt-success">
        ✓ Submitted! Thank you — your request has been received and will be reviewed.
      </div>
    )
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="yt-name">
          Your Name *
        </label>
        <input className="form-input" id="yt-name" onChange={setField('name')} value={fields.name} />
        {errors.name && <div className="field-error">{errors.name}</div>}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="yt-email">
          Your Email *
        </label>
        <input className="form-input" id="yt-email" onChange={setField('email')} type="email" value={fields.email} />
        {errors.email && <div className="field-error">{errors.email}</div>}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="yt-type">
          Type *
        </label>
        <select className="form-select" id="yt-type" onChange={setField('type')} value={fields.type}>
          <option value="">Select one...</option>
          <option>Video Request</option>
          <option>Episode Feedback / Critique</option>
          <option>General Channel Feedback</option>
        </select>
        {errors.type && <div className="field-error">{errors.type}</div>}
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="yt-episode">
          Related Episode # (if applicable)
        </label>
        <input className="form-input" id="yt-episode" onChange={setField('episode')} value={fields.episode} />
      </div>
      <div className="form-group full">
        <label className="form-label" htmlFor="yt-details">
          Details
        </label>
        <textarea className="form-textarea" id="yt-details" onChange={setField('details')} value={fields.details} />
      </div>
      <div className="form-group full form-submit">
        <button className="btn btn--primary" disabled={status === 'submitting'} type="submit">
          {status === 'submitting' ? 'Submitting...' : 'Submit →'}
        </button>
        {status === 'error' && !Object.keys(errors).length ? (
          <div className="form-error">Something went wrong. Please try again.</div>
        ) : null}
      </div>
    </form>
  )
}
