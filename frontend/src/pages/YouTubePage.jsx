import { Link } from 'react-router-dom'
import { TutorialCard } from '../components/TutorialCard'
import { YTRequestForm } from '../components/YTRequestForm'
import { TUTORIALS } from '../data/tutorials'
import { usePageTitle } from '../hooks/usePageTitle'

export function YouTubePage() {
  usePageTitle('Resources')

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section section--alt ia-hero">
        <div className="container ia-hero-grid">
          <div>
            <div className="breadcrumb">Home / Resources</div>
            <div className="tag">Resources</div>
            <h1 className="section-title">Tutorial content for better project outcomes.</h1>
            <p className="section-sub">
              Practical scanner and QuickSurface Pro operations content designed to support execution,
              not replace project delivery.
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
            <h3>Two audience tracks</h3>
            <ul>
              <li>Prospective clients validating workflow capability</li>
              <li>Operators learning scanner/software fundamentals</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 32, paddingBottom: 32 }}>
        <div className="container audience-split-grid">
          <div className="audience-card">
            <h3>For prospective clients</h3>
            <p>
              Use tutorials to assess quality, process discipline, and technical depth before starting
              your project.
            </p>
            <Link className="btn btn--outline" to="/work">
              Review Deliverables
            </Link>
          </div>
          <div className="audience-card">
            <h3>For operators/learners</h3>
            <p>
              Follow structured topic progression from scanner setup to model refinement in
              QuickSurface Pro.
            </p>
            <a className="btn btn--outline" href="https://youtube.com/@DBG3D" rel="noreferrer" target="_blank">
              Open YouTube Channel
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="tag">Learning Library</div>
          <h2 className="section-title">20 tutorial series mapped by complexity.</h2>
          <p className="section-sub" style={{ marginBottom: 24 }}>
            This is support content. For active project work, use the primary project-start route.
          </p>
          <div className="tutorials-grid">
            {TUTORIALS.map((tutorial) => (
              <TutorialCard key={tutorial.id} tutorial={tutorial} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt" id="request-section">
        <div className="container">
          <div className="request-box">
            <div className="request-box-title">Request or Critique a Video</div>
            <div className="request-box-sub">
              Have a topic to cover or feedback on an episode? Every submission is read personally.
            </div>
            <YTRequestForm />
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="container">
          <h2 className="section-title">Need execution support, not just tutorials?</h2>
          <p className="section-sub">
            Start a project for scoped delivery and production-ready output.
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
