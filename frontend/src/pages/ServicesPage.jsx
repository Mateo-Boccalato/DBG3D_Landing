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
    const target = document.getElementById(serviceId)
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [serviceId])

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section section--alt" style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="tag">Services</div>
          <h1 className="section-title">Everything you need. Nothing you don&apos;t.</h1>
          <p className="section-sub">
            All services are project-specific and priced by scope. Contact DBG with your project
            details to receive a tailored quote.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-page-grid">
            {SERVICES.map((service) => (
              <div id={service.id} key={service.id}>
                <ServiceCard service={service} />
                <Link className="btn btn--primary" style={{ marginTop: 20 }} to="/contact">
                  {service.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
