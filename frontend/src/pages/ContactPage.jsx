import { ContactForm } from '../components/ContactForm'
import { usePageTitle } from '../hooks/usePageTitle'

export function ContactPage() {
  usePageTitle('Contact')

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section">
        <div className="container">
          <div className="tag">Contact</div>
          <h1 className="section-title">Request your project quote.</h1>
          <div className="contact-layout">
            <div>
              <div className="contact-info-title">What happens after you submit</div>
              <p className="contact-info-text">
                We review your scope, match the right workflow, and reply with practical next steps.
              </p>
              <div className="contact-details">
                <div className="contact-detail">
                  <div className="contact-detail-icon">📍</div>
                  <div>
                    <div className="contact-detail-label">Location</div>
                    <div className="contact-detail-value">South Florida</div>
                  </div>
                </div>
                <div className="contact-detail">
                  <div className="contact-detail-icon">⏱</div>
                  <div>
                    <div className="contact-detail-label">Response Time</div>
                    <div className="contact-detail-value">Typically within 24-48 hours</div>
                  </div>
                </div>
              </div>
              <ul className="contact-trust-list">
                <li>Clear scope and deliverable recommendations</li>
                <li>No generic templates, project-specific response</li>
                <li>Confidential handling of part details and files</li>
              </ul>
              <div className="contact-response-note">
                In-person and on-site sessions are scheduled based on scope and mutual availability.
              </div>
            </div>
            <div className="contact-form-wrap">
              <div className="contact-form-title">Start Your Quote Request</div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
