const FILTERS = [
  ['all', 'All'],
  ['available', 'Available Now'],
  ['household', 'Household'],
  ['corvette', 'C6 Corvette'],
  ['foxbody', 'Fox Body'],
]

export function FilterBar({ active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 36 }}>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--text3)',
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          marginRight: 4,
        }}
      >
        Filter:
      </span>
      {FILTERS.map(([value, label]) => (
        <button
          className={`pf-btn ${active === value ? 'pf-active' : ''}`}
          key={value}
          onClick={() => onChange(value)}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  )
}
