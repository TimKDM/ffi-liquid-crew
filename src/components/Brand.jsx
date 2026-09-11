export function BrandLockup({ compact = false }) {
  return <span className={`ffi-brand${compact ? ' compact' : ''}`}><strong>FFI</strong><span>THE FANTASY<br />FOOTBALL INDEPENDENTS</span></span>
}

export function LeagueBadge({ className = '' }) {
  return <img className={`league-badge ${className}`} src="/assets/liquid-crew-badge.png" alt="Liquid Crew" />
}
