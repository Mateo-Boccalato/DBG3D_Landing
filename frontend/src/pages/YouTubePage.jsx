import { TutorialCard } from '../components/TutorialCard'
import { YTRequestForm } from '../components/YTRequestForm'
import { TUTORIALS } from '../data/tutorials'
import { usePageTitle } from '../hooks/usePageTitle'

export function YouTubePage() {
  usePageTitle('YouTube')

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section section--alt">
        <div className="container">
          <div className="tag">YouTube Channel</div>
          <h1 className="section-title">20 Tutorial Series. One complete workflow.</h1>
          <p className="section-sub">
            Einstar Rockit scanner and QuickSurface Pro workflows only. No reverse engineering
            strategy or IP circumvention guidance is provided.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
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
    </div>
  )
}
