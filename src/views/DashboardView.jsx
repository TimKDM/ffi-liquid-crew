import {
  AlertTriangle, ArrowRight, ChevronRight, Clock3, Heart,
  MessageSquare, Repeat2, Shirt, Trophy, Zap,
} from 'lucide-react'
import { createElement, useState } from 'react'

const phases = [
  { id: 'prep', days: 'TUE – WED', label: 'Prep & research', title: 'Build your short list', detail: 'Review the week, make claims, and get trade talks moving.', action: 'Browse players', view: 'players' },
  { id: 'adjust', days: 'THU – SAT', label: 'Final adjustments', title: 'Lineups lock Sunday at 1:00 PM', detail: 'All 9 starting slots are filled. One player is on your watchlist.', action: 'Set lineup', view: 'team' },
  { id: 'live', days: 'SUN – MON', label: 'Set & watch', title: 'Your matchup is live', detail: 'Track every starter, react with the league, and see what changed.', action: 'Open matchup', view: 'matchups' },
]

const initialFeed = [
  { id: 1, initials: 'TG', name: 'Tim Garcia (SYBAU)', time: '2h ago', text: 'Claimed a player off waivers.', likes: 3, comments: 0 },
  { id: 2, initials: 'CM', name: 'Commissioner', time: '5h ago', label: 'LEAGUE NOTE', text: 'Welcome to Season 24. Same crew, more good football. Set those lineups and let’s have a great season.', likes: 6, comments: 2 },
  { id: 3, initials: 'TG', name: 'Tim Garcia (SYBAU)', time: '1d ago', text: 'Put Malachi Washington on the trade block.', likes: 2, comments: 1 },
]

function Matchup({ onView }) {
  return <section className="club-matchup">
    <header><h2>Week 1 matchup</h2><span>PROJECTED</span></header>
    <div className="club-matchup-body">
      <div className="club-team home"><i>S</i><span><strong>SYBAU</strong><small>Tim Garcia · 0–0</small></span><b>118.4</b></div>
      <em>VS</em>
      <div className="club-team away"><b>112.1</b><span><strong>PAPAS FRIAS</strong><small>Michael Hill · 0–0</small></span><i>P</i></div>
    </div>
    <button type="button" onClick={() => onView('matchups')}>Open matchup <ArrowRight /></button>
  </section>
}

function Attention({ data, onView }) {
  const items = [
    { icon: Shirt, label: 'Lineup', text: '9 of 9 starters set', view: 'team' },
    { icon: Zap, label: 'Waivers', text: `${data.claims.length} pending claim`, view: 'transactions' },
    { icon: Repeat2, label: 'Trade', text: `${data.trades.length} offer to review`, view: 'transactions' },
  ]
  return <section className="attention-list"><header><h2>Needs attention</h2></header>{items.map(({ icon, label, text, view }) => <button key={label} type="button" onClick={() => onView(view)}>{createElement(icon)}<span><strong>{label}</strong><small>{text}</small></span><ChevronRight /></button>)}</section>
}

function Clubhouse({ feed, setFeed }) {
  const [message, setMessage] = useState('')
  const post = (event) => {
    event.preventDefault()
    const text = message.trim()
    if (!text) return
    setFeed((current) => [{ id: Date.now(), initials: 'TG', name: 'Tim Garcia (SYBAU)', time: 'now', text, likes: 0, comments: 0 }, ...current])
    setMessage('')
  }
  const like = (id) => setFeed((current) => current.map((item) => item.id === id ? { ...item, likes: item.likes + 1 } : item))
  return <section className="clubhouse-feed">
    <header><h2>The clubhouse</h2><span>Latest from Liquid Crew</span><small>GOOD CONVERSATION KEEPS THE LEAGUE STRONG.</small></header>
    <div className="clubhouse-body"><div className="feed-list">{feed.map((item) => <article key={item.id}>
      <i>{item.initials}</i><div className="feed-author"><strong>{item.name}</strong><small>{item.time}</small></div><p>{item.label ? <b>{item.label}</b> : null}{item.text}</p>
      <div className="feed-actions"><button type="button" onClick={() => like(item.id)} aria-label={`React to ${item.name}`}><Heart /> {item.likes}</button><span><MessageSquare /> {item.comments}</span></div>
    </article>)}</div>
    <form className="trash-talk" onSubmit={post}><div><h3>Trash talk</h3><small>KEEP IT FUN. KEEP IT CLEAN.</small></div><textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Say something to the league…" aria-label="Message to the league" /><button type="submit" disabled={!message.trim()}>Post</button></form></div>
  </section>
}

