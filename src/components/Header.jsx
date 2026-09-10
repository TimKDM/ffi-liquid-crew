import { ChevronDown, Menu, X } from 'lucide-react'

const navItems = [
  ['Home', 'home'],
  ['Season 24', 'season-24'],
  ['Teams', 'teams'],
  ['Rules', 'rules'],
  ['History', 'history'],
]

export function Header({ menuOpen, onToggle, activeSection, leagueMenuOpen, onLeagueMenuToggle }) {
  return (
    <>
      <div className="ffi-bar">
        <a className="ffi-brand" href="#home" aria-label="FFI — The Fantasy Football Independents">
          <strong>FFI</strong><span>THE FANTASY FOOTBALL INDEPENDENTS</span>
        </a>
        <span className="ffi-manifesto">YOUR LEAGUE. YOUR RULES.</span>
        <div className="league-switcher">
          <button type="button" onClick={onLeagueMenuToggle} aria-expanded={leagueMenuOpen}>
            SWITCH LEAGUE <ChevronDown aria-hidden="true" />
          </button>
          {leagueMenuOpen ? (
            <div className="league-menu" role="status">
              <span>CURRENT LEAGUE</span>
              <strong>LIQUID CREW</strong>
              <small>More independent leagues will appear here.</small>
            </div>
          ) : null}
        </div>
      </div>

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Liquid Crew home">
          <span className="brand-name">LIQUID CREW</span>
          <i className="checker-mark" aria-hidden="true" />
        </a>
        <button className="menu-button" type="button" onClick={onToggle} aria-expanded={menuOpen} aria-controls="site-nav" aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav id="site-nav" className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="League navigation">
          {navItems.map(([label, id]) => <a key={id} className={activeSection === id ? 'active' : ''} href={`#${id}`}>{label}</a>)}
        </nav>
        <span className="league-tagline">SAME FRIENDS.<br />HIGHER STAKES.</span>
      </header>
    </>
  )
}
