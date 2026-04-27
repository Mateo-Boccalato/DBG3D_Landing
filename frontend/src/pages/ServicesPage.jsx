import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ServiceCard } from '../components/ServiceCard'
import { SERVICES } from '../data/services'
import { usePageTitle } from '../hooks/usePageTitle'
import { useScrollToHash } from '../hooks/useScrollToHash'

export function ServicesPage() {
  const { serviceId } = useParams()
  usePageTitle('Services')
  useScrollToHash()

  useEffect(() => {
    if (!serviceId) return
    const normalizedId = serviceId === 'reverse' ? 'product-design' : serviceId
    const target = document.getElementById(normalizedId)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [serviceId])

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section section--alt ia-hero">
        <div className="container ia-hero-grid">
          <div>
            <div className="breadcrumb">Home / Services</div>
            <div className="tag">Services</div>
            <h1 className="section-title">Choose the right workflow for your part.</h1>
            <p className="section-sub">
              Every engagement is scoped around outcomes, deliverables, and constraints so you can
              decide quickly with confidence.
            </p>
            <div className="ia-cta-row">
              <Link className="btn btn--primary" to="/contact">
                Start a Project
              </Link>
              <Link className="btn btn--outline" to="/process">
                View Process
              </Link>
            </div>
          </div>
          <div className="decision-panel">
            <h3>Decision checkpoints</h3>
            <ul>
              <li>What problem this service solves</li>
              <li>What files and outputs you receive</li>
              <li>How scope, timeline, and fit are defined</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <div className="container">
          <div className="services-jump-nav">
            {SERVICES.map((service) => (
              <a href={`#${service.id}`} key={service.id}>
                {service.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="services-page-grid">
            {SERVICES.map((service) => (
              <div className="service-anchor" id={service.id} key={service.id}>
                <ServiceCard service={service} />
                <div className="service-decision-note">
                  Deliverables and scope are confirmed before execution to keep decisions practical and
                  transparent.
                </div>
                <Link className="btn btn--primary" style={{ marginTop: 20 }} to="/contact">
                  Start a Project
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt final-cta">
        <div className="container">
          <h2 className="section-title">Need help choosing the right service mix?</h2>
          <p className="section-sub">
            Share your part and target outcome. We will recommend the best-fit workflow.
          </p>
          <div className="ia-cta-row">
            <Link className="btn btn--primary" to="/contact">
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
