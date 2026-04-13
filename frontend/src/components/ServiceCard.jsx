export function ServiceCard({ service }) {
  return (
    <div className="service-full-card" id={service.id}>
      <div className="service-full-icon">{service.icon}</div>
      <div className="service-full-name">{service.title}</div>
      <div className="service-full-desc">{service.description}</div>
      <div className="service-features">
        {service.features.map((feature) => (
          <div className="service-feature" key={feature}>
            {feature}
          </div>
        ))}
      </div>
    </div>
  )
}
