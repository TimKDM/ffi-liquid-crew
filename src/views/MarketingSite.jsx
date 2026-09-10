import {
  ArrowRight, BarChart3, CalendarDays, ClipboardList, Database,
  HeartHandshake, Menu, MessageSquare, Palette, Repeat2, Search, ShieldCheck,
  Shirt, SlidersHorizontal, Trophy, Users, X, Zap,
} from 'lucide-react'
import { createElement, useState } from 'react'

const productNav = [
  ['product', 'Product'],
  ['commissioners', 'For Commissioners'],
  ['themes', 'League Themes'],
  ['about', 'About'],
]

const workflows = [
  { number: '01', icon: Shirt, title: 'Set lineups', text: 'Starters, bench, IR, and valid replacements on one screen.' },
  { number: '02', icon: Zap, title: 'Work waivers', text: 'Search, compare, claim, and manage priority without getting lost.' },
  { number: '03', icon: Repeat2, title: 'Make trades', text: 'Build an offer, see the impact, and keep the conversation attached.' },
]

const themeOptions = {
  liquid: { name: 'Liquid Crew', note: '90s sports-zine', className: 'liquid', accent: 'Amber · teal · scorecard cream' },
  classic: { name: 'Sunday Standard', note: 'Clean and classic', className: 'classic', accent: 'Forest · white · graphite' },
  night: { name: 'Night Game', note: 'Bold and electric', className: 'night', accent: 'Midnight · blue · signal red' },
}

const partnerFeeds = [
  [CalendarDays, 'Schedules'],
  [BarChart3, 'Stats'],
  [HeartHandshake, 'Injuries'],
  [Zap, 'Projections'],
  [Database, 'Odds'],
]

function DemoRoster({ onEnter }) {
  const rows = [
    ['QB', 'Trevor Lawrence', 'JAX', '@ KC', '19.8'],
    ['RB', 'Ashton Jeanty', 'LV', '@ DEN', '18.7'],
    ['RB', 'Bhayshul Tuten', 'JAX', '@ KC', '10.2'],
    ['WR', 'Jaxon Smith-Njigba', 'SEA', 'SF', '17.4'],
    ['WR', 'Malik Nabers', 'NYG', '@ DAL', '15.9'],
    ['TE', 'Harold Fannin Jr.', 'CLE', 'CIN', '8.6'],
  ]
  return <div className="mk-product-window">
    <header><strong>FFI</strong><span>Liquid Crew</span><nav><b>My Team</b><i>Matchup</i><i>Players</i><i>League</i></nav><Search /></header>
    <div className="mk-window-body">
      <aside><span className="mk-team-mark">LC</span><h3>Liquid Crew</h3><small>Season 24</small><button type="button" onClick={onEnter}>Open demo <ArrowRight /></button></aside>
      <main><div className="mk-roster-title"><div><h3>My Team</h3><span>SYBAU</span></div><button type="button" onClick={onEnter}>Manage lineup</button></div>
        <div className="mk-roster-head"><span>SLOT</span><span>PLAYER</span><span>OPP</span><span>PROJ</span></div>
        {rows.map(([slot, player, team, opponent, projection]) => <div className="mk-roster-row" key={player}><b>{slot}</b><span><strong>{player}</strong><small>{team}</small></span><span>{opponent}</span><strong>{projection}</strong></div>)}
      </main>
    </div>
  </div>
}

function ThemePreview({ activeTheme, setActiveTheme }) {
  const theme = themeOptions[activeTheme]
  return <div className="theme-showcase">
    <div className="theme-tabs">{Object.entries(themeOptions).map(([id, item]) => <button key={id} type="button" className={activeTheme === id ? 'active' : ''} onClick={() => setActiveTheme(id)}><strong>{item.name}</strong><span>{item.note}</span></button>)}</div>
    <div className={`theme-stage ${theme.className}`}>
      <header><span className="theme-logo">{activeTheme === 'liquid' ? 'LC' : activeTheme === 'classic' ? 'SS' : 'NG'}</span><div><strong>{theme.name}</strong><small>{theme.accent}</small></div><button type="button">League home</button></header>
      <main><aside><span>HOME</span><span>MY TEAM</span><span>MATCHUP</span><span>PLAYERS</span><span>LEAGUE</span></aside><div><h3>Your league should feel like your league.</h3><p>Custom colors, graphics, awards, history, commissioner voice, and privacy.</p><div className="theme-scoreboard"><b>WEEKLY AWARDS</b><span>Hero</span><span>Bad Beat</span><span>Bench Boss</span></div></div></main>
    </div>
  </div>
}

