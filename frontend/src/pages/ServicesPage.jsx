import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ServiceCard } from '../components/ServiceCard'
import { SERVICES } from '../data/services'
import { usePageTitle } from '../hooks/usePageTitle'
import { useScrollToHash } from '../hooks/useScrollToHash'

const INDUSTRIES = [
  {
    id: 'marine',
    icon: '🚤',
    label: 'Marine',
    description:
      'From corroded hardware to custom hull components, we reverse engineer boat parts that are discontinued, backordered, or too expensive to source — so your build or repair never stalls waiting on a supplier.',
  },
  {
    id: 'automotive',
    icon: '🚗',
    label: 'Automotive',
    description:
      'Legacy parts, performance components, and custom fabrication — if a part is no longer available or a supplier cut you off, we scan what exists and deliver production-ready CAD so you can manufacture it yourself.',
  },
  {
    id: 'aviation',
    icon: '✈',
    label: 'Aviation',
    description:
      'From warbird restoration to new aircraft development, we digitize airframe and cabin components — giving builders and completions shops accurate CAD whether the original documentation exists or not.',
  },
  {
    id: 'film',
    icon: '🎬',
    label: 'Film, Media & Digital Characters',
    description:
      'We scan physical objects and people to deliver prop-ready prints and game-engine-compatible meshes for productions, animations, and virtual environments.',
  },
  {
    id: 'industrial',
    icon: '🏭',
    label: 'Industrial & Manufacturing',
    description:
      "Whether it's a paper mill running a legacy machine or a plant that just lost a critical supplier, we scan the part and deliver production-ready CAD that keeps your operation running.",
  },
]

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
              <Link className="btn btn--outline" to="/work">
                View Work
              </Link>
            </div>
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

      <section className="section section--alt">
        <div className="container">
          <div className="tag">Industries Served</div>
          <h2 className="section-title">Equipment-ready workflows for demanding fields.</h2>
          <p className="section-sub">
            DBG3D can support teams working across aviation, automotive, marine, architecture, and
            other physical-product environments where precise digital assets keep projects moving.
          </p>
          <div className="industry-grid">
            {INDUSTRIES.map((industry) => (
              <div className="industry-card" key={industry.id}>
                <div className="industry-card-icon">{industry.icon}</div>
                <div className="industry-card-label">{industry.label}</div>
                <p className="industry-card-desc">{industry.description}</p>
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