function LeagueRail({ data, onView }) {
  return <aside className="league-rail">
    <p className="rail-slogan">SAME GAME.<br /><b>A HIGHER STANDARD.</b></p>
    <section><header>Standings</header><div className="rail-table-head"><span>#</span><span>TEAM</span><span>W</span><span>L</span></div>{data.teams.slice(0, 4).map((team, index) => <div className={team.id === 'sybau' ? 'selected' : ''} key={team.id}><span>{index + 1}</span><strong>{team.name}</strong><span>{team.wins}</span><span>{team.losses}</span></div>)}<button type="button" onClick={() => onView('league')}>View full standings <ArrowRight /></button></section>
    <section><header>Waiver priority</header><div className="waiver-place"><b>#8</b><span>SYBAU<small>{data.claims.length} claim pending</small></span></div><button type="button" onClick={() => onView('transactions')}>Manage claims <ArrowRight /></button></section>
    <p className="rail-manifesto">TWELVE MANAGERS.<br />ONE LEAGUE.<br />A LONG SEASON.</p>
  </aside>
}

export function DashboardView({ data, onView }) {
  const [phase, setPhase] = useState('adjust')
  const [feed, setFeed] = useState(initialFeed)
  const activePhase = phases.find((item) => item.id === phase)
  return <div className="club-home">
    <main className="club-home-main">
      <header className="game-plan-head"><div><h1>Week 1 Game Plan</h1><p>SAME LEAGUE. <b>DIFFERENT BREED.</b></p></div><strong>LIQUID CREW<small>SEASON 24</small></strong></header>
      <nav className="week-phases" aria-label="Week phase">{phases.map((item) => <button className={phase === item.id ? 'active' : ''} type="button" key={item.id} onClick={() => setPhase(item.id)}><strong>{item.days}</strong><span>{item.label}</span></button>)}</nav>
      <section className={`game-plan-action phase-${phase}`}><Clock3 /><div><h2>{activePhase.title}</h2><p>{activePhase.detail}</p></div><div className="starter-count"><b>{phase === 'adjust' ? '9 of 9' : phase === 'prep' ? '#8' : '118.4'}</b><span>{phase === 'adjust' ? 'STARTERS SET' : phase === 'prep' ? 'WAIVER PRIORITY' : 'PROJECTED'}</span></div><button type="button" onClick={() => onView(activePhase.view)}>{activePhase.action} <ArrowRight /></button>{phase === 'adjust' ? <aside><AlertTriangle /><span><b>Watchlist check</b><small>No injury designation</small></span></aside> : null}</section>
      <div className="game-plan-grid"><Matchup onView={onView} /><Attention data={data} onView={onView} /></div>
      <section className="heroes-strip"><header><h2>Heroes & Bums</h2><span>WEEKLY TRENDS · SEED DATA FOR DEMO ONLY</span><small>UPS. DOWNS. PERSPECTIVE.</small></header><div><article className="hero"><Trophy /><span><strong>Jaxon Smith-Njigba</strong><b>RISING INTEREST · +24%</b><small>Most-added WR in this demo league.</small></span></article><article className="bum"><AlertTriangle /><span><strong>Bhayshul Tuten</strong><b>FALLING INTEREST · −18%</b><small>Managers are cooling after a quiet preseason.</small></span></article><p>SAME PLAYERS.<br /><b>DIFFERENT STORIES<br />EVERY WEEK.</b></p></div></section>
      <Clubhouse feed={feed} setFeed={setFeed} />
    </main>
    <LeagueRail data={data} onView={onView} />
  </div>
}
