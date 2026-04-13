import { RAILGUIDE_MESH_B64 } from '../assets/railguide-mesh.b64'
import { ThreeViewer } from './ThreeViewer'

export function PortfolioCard({ item, onDownload }) {
  if (item.hasViewer) {
    return (
      <div className="pf-card pf-live" data-cat={item.category.join(',')}>
        <ThreeViewer meshDataB64={RAILGUIDE_MESH_B64} />
        <div className="pf-info">
          <div className="pf-meta">
            <div className="pf-tag">{item.tier}</div>
            <div className="pf-fmtbadge">.STP</div>
          </div>
          <div className="pf-title">{item.title}</div>
          <div className="pf-desc">{item.description}</div>
          <div className="pf-actions">
            <button className="btn--download" onClick={() => onDownload(item.filename)} type="button">
              ⬇ Access STP File
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pf-card pf-pending" data-cat={item.category.join(',')}>
      <div className="pf-thumb">
        <div className="pf-thumb-bg" />
        <div className="pf-thumb-grid" />
        <div className="pf-thumb-num">{item.tier.slice(1, 3)}</div>
        <div className="pf-thumb-lock">⬡</div>
      </div>
      <div className="pf-info">
        <div className="pf-meta">
          <div className="pf-tag">{item.tier}</div>
          <div className="pf-fmtbadge">{item.tags[0] || '.STP'}</div>
        </div>
        <div className="pf-title">{item.title}</div>
        <div className="pf-desc">{item.description}</div>
        <button className="btn--download" disabled type="button">
          Pending Tutorial Upload
        </button>
      </div>
    </div>
  )
}
