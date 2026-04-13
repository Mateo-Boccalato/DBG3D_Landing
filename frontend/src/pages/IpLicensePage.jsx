import { usePageTitle } from '../hooks/usePageTitle'

export function IpLicensePage() {
  usePageTitle('IP License')

  return (
    <div style={{ paddingTop: 64 }}>
      <section className="section">
        <div className="container legal-content">
          <div className="tag">IP License</div>
          <h1 className="section-title">Personal and educational use license</h1>
          <p>
            This license applies to all downloadable CAD, mesh, and model files distributed by DBG3D.
          </p>
          <h2>Permitted Use</h2>
          <ul>
            <li>Personal reference and educational learning</li>
            <li>Internal non-commercial experimentation</li>
          </ul>
          <h2>Prohibited Use</h2>
          <ul>
            <li>Commercial manufacturing, resale, or redistribution</li>
            <li>Sublicensing or repackaging files without written authorization</li>
            <li>Embedding files in products or services for sale</li>
          </ul>
          <h2>Commercial Licensing</h2>
          <p>
            Commercial use requires separate written authorization from DBG3D and may involve
            additional terms and fees.
          </p>
        </div>
      </section>
    </div>
  )
}
