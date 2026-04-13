import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../data/nav'

function isActive(pathname, path) {
  if (path === '/') return pathname === '/'
  return pathname === path || pathname.startsWith(`${path}/`)
}

export function Nav() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <nav>
      <div className="nav-inner">
        <Link className="nav-logo" to="/">
          <div className="nav-logo-mark">DBG</div>
          <div className="nav-logo-text">
            Designing Blueprints <span>Group</span>
          </div>
        </Link>

        <div className="nav-links">
          {NAV_LINKS.map((item) => {
            if (!item.children) {
              return (
                <Link
                  key={item.path}
                  className={`nav-link ${item.label === 'Get a Quote' ? 'nav-cta' : ''} ${
                    isActive(location.pathname, item.path) ? 'active' : ''
                  }`}
                  to={item.path}
                >
                  {item.label}
                </Link>
              )
            }

            return (
              <div className="nav-dropdown" key={item.path}>
                <Link
                  className={`nav-link ${isActive(location.pathname, item.path) ? 'active' : ''}`}
                  to={item.path}
                >
                  {item.label} ▾
                </Link>
                <div className="nav-dropdown-menu">
                  {item.children.map((child) => (
                    <Link className="nav-dropdown-item" key={child.path} to={child.path}>
                      <span className="nav-dropdown-icon">•</span>
                      <span>{child.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <button className="hamburger" onClick={() => setMobileOpen((s) => !s)} type="button">
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {NAV_LINKS.filter((x) => x.label !== 'Services').map((item) => (
          <Link
            className={`nav-link ${item.label === 'Get a Quote' ? 'btn btn--primary' : ''}`}
            key={item.path}
            to={item.path}
          >
            {item.label}
          </Link>
        ))}
        <Link className="nav-link" to="/services">
          Services
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link className="nav-link" to="/services/scanning">
            3D Scanning
          </Link>
          <Link className="nav-link" to="/services/reverse">
            Reverse Engineering
          </Link>
          <Link className="nav-link" to="/services/printing">
            3D Printing
          </Link>
          <Link className="nav-link" to="/services/coaching">
            Coaching
          </Link>
        </div>
      </div>
    </nav>
  )
}