export function MarketingSite({ onEnterDemo }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTheme, setActiveTheme] = useState('liquid')
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }
  return <div className="marketing-site">
    <header className="mk-header">
      <a className="mk-brand" href="#top" aria-label="FFI home"><strong>FFI</strong><span>THE FANTASY FOOTBALL<br />INDEPENDENTS</span></a>
      <button className="mk-menu" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle site navigation">{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'open' : ''}>{productNav.map(([id, label]) => <button key={id} type="button" onClick={() => go(id)}>{label}</button>)}</nav>
      <button className="mk-enter" type="button" onClick={onEnterDemo}>Enter Demo <ArrowRight /></button>
    </header>

    <main id="top">
      <section className="mk-hero">
        <div className="mk-hero-copy"><h1>Your league.<br />Your rules.<br /><b>Your place.</b></h1><p>Fantasy football built for the people who actually run the league.</p><div><button type="button" onClick={onEnterDemo}>Explore the demo <ArrowRight /></button><button type="button" onClick={() => go('product')}>See how FFI works</button></div><small>MORE CONTROL · DEEPER CONNECTIONS · A LEAGUE OF YOUR OWN</small></div>
        <div className="mk-hero-product"><p>COMMUNITIES<br />MAKE FOOTBALL<br /><b>BETTER.</b></p><DemoRoster onEnter={onEnterDemo} /><span>SAME GAME.<br />BIGGER STORIES.</span></div>
      </section>

      <section className="mk-belief"><div><h2>Tools for the people behind the game.</h2><p>FFI gives friend groups and communities the control, flexibility, and identity to make fantasy football feel like theirs.</p></div><div className="mk-belief-points"><span><SlidersHorizontal /><b>Commissioner control</b><small>Flexible settings. Less hassle.</small></span><span><Palette /><b>Make it yours</b><small>League themes and identity.</small></span><span><Users /><b>A stronger community</b><small>Built for groups, not impressions.</small></span></div></section>

      <section className="mk-workflows" id="product">
        <header><h2>Standard<br />where it matters.</h2><p>The core tools people already understand—made clearer, faster, and mobile-first.</p></header>
        <div>{workflows.map(({ number, icon, title, text }) => <article key={title}><span>{number}</span>{createElement(icon)}<div><h3>{title}</h3><p>{text}</p></div><ArrowRight /></article>)}</div>
      </section>

      <section className="mk-themes" id="themes">
        <header><h2>Independent<br />where it counts.</h2><p>Your league should feel like your league—not a forgotten page inside a media company.</p><ul><li>Custom visual themes</li><li>League-created awards</li><li>History and rivalries</li><li>Commissioner voice</li><li>Public or private spaces</li></ul></header>
        <ThemePreview activeTheme={activeTheme} setActiveTheme={setActiveTheme} />
      </section>

      <section className="mk-migrate">
        <header><h2>Bring the league.<br /><b>Leave the platform.</b></h2><p>Move without asking everyone to start their fantasy life over.</p></header>
        <div>{[['1', 'Import settings', 'Bring over scoring, rosters, and league structure.'], ['2', 'Invite managers', 'Send one link and bring the group back together.'], ['3', 'Keep your history', 'Preserve seasons, records, awards, and rivalries.']].map(([n, title, text]) => <article key={n}><b>{n}</b><span><strong>{title}</strong><small>{text}</small></span></article>)}</div>
      </section>

      <section className="mk-commissioner" id="commissioners">
        <header><h2>Total control.<br /><b>A better experience.</b></h2><p>Run the league without turning commissioner work into a second job.</p><button type="button" onClick={onEnterDemo}>See the commissioner tools <ArrowRight /></button></header>
        <div className="commissioner-preview"><aside><strong>FFI</strong><span>League</span><b>Settings</b><span>Managers</span><span>Scoring</span><span>Rules</span></aside><main><header><div><h3>League Settings</h3><p>Fine-tune the league from top to bottom.</p></div><button type="button">Save changes</button></header><div>{[[Trophy, 'Scoring', 'Points, bonuses, and defensive scoring'], [Users, 'Rosters', 'Positions, bench, and IR'], [ShieldCheck, 'Permissions', 'Manager and commissioner access'], [MessageSquare, 'Polls', 'League votes and rule changes'], [ClipboardList, 'Rules', 'Custom rules and league notes']].map(([icon, title, text]) => <article key={title}>{createElement(icon)}<span><strong>{title}</strong><small>{text}</small></span><ArrowRight /></article>)}</div></main></div>
      </section>

      <section className="mk-connect" id="about">
        <header><h2>Built to connect.</h2><p>FFI is architected to work with licensed sports-data and media providers. The demo is currently powered by clearly labeled sample data; production feeds come next.</p></header>
        <div>{partnerFeeds.map(([icon, label]) => <span key={label}>{createElement(icon)}<b>{label}</b></span>)}</div>
      </section>

      <section className="mk-final"><div><h2>Build your league’s home.</h2><p>See the product. Shape the platform. Keep the league yours.</p></div><div><button type="button" onClick={onEnterDemo}>Enter the demo <ArrowRight /></button><button type="button" className="mk-secondary-action" onClick={() => go('about')}>Why FFI <ArrowRight /></button></div></section>
    </main>

    <footer className="mk-footer"><div className="mk-brand"><strong>FFI</strong><span>FANTASY FOOTBALL<br />FOR REAL LIFE</span></div><p>People · leagues · a better Sunday</p><nav><div><b>Product</b><button type="button" onClick={() => go('product')}>Features</button><button type="button" onClick={onEnterDemo}>Interactive demo</button></div><div><b>Leagues</b><button type="button" onClick={() => go('commissioners')}>For commissioners</button><button type="button" onClick={() => go('themes')}>League themes</button></div><div><b>Company</b><button type="button" onClick={() => go('about')}>About FFI</button><button type="button" onClick={() => go('connect')}>Data approach</button></div></nav><span className="footer-checker" /></footer>
  </div>
}
