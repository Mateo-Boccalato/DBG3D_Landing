import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../data/nav'

function isActive(pathname, path) {
  if (path === '/') return pathname === '/'
  return pathname === path || pathname.startsWith(`${path}/`)
}

export function Nav() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const servicesRef = useRef(null)
  const ctaItem = NAV_LINKS.find((x) => x.cta)
  const standardLinks = NAV_LINKS.filter((x) => !x.cta)

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!servicesOpen) return undefined
    const onDocumentClick = (event) => {
      if (!servicesRef.current?.contains(event.target)) {
        setServicesOpen(false)
      }
    }
    const onEscape = (event) => {
      if (event.key === 'Escape') setServicesOpen(false)
    }
    document.addEventListener('mousedown', onDocumentClick)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onDocumentClick)
      document.removeEventListener('keydown', onEscape)
    }
  }, [servicesOpen])

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
          {standardLinks.map((item) => {
            if (!item.children) {
              return (
                <Link
                  key={item.path}
                  className={`nav-link ${isActive(location.pathname, item.path) ? 'active' : ''}`}
                  to={item.path}
                >
                  {item.label}
                </Link>
              )
            }

            return (
              <div
                className={`nav-dropdown ${servicesOpen ? 'open' : ''}`}
                key={item.path}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                ref={servicesRef}
              >
                <button
                  aria-controls="services-menu"
                  aria-expanded={servicesOpen}
                  aria-haspopup="menu"
                  className={`nav-link ${isActive(location.pathname, item.path) ? 'active' : ''}`}
                  onClick={() => setServicesOpen((prev) => !prev)}
                  type="button"
                >
                  {item.label} ▾
                </button>
                <div className="nav-dropdown-menu" id="services-menu" role="menu">
                  <Link className="nav-dropdown-item" role="menuitem" to="/services">
                    <span className="nav-dropdown-icon">•</span>
                    <span>All Services</span>
                  </Link>
                  {item.children.map((child) => (
                    <Link className="nav-dropdown-item" key={child.path} role="menuitem" to={child.path}>
                      <span className="nav-dropdown-icon">•</span>
                      <span>{child.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
          {ctaItem ? (
            <Link
              className={`nav-link nav-cta ${isActive(location.pathname, ctaItem.path) ? 'active' : ''}`}
              to={ctaItem.path}
            >
              {ctaItem.label}
            </Link>
          ) : null}
        </div>

        <button
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          className="hamburger"
          onClick={() => setMobileOpen((s) => !s)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-menu-close" onClick={() => setMobileOpen(false)} type="button">
          Close
        </button>
        {ctaItem ? (
          <Link className="btn btn--primary mobile-nav-cta" to={ctaItem.path}>
            {ctaItem.label}
          </Link>
        ) : null}
        <Link className="mobile-nav-link" to="/">
          Home
        </Link>
        {standardLinks.filter((x) => x.label !== 'Services').map((item) => (
          <Link
            className="mobile-nav-link"
            key={item.path}
            to={item.path}
          >
            {item.label}
          </Link>
        ))}
        <Link className="mobile-nav-link" to="/services">
          Services
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link className="mobile-nav-link" to="/services/scanning">
            3D Scanning
          </Link>
          <Link className="mobile-nav-link" to="/services/product-design">
            Product Design
          </Link>
          <Link className="mobile-nav-link" to="/services/printing">
            3D Printing
          </Link>
          <Link className="mobile-nav-link" to="/services/coaching">
            Coaching
          </Link>
        </div>
      </div>
    </nav>
  )
}
