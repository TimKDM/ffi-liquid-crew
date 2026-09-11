import { ChevronDown, ClipboardList, Home, Search, Shield, Shirt, Trophy, Users } from 'lucide-react'
import { createElement } from 'react'
import { BrandLockup, LeagueBadge } from './Brand.jsx'

const items = [['dashboard', 'Home', Home], ['team', 'My Team', Shirt], ['matchups', 'Matchup', Trophy], ['players', 'Players', Users], ['league', 'League', Shield]]

export function AppChrome({ view, onView, onExitDemo, leagueMenuOpen, onLeagueMenu, onCreateLeague, leagues, activeLeague, onSelectLeague, onGlobalSearch, children }) {
  return <div className="ffi-app">
    <header className="app-masthead">
      <a href="#" onClick={(event) => { event.preventDefault(); onExitDemo() }} aria-label="FFI public website"><BrandLockup /></a>
      <span className="app-masthead-note handwritten">Same friends.<br />Better place to beat them.</span>
      <form className="global-search" onSubmit={onGlobalSearch}><Search /><input name="query" aria-label="Search FFI players" placeholder="Search players…" /></form>
      <span className="demo-account"><b>TG</b><span>Tim Garcia<small>DEMO MANAGER</small></span></span>
    </header>
    <div className="app-navigation">
      <div className="league-picker-wrap"><button className="league-picker" type="button" onClick={onLeagueMenu} aria-expanded={leagueMenuOpen}><LeagueBadge /><span>{activeLeague?.name ?? 'Select league'}</span><ChevronDown /></button>{leagueMenuOpen ? <div className="league-dropdown"><small>YOUR LEAGUES</small>{leagues.map((league) => <button key={league.id} type="button" className={activeLeague?.id === league.id ? 'selected' : ''} onClick={() => onSelectLeague(league)}><strong>{league.name}</strong><span>{league.role} · {league.team}</span></button>)}<button className="create-league" type="button" onClick={onCreateLeague}>+ Create demo league label</button><p>League labels share this demo’s roster.</p></div> : null}</div>
      <nav className="primary-nav" aria-label="FFI navigation">{items.map(([id, label, icon]) => <button key={id} className={view === id || (id === 'league' && ['transactions', 'commissioner'].includes(view)) ? 'active' : ''} type="button" onClick={() => onView(id)}>{createElement(icon)}<span>{label}</span></button>)}</nav>
      <span className="app-week">WEEK 1<span>PRESEASON DEMO</span></span>
    </div>
    <div className="demo-disclosure">FRONTEND DEMO <span>Sample projections, schedules & activity. Changes save in this browser only.</span></div>
    <main className="app-content">{children}</main>
    <footer className="app-footer"><BrandLockup compact /><span>Leagues make life better.</span><button type="button" onClick={onExitDemo}>Back to FFI</button></footer>
  </div>
}

export function PageHeader({ title, description, actions }) {
  return <div className="page-header"><div><h1>{title}</h1><p>{description}</p></div>{actions ? <div className="page-actions">{actions}</div> : null}</div>
}
export function Panel({ title, action, children, className = '' }) {
  return <section className={`panel ${className}`}><header><h2>{title}</h2>{action}</header><div className="panel-body">{children}</div></section>
}
export function EmptyState({ icon = ClipboardList, title, text }) {
  return <div className="empty-state">{createElement(icon)}<strong>{title}</strong><p>{text}</p></div>
}
export function Toast({ message }) {
  return message ? <div className="toast" role="status"><Shield />{message}</div> : null
}
