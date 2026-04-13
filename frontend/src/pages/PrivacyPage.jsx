import { usePageTitle } from '../hooks/usePageTitle'

export function PrivacyPage() {
  usePageTitle('Privacy Policy')

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section">
        <div className="container legal-content">
          <div className="tag">Privacy Policy</div>
          <h1 className="section-title">How DBG3D handles your information</h1>
          <p>
            DBG3D collects only the information needed to respond to inquiries, provide requested
            services, and deliver requested materials.
          </p>
          <h2>Information We Collect</h2>
          <ul>
            <li>Name and email from inquiry/request forms</li>
            <li>Optional project context you submit in form details</li>
            <li>Download request metadata for license compliance</li>
          </ul>
          <h2>How Information Is Used</h2>
          <ul>
            <li>Responding to inquiries and follow-up communication</li>
            <li>Delivering requested files and service documents</li>
            <li>Maintaining internal records of requests and submissions</li>
          </ul>
          <h2>Your Rights</h2>
          <p>
            You may request access, correction, or deletion of the personal information DBG3D holds.
            Contact DBG3D to make a request.
          </p>
        </div>
      </section>
    </div>
  )
}
