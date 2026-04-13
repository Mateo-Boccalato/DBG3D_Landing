export function TutorialCard({ tutorial }) {
  return (
    <div className="tutorial-card">
      <div className="tutorial-thumb">
        <div className="tutorial-thumb-bg" />
        <div className="tutorial-thumb-grid" />
        <div className="tutorial-num">{String(tutorial.episode).padStart(2, '0')}</div>
        <div className="tutorial-play">▶</div>
      </div>
      <div className="tutorial-info">
        <div className="tutorial-tag">
          {tutorial.tier} · {tutorial.tags.join(' · ')}
        </div>
        <div className="tutorial-title">{tutorial.title}</div>
        <div className="tutorial-desc">{tutorial.description}</div>
      </div>
    </div>
  )
}
