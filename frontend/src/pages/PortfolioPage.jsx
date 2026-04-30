import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DownloadModal } from '../components/DownloadModal'
import { FilterBar } from '../components/FilterBar'
import { PortfolioCard } from '../components/PortfolioCard'
import { PORTFOLIO_ITEMS } from '../data/portfolio'
import { usePageTitle } from '../hooks/usePageTitle'

export function PortfolioPage() {
  usePageTitle('Work')
  const [activeFilter, setActiveFilter] = useState('all')
  const [modalState, setModalState] = useState({ open: false, filename: null })
  const availableCount = PORTFOLIO_ITEMS.filter((item) => item.available).length

  const filteredItems = PORTFOLIO_ITEMS.filter(
    (item) => activeFilter === 'all' || item.category.includes(activeFilter),
  )

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section section--alt ia-hero" style={{ paddingTop: 44, paddingBottom: 46 }}>
        <div className="container ia-hero-grid">
          <div>
            <div className="breadcrumb">Home / Work</div>
            <div className="tag">Work</div>
            <h1 className="section-title">Proof of execution, not just concepts.</h1>
            <p className="section-sub">
              Explore deliverables from real scan-to-CAD workflows. Inspect geometry, review context,
              and request licensed files.
            </p>
            <div className="ia-cta-row">
              <Link className="btn btn--primary" to="/contact">
                Start a Project
              </Link>
              <Link className="btn btn--outline" to="/services">
                Explore Services
              </Link>
            </div>
          </div>
          <div className="decision-panel">
            <h3>Work highlights</h3>
            <ul>
              <li>{PORTFOLIO_ITEMS.length} mapped project entries</li>
              <li>{availableCount} currently downloadable models</li>
              <li>Replacement downloads will reopen through the license gate</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20, paddingBottom: 20 }}>
        <div className="container">
          <div className="decision-panel compact">
            <h3>How to use this page</h3>
            <ul>
              <li>Filter by category to focus on relevant parts</li>
              <li>Review planned examples while the approved sample library is refreshed</li>
              <li>Request custom deliverables through the project form</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <FilterBar active={activeFilter} onChange={setActiveFilter} />
          {filteredItems.length ? (
            <div className="portfolio-grid">
              {filteredItems.map((item) => (
                <PortfolioCard
                  item={item}
                  key={item.id}
                  onDownload={(filename) => setModalState({ open: true, filename })}
                />
              ))}
            </div>
          ) : (
            <div className="portfolio-empty">
              <h3>No downloadable files are live right now.</h3>
              <p>
                DBG3D is preparing a replacement sample part. Check the other filters for planned
                project examples, or start a project to discuss a custom deliverable.
              </p>
              <Link className="btn btn--primary" to="/contact">
                Start a Project
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="section section--alt final-cta">
        <div className="container">
          <h2 className="section-title">Ready to create your own deliverable?</h2>
          <p className="section-sub">
            Share your part and goals to scope a practical scan-to-CAD workflow.
          </p>
          <div className="ia-cta-row">
            <Link className="btn btn--primary" to="/contact">
              Start a Project
            </Link>
          </div>
        </div>
      </section>
      <DownloadModal
        filename={modalState.filename}
        onClose={() => setModalState({ open: false, filename: null })}
        open={modalState.open}
      />
    </div>
  )
}
