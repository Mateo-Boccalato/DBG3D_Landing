import { usePageTitle } from '../hooks/usePageTitle'

export function TermsPage() {
  usePageTitle('Terms')

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section">
        <div className="container legal-content">
          <div className="tag">Terms of Service</div>
          <h1 className="section-title">DBG3D website and service terms</h1>
          <p>
            By using this site, you agree to comply with these terms and all applicable laws. DBG3D
            may update these terms as business and legal requirements evolve.
          </p>
          <h2>Intellectual Property</h2>
          <p>
            All content on this site, including text, graphics, tutorials, and portfolio entries, is
            owned by Designing Blueprints Group and protected by applicable laws.
          </p>
          <h2>Service Scope</h2>
          <p>
            Services are offered for lawful restoration, repair, archival, and design iteration of
            parts the client owns or has rights to reproduce.
          </p>
          <h2>Liability</h2>
          <p>
            This site and all content are provided on an &quot;as is&quot; basis without warranties, to
            the fullest extent permitted by law.
          </p>
        </div>
      </section>
    </div>
  )
}
