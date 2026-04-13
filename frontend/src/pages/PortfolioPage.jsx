import { useState } from 'react'
import { DownloadModal } from '../components/DownloadModal'
import { FilterBar } from '../components/FilterBar'
import { PortfolioCard } from '../components/PortfolioCard'
import { PORTFOLIO_ITEMS } from '../data/portfolio'
import { usePageTitle } from '../hooks/usePageTitle'

export function PortfolioPage() {
  usePageTitle('Portfolio')
  const [activeFilter, setActiveFilter] = useState('all')
  const [modalState, setModalState] = useState({ open: false, filename: null })

  const filteredItems = PORTFOLIO_ITEMS.filter(
    (item) => activeFilter === 'all' || item.category.includes(activeFilter),
  )

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section section--alt" style={{ paddingBottom: 40 }}>
        <div className="container">
          <div className="tag">CAD Portfolio</div>
          <h1 className="section-title">Every part. Viewable. Downloadable.</h1>
          <p className="section-sub">
            Rotate and inspect available models, then request the parametric file after acknowledging
            the DBG license.
          </p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="container">
          <FilterBar active={activeFilter} onChange={setActiveFilter} />
          <div className="portfolio-grid">
            {filteredItems.map((item) => (
              <PortfolioCard
                item={item}
                key={item.id}
                onDownload={(filename) => setModalState({ open: true, filename })}
              />
            ))}
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
