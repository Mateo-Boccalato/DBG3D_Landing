import { Link } from 'react-router-dom'
import { SERVICES } from '../data/services'
import { usePageTitle } from '../hooks/usePageTitle'

export function HomePage() {
  usePageTitle('Home')

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section section--alt ia-hero">
        <div className="container ia-hero-grid">
          <div>
            <div className="tag">Designing Blueprints Group</div>
            <h1 className="section-title">Get production-ready CAD from your physical parts.</h1>
            <p className="section-sub">
              Send your project details today. Get a scoped response within 24-48 hours with the
              right workflow and deliverables.
            </p>
            <div className="ia-cta-row">
              <Link className="btn btn--primary" to="/contact">
                Start a Project
              </Link>
              <Link className="btn btn--outline" to="/work">
                View Work
              </Link>
            </div>
          </div>
          <div className="decision-panel">
            <h3>Best fit for</h3>
            <ul>
              <li>Restoration and right-to-repair projects</li>
              <li>Legacy part digitization and archival</li>
              <li>Prototype and production prep workflows</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="proof-band">
            <div>
              <strong>24-48h</strong>
              <span>Typical response window</span>
            </div>
            <div>
              <strong>20</strong>
              <span>Tutorial series roadmap</span>
            </div>
            <div>
              <strong>South FL + Remote</strong>
              <span>In-person and shipped-part support</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="tag">Services Snapshot</div>
          <h2 className="section-title">A complete scan-to-delivery workflow.</h2>
          <div className="services-grid ia-services-grid">
            {SERVICES.map((service) => (
              <Link className="service-card" key={service.id} to={`/services/${service.id}`}>
                <div className="service-icon">{service.icon}</div>
                <div className="service-name">{service.title}</div>
                <div className="service-desc">{service.description}</div>
              </Link>
            ))}
          </div>
          <div className="ia-cta-row">
            <Link className="btn btn--primary" to="/services">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="tag">Featured Work</div>
          <div className="featured-work">
            <div className="featured-work-copy">
              <h2>Railing Guide: scan data to usable part model</h2>
              <p>
                Explore the available model, inspect geometry in the 3D viewer, and request the STP
                file through the license gate.
              </p>
              <div className="ia-cta-row">
                <Link className="btn btn--primary" to="/work">
                  View Work
                </Link>
                <Link className="btn btn--outline" to="/contact">
                  Start a Project
                </Link>
              </div>
            </div>
            <div className="decision-panel">
              <h3>Deliverable clarity</h3>
              <ul>
                <li>Parametric .STP as primary handoff</li>
                <li>Optional mesh formats by use case</li>
                <li>Support notes for implementation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="tag">Process Preview</div>
          <h2 className="section-title">Three stages. No guesswork.</h2>
          <div className="process-preview-grid">
            <div className="process-preview-card">
              <h3>1. Intake</h3>
              <p>Scope, constraints, and expected outputs are aligned up front.</p>
            </div>
            <div className="process-preview-card">
              <h3>2. Capture + Model</h3>
              <p>Scanning and CAD reconstruction are executed against real use requirements.</p>
            </div>
            <div className="process-preview-card">
              <h3>3. Delivery</h3>
              <p>You receive files and support notes ready for practical implementation.</p>
            </div>
          </div>
          <div className="ia-cta-row">
            <Link className="btn btn--outline" to="/process">
              View Process
            </Link>
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="container">
          <h2 className="section-title">Ready to start your project?</h2>
          <p className="section-sub">
            Send your part details and objectives. We will reply with a practical next step.
          </p>
          <div className="ia-cta-row">
            <Link className="btn btn--primary" to="/contact">
              Start a Project
            </Link>
            <Link className="btn btn--outline" to="/work">
              Review Work Samples
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
