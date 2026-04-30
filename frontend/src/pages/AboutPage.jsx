import { usePageTitle } from '../hooks/usePageTitle'

export function AboutPage() {
  usePageTitle('About')

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section section--alt ia-hero">
        <div className="container">
          <div className="tag">About DBG</div>
          <h1 className="section-title">The person behind the scanner.</h1>
          <div className="about-layout">
            <div className="about-photo-wrap">
              <div className="about-photo">
                <div className="about-photo-placeholder">📸</div>
              </div>
              <div className="about-photo-caption">
                <div className="about-photo-name">Designing Blueprints Group</div>
                <div className="about-photo-title">South Florida</div>
              </div>
              <div className="about-accent-box" />
            </div>
            <div>
              <p className="about-bio">
                DBG3D turns physical parts into accurate CAD models for repair, manufacturing, and
                product development.
              </p>
              <p className="about-bio">
                We capture what exists today so you can build, replace, or improve what comes next.
              </p>
              <p className="about-bio">
                Each project is scoped around the right scan, model, and deliverable for the job.
              </p>
              <div className="about-credentials">
                <div className="about-credential">
                  <div className="about-credential-icon">🔬</div>
                  <div className="about-credential-text">
                    <strong>Scan-to-CAD focus</strong>
                    <span>Einstar Rockit + QuickSurface Pro workflow expertise</span>
                  </div>
                </div>
                <div className="about-credential">
                  <div className="about-credential-icon">⚖️</div>
                  <div className="about-credential-text">
                    <strong>IP-aware process</strong>
                    <span>Services are provided for lawful restoration, repair, and archival use</span>
                  </div>
                </div>
                <div className="about-credential">
                  <div className="about-credential-icon">🧰</div>
                  <div className="about-credential-text">
                    <strong>Practical outcomes</strong>
                    <span>Deliverables designed for downstream manufacturing and fit validation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
