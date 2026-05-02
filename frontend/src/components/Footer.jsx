import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-inner">
          <div>
            <div className="footer-logo">
              <div className="footer-logo-mark">DBG</div>
              <div className="footer-logo-text">
                Designing Blueprints <span>Group</span>
              </div>
            </div>
            <p className="footer-tagline">
              3D scanning, product design CAD, and production-focused training.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <div className="footer-links">
              <Link className="footer-link" to="/services/scanning">
                3D Scanning
              </Link>
              <Link className="footer-link" to="/services/product-design">
                Product Design
              </Link>
              <Link className="footer-link" to="/services/printing">
                3D Printing
              </Link>
              <Link className="footer-link" to="/services/coaching">
                Coaching
              </Link>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <div className="footer-links">
              <Link className="footer-link" to="/about">
                About
              </Link>

              <Link className="footer-link" to="/contact">
                Contact
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© {new Date().getFullYear()} DBG3D. All rights reserved.</div>
          <div className="footer-legal">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/iplicense">IP License</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
