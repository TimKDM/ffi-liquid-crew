import {
  Bell, CalendarDays, ChevronDown, ClipboardList, Home,
  Menu, MessageSquare, Search, Shield, Shirt, Trophy, Users, X,
} from 'lucide-react'
import { createElement } from 'react'

const items = [
  ['dashboard', 'Home', Home],
  ['team', 'My Team', Shirt],
  ['matchups', 'Matchup', Trophy],
  ['players', 'Players', Users],
  ['league', 'League', Shield],
]

export function AppChrome({ view, onView, sidebarOpen, onSidebar, leagueMenuOpen, onLeagueMenu, onCreateLeague, leagues, activeLeague, onSelectLeague, onGlobalSearch, children }) {
  return (
    <div className="ffi-app">
      <header className="topbar">
        <button className="mobile-menu" type="button" onClick={onSidebar} aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}>{sidebarOpen ? <X /> : <Menu />}</button>
        <a className="ffi-lockup" href="#dashboard" onClick={() => onView('dashboard')}><strong>FFI</strong><span>THE FANTASY FOOTBALL<br />INDEPENDENTS</span></a>
        <div className="league-picker-wrap"><button className="league-picker" type="button" onClick={onLeagueMenu} aria-expanded={leagueMenuOpen}><i className="checker" /> <span>{activeLeague?.name ?? 'SELECT LEAGUE'}</span><ChevronDown /></button>{leagueMenuOpen ? <div className="league-dropdown"><small>YOUR LEAGUES</small>{leagues.map((league) => <button key={league.id} type="button" className={activeLeague?.id === league.id ? 'selected' : ''} onClick={() => onSelectLeague(league)}><strong>{league.name}</strong><span>{league.role} · {league.team}</span></button>)}<button className="create-league" type="button" onClick={onCreateLeague}>+ Create or join league</button></div> : null}</div>
        <button className="week-picker" type="button" title="Week selector"><CalendarDays /><span>WEEK 1</span></button>
        <form className="global-search" onSubmit={onGlobalSearch}><Search /><input name="query" aria-label="Search FFI" placeholder="Search players…" /></form>
        <button className="icon-button notification-button" type="button" aria-label="Notifications"><Bell /><b>3</b></button>
        <button className="profile-button" type="button"><span>TG</span><i>Tim Garcia</i><ChevronDown /></button>
      </header>
      <aside className={sidebarOpen ? 'sidebar is-open' : 'sidebar'}>
        <div className="sidebar-league">
          <small>YOUR LEAGUE</small>
          <strong>{activeLeague?.name ?? 'LIQUID CREW'}</strong>
          <span>// SEASON 24</span>
        </div>
        <nav aria-label="FFI navigation">{items.map(([id, label, icon]) => <button key={id} className={view === id ? 'active' : ''} type="button" onClick={() => { onView(id); onSidebar(false) }}>{createElement(icon)}<span>{label}</span></button>)}</nav>
        <div className="sidebar-bottom"><MessageSquare /><strong>LEAGUE CHAT</strong><small>3 unread messages</small></div>
        <p className="sidebar-manifesto">SAME LEAGUE.<br />DIFFERENT ANIMALS.</p>
      </aside>
      <main className="app-content">{children}</main>
    </div>
  )
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
