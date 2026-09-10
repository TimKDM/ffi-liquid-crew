import {
  AlertTriangle, ArrowRight, CheckCircle2, Heart, MessageSquare,
  Repeat2, Search, Shirt, Trophy, Zap,
} from 'lucide-react'
import { createElement, useMemo, useState } from 'react'

const initialFeed = [
  { id: 1, initials: 'TG', name: 'Tim Garcia · SYBAU', time: '2h', text: 'Updated a lineup.', likes: 3, comments: 0 },
  { id: 2, initials: 'CM', name: 'Commissioner', time: '5h', label: 'LEAGUE NOTE', text: 'Season 24 is open. Check your roster and league settings before Week 1.', likes: 6, comments: 2 },
  { id: 3, initials: 'TG', name: 'Tim Garcia · SYBAU', time: '1d', text: 'Put Malachi Washington on the trade block.', likes: 2, comments: 1 },
]

function weeklyFocus(data) {
  const day = new Date().getDay()
  if (day === 2 || day === 3) return {
    icon: Zap, title: `${data.claims.length} waiver claim${data.claims.length === 1 ? '' : 's'} pending`,
    detail: 'Review available players and set your claim order.', action: 'Explore players', view: 'players',
  }
  if (day === 0 || day === 1) return {
    icon: Trophy, title: 'Follow your week', detail: 'Your live matchup belongs here once the schedule feed is connected.',
    action: 'Open matchup', view: 'matchups',
  }
  return {
    icon: Shirt, title: 'Review your lineup', detail: 'Your starters are filled. Check matchups, trends, and your bench before kickoff.',
    action: 'Open My Team', view: 'team',
  }
}

function Clubhouse({ feed, setFeed }) {
  const [message, setMessage] = useState('')
  const post = (event) => {
    event.preventDefault()
    const text = message.trim()
    if (!text) return
    setFeed((current) => [{ id: Date.now(), initials: 'TG', name: 'Tim Garcia · SYBAU', time: 'now', text, likes: 0, comments: 0 }, ...current])
    setMessage('')
  }
  return <aside className="home-clubhouse">
    <header><span className="checker" /><div><h2>The Clubhouse</h2><p>Your league. Your rules. Your history. Your place.</p></div></header>
    <form onSubmit={post}><textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Say something to the league…" aria-label="Message to the league" /><button type="submit" disabled={!message.trim()}>Post</button></form>
    <div className="home-feed">{feed.map((item) => <article key={item.id}>
      <i>{item.initials}</i><div><strong>{item.name}</strong><small>{item.time} ago</small><p>{item.label ? <b>{item.label}</b> : null}{item.text}</p><footer><button type="button" onClick={() => setFeed((current) => current.map((post) => post.id === item.id ? { ...post, likes: post.likes + 1 } : post))}><Heart /> {item.likes}</button><span><MessageSquare /> {item.comments}</span></footer></div>
    </article>)}</div>
  </aside>
}

export function DashboardView({ data, onView }) {
  const [feed, setFeed] = useState(initialFeed)
  const focus = weeklyFocus(data)
  const FocusIcon = focus.icon
  const starters = data.roster.filter((player) => player.rosterSlot === 'starter')
  const projected = starters.reduce((sum, player) => sum + player.projection, 0)
  const trendLeaders = useMemo(() => {
    const sorted = [...data.roster.filter((player) => player.rosterSlot !== 'ir')].sort((a, b) => b.projection - a.projection)
    return { hero: sorted[0], bum: sorted.at(-1) }
  }, [data.roster])

  const actions = [
    { icon: Shirt, title: 'Manage roster', detail: 'Starters, bench, IR, and lineup moves.', view: 'team' },
    { icon: Search, title: 'Explore players', detail: 'Search free agents and submit waiver claims.', view: 'players' },
    { icon: Repeat2, title: 'Trades', detail: `${data.trades.length} offer${data.trades.length === 1 ? '' : 's'} waiting in League.`, view: 'league' },
  ]

  return <div className="clubhouse-home-v2">
    <main>
      <header className="league-paper-head"><div><h1>Liquid Crew</h1><p>Season 24 on FFI</p></div><span>GOOD FOOTBALL.<br />BETTER PEOPLE.</span></header>

      <section className="today-focus">
        <div><small>WHAT NEEDS ATTENTION</small><h2>{focus.title}</h2><p>{focus.detail}</p></div>
        <button type="button" onClick={() => onView(focus.view)}><FocusIcon />{focus.action}<ArrowRight /></button>
      </section>

      <section className="home-matchup-v2">
        <header><h2>This week</h2><button type="button" onClick={() => onView('matchups')}>View matchup <ArrowRight /></button></header>
        <div><span className="team-mark">S</span><div><strong>SYBAU</strong><small>Tim Garcia · {starters.length} starters set</small></div><b>{projected.toFixed(1)}<small>PROJECTED</small></b><i>VS</i><div className="opponent-pending"><strong>Opponent pending</strong><small>Connect the league schedule to populate this matchup.</small></div></div>
      </section>

      <section className="quick-actions-v2"><header><h2>Quick actions</h2><p>Everything you do most, one tap away.</p></header>{actions.map(({ icon, title, detail, view }) => <button key={title} type="button" onClick={() => onView(view)}>{createElement(icon)}<span><strong>{title}</strong><small>{detail}</small></span><ArrowRight /></button>)}</section>

      <section className="heroes-v2"><header><h2>Heroes & Bums</h2><span>PERFORMANCE SNAPSHOT · DEMO DATA</span></header><div>
        <article className="hero"><Trophy /><span><b>HERO</b><strong>{trendLeaders.hero?.name}</strong><small>Highest projected player on your current roster.</small></span></article>
        <article className="bum"><AlertTriangle /><span><b>BUM</b><strong>{trendLeaders.bum?.name}</strong><small>Lowest projected active player. Context matters.</small></span></article>
      </div></section>

      <section className="home-status"><CheckCircle2 /><span><strong>Your league data stays yours.</strong><small>FFI is the platform. Liquid Crew controls its identity, settings, and history.</small></span></section>
    </main>
    <Clubhouse feed={feed} setFeed={setFeed} />
  </div>
}
