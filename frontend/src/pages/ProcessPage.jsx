import { Link } from 'react-router-dom'
import { usePageTitle } from '../hooks/usePageTitle'

const STEPS = [
  {
    id: 'intake',
    title: '1. Intake & Scope',
    description:
      'We review your part goals, constraints, and target deliverables. You get a clear scope and expected timeline before work begins.',
    artifacts: ['Project brief', 'Deliverable checklist', 'Timeline estimate'],
  },
  {
    id: 'capture',
    title: '2. Scan & Model',
    description:
      'DBG captures geometry and builds clean CAD output aligned to your use case: restoration, fitment, archive, or production handoff.',
    artifacts: ['Scan capture set', 'Modeling checkpoint', 'Review snapshot'],
  },
  {
    id: 'delivery',
    title: '3. Delivery & Support',
    description:
      'You receive final files, usage notes, and support for practical implementation so the output is usable, not just technically complete.',
    artifacts: ['Final files (.STP/.OBJ/.STL)', 'Usage notes', 'Revision support window'],
  },
]

export function ProcessPage() {
  usePageTitle('Process')

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section section--alt ia-hero">
        <div className="container ia-hero-grid">
          <div>
            <div className="tag">Process</div>
            <h1 className="section-title">From part in hand to production-ready files.</h1>
            <p className="section-sub">
              A transparent three-stage workflow designed for engineering confidence and practical
              handoff.
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
            <h3>What you can expect</h3>
            <ul>
              <li>Scope and constraints clarified early</li>
              <li>Milestone visibility during execution</li>
              <li>Final deliverables aligned to real use</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="process-grid">
            {STEPS.map((step) => (
              <article className="process-card" id={step.id} key={step.id}>
                <h2>{step.title}</h2>
                <p>{step.description}</p>
                <div className="process-artifacts">
                  {step.artifacts.map((artifact) => (
                    <span key={artifact}>{artifact}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container final-cta">
          <h2>Ready to scope your project?</h2>
          <p>
            Share your part details and target outcome. We will respond with a practical next step.
          </p>
          <Link className="btn btn--primary" to="/contact">
            Start a Project
          </Link>
        </div>
      </section>
    </div>
  )
}
