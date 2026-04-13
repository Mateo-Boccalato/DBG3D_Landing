import { Link } from 'react-router-dom'
import { SERVICES } from '../data/services'
import { usePageTitle } from '../hooks/usePageTitle'

export function HomePage() {
  usePageTitle('Home')

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="hero">
        <div className="container">
          <div className="tag">Designing Blueprints Group</div>
          <h1 className="hero-title">Reverse-engineered precision for real-world parts.</h1>
          <p className="hero-sub">
            3D scanning, reverse engineering CAD, and production-ready workflows for restoration,
            right-to-repair, and custom manufacturing projects.
          </p>
          <div className="hero-actions">
            <Link className="btn btn--primary" to="/contact">
              Request a Quote
            </Link>
            <Link className="btn btn--outline" to="/services">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="tag">Services</div>
          <h2 className="section-title">Everything you need. Nothing you don&apos;t.</h2>
          <div className="services-grid">
            {SERVICES.map((service) => (
              <Link className="service-card" key={service.id} to={`/services/${service.id}`}>
                <div className="service-icon">{service.icon}</div>
                <div className="service-name">{service.title}</div>
                <div className="service-desc">{service.description}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">20</div>
              <div className="stat-label">Tutorial Series Planned</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">1</div>
              <div className="stat-label">Model Currently Available</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">24-48h</div>
              <div className="stat-label">Typical Response Window</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
