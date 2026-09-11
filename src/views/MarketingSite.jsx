import {
  ArrowLeftRight,
  ArrowRight,
  BarChart3,
  Check,
  ClipboardCheck,
  Menu,
  Search,
  Send,
  Shield,
  Trophy,
  Users,
  X,
} from 'lucide-react'
import { useState } from 'react'

const nav = [
  ['product', 'Product'],
  ['commissioners', 'Commissioners'],
  ['themes', 'League Themes'],
  ['why', 'Why FFI'],
]

const roster = [
  ['QB', 'Trevor Lawrence', 'JAX', '@ KC', 'Sun 1:00 PM'],
  ['RB', 'Ashton Jeanty', 'LV', '@ DEN', 'Sun 4:05 PM'],
  ['RB', 'Bhayshul Tuten', 'JAX', '@ KC', 'Sun 1:00 PM'],
  ['WR', 'Jaxon Smith-Njigba', 'SEA', 'SF', 'Sun 4:25 PM'],
  ['WR', 'Malik Nabers', 'NYG', '@ DAL', 'Sun 1:00 PM'],
  ['TE', 'Harold Fannin Jr.', 'CLE', 'CIN', 'Sun 1:00 PM'],
  ['FLEX', 'Marvin Harrison Jr.', 'ARI', 'LAR', 'Sun 4:25 PM'],
  ['K', 'Will Reichard', 'MIN', '@ GB', 'Sun 1:00 PM'],
  ['D/ST', 'Seahawks', 'SEA', 'SF', 'Sun 4:25 PM'],
]

const themes = [
  ['Liquid Crew', 'Amber / black / scorecard', 'LC'],
  ['Sunday Service', 'Clean / traditional / sharp', 'SS'],
  ['Bench Warmers', 'Warm / loud / unserious', 'BW'],
  ['Gridiron Social Club', 'Dark / classic / club', 'GS'],
]

function BrandLockup({ compact = false }) {
  return (
    <span className={`ffi-site-brand${compact ? ' compact' : ''}`}>
      <strong>FFI</strong>
      <span>THE FANTASY FOOTBALL<br />INDEPENDENTS</span>
    </span>
  )
}

function RosterPreview({ onEnterDemo }) {
  return (
    <div className="ffi-roster-preview">
      <header>
        <strong>FFI</strong>
        <b>My Team</b>
        <button type="button" aria-label="Select league">Liquid Crew⌄</button>
        <Menu aria-hidden="true" />
      </header>
      <nav aria-label="Demo navigation">
        <b>ROSTER</b><span>MATCHUP</span><span>PLAYERS</span><span>LEAGUE</span>
      </nav>
      <main>
        <h3>Starters</h3>
        <header><span>POS</span><span>PLAYER</span><span>OPP</span><span>STATUS</span></header>
        {roster.map(([pos, player, team, opp, status]) => (
          <button className="ffi-roster-line" type="button" key={player} onClick={onEnterDemo}>
            <b>{pos}</b>
            <span><strong>{player}</strong><small>{team}</small></span>
            <span>{opp}</span>
            <span>{status}</span>
          </button>
        ))}
      </main>
    </div>
  )
}

function RhythmIcon({ type }) {
  if (type === 'waivers') return <ClipboardCheck aria-hidden="true" />
  if (type === 'lineup') return <Users aria-hidden="true" />
  return <Shield aria-hidden="true" />
}

export function MarketingSite({ onEnterDemo }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(0)
  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="ffi-brand-site">
      <header className="ffi-site-header">
        <a href="#top" aria-label="FFI home"><BrandLockup /></a>
        <button className="ffi-site-menu" type="button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'open' : ''}>{nav.map(([id, label]) => <button type="button" key={id} onClick={() => go(id)}>{label}</button>)}</nav>
        <button className="ffi-gold-button" type="button" onClick={onEnterDemo}>Enter Demo <ArrowRight /></button>
        <i className="ffi-header-note">GOOD LEAGUES<br />LAST LONGER.</i>
      </header>

      <main id="top">
        <section className="ffi-brand-hero">
          <div className="ffi-hero-copy">
            <span className="ffi-margin-note">SAME FRIENDS.<br />BETTER PLACE<br />TO BEAT THEM.</span>
            <h1>Fantasy football<br />for people who<br />actually like<br />their league.</h1>
            <p>Set your lineup. Talk your shit. Keep the group together.</p>
            <div>
              <button className="ffi-gold-button" type="button" onClick={onEnterDemo}>Enter the demo <ArrowRight /></button>
              <button className="ffi-outline-button" type="button" onClick={() => go('product')}>See how it works</button>
            </div>
          </div>
          <div className="ffi-hero-app">
            <RosterPreview onEnterDemo={onEnterDemo} />
            <span className="ffi-tape-note">SET LINEUPS<br />TALK SHIT<br />WIN TOGETHER.</span>
            <span className="ffi-wall-tag">FFI<small>LEAGUES<br />MAKE LIFE<br />BETTER.</small></span>
          </div>
        </section>

        <section className="ffi-rhythm" id="why">
          <header><h2>The weekly<br />rhythm.</h2><i>Different days.<br />Same energy.</i></header>
          {[
            ['TUESDAY', 'Waivers', 'Waivers without the scavenger hunt.', 'waivers'],
            ['THURSDAY', 'Lineup', 'Set your lineup. Make your case.', 'lineup'],
            ['SUNDAY', 'Matchup', 'Nobody cares about your projection until you win.', 'matchup'],
          ].map(([day, title, copy, icon]) => <article key={day}><span><b>{day}</b><RhythmIcon type={icon} /></span><h3>{title}</h3><p>{copy}</p></article>)}
          <aside>Your league has better stories than their network.<em /></aside>
        </section>

        <section className="ffi-essentials" id="product">
          <header><h2>The essentials<br />without the nonsense.</h2><p>All the tools you need. None of the distractions.<br />Standard fantasy workflows, built for real leagues.</p><em /></header>
          <div className="ffi-tools-window">
            <nav><span>DRAFT</span><b>MANAGE</b><span>TRADE</span><span>WAIVERS</span><span>SCORING</span><span>STANDINGS</span></nav>
            <main>
              <div><b>Add / Drop Players</b><label><Search /><input readOnly placeholder="Search players…" /></label></div>
              <button type="button" onClick={onEnterDemo}><ArrowLeftRight /><span>Propose Trade</span></button>
              <button type="button" onClick={onEnterDemo}><BarChart3 /><span>View Standings</span></button>
            </main>
          </div>
          <i>FOOTBALL<br />BRINGS US HERE.<br />THE PEOPLE<br />KEEP US HERE.<em /></i>
        </section>

        <section className="ffi-clubhouse">
          <header><h2>A clubhouse.<br />Not just a platform.</h2><p>Trash talk. Trade talk. Group chat.<br />Keep the league in one place and the stories going all season.</p></header>
          <div className="ffi-chat">
            <nav><b>League Chat</b><span>Trades</span><span>Announcements</span></nav>
            {[
              ['TG', 'Tim Garcia', '10:14 AM', 'Putting in a claim. Let’s see if anyone’s paying attention.'],
              ['AS', 'Ann', '11:03 AM', 'Too late. Already on it.'],
              ['CM', 'Commissioner', '11:16 AM', 'Lineups due Thursday. No excuses.'],
            ].map(([initials, name, time, message]) => <p key={name}><b>{initials}</b><span><strong>{name}<small>{time}</small></strong>{message}</span></p>)}
            <label><input readOnly placeholder="Talk your shit…" /><Send /></label>
          </div>
          <aside><span>GOOD<br />LEAGUES</span><b>GOOD<br />PEOPLE.</b><small>Built for the group chat.</small></aside>
        </section>

        <section className="ffi-own-it" id="themes">
          <header><h2>Make it yours.</h2><p>FFI carries the Liquid Crew attitude. Each league supplies its own personality.</p><button className="ffi-outline-button" type="button" onClick={onEnterDemo}>Explore league themes <ArrowRight /></button></header>
          <div className="ffi-theme-demo">
            <div className="ffi-theme-badge"><span className="ffi-lc-mark"><b>{themes[theme][2]}</b><small>FFI LEAGUE</small></span><h3>{themes[theme][0]}</h3><small>{themes[theme][1]}</small></div>
            <main><h3>Your league. Your look.</h3><p>Names, logos, colors, language, awards, and history—without changing how fantasy works.</p><div>{themes.map(([name], index) => <button className={theme === index ? 'active' : ''} key={name} type="button" onClick={() => setTheme(index)}><b>{themes[index][2]}</b><span>{name}</span></button>)}</div></main>
          </div>
        </section>

        <section className="ffi-commish" id="commissioners">
          <header><h2>Commissioners<br />run a tight league.</h2><p>Flexible controls. Clear tools.<br />Less headache, more football.</p></header>
          <ul>{['Customize scoring settings', 'Manage waivers and trade rules', 'Edit league settings', 'Send announcements', 'Keep your league on track'].map(item => <li key={item}><Check />{item}</li>)}</ul>
          <button className="ffi-gold-button" type="button" onClick={onEnterDemo}>Commissioner tools <ArrowRight /></button>
          <aside>GOOD COMMISSIONERS<br />KEEP GOOD FRIENDS.</aside>
        </section>

        <section className="ffi-move">
          <article><Trophy /><h2>Bring your league<br />with you.</h2><p>Easy import from other platforms.<br />Same history. New home.</p><button className="ffi-outline-button" type="button">Import your league <ArrowRight /></button></article>
          <article><Shield /><h2>Ready for<br />what’s next.</h2><p>Prepared for licensed schedules, stats, injuries, projections, and odds feeds.</p><button className="ffi-outline-button" type="button" onClick={() => go('why')}>Accurate data. Real football. <ArrowRight /></button></article>
          <aside>THE GAME CHANGES.<br />GOOD LEAGUES DON’T.</aside>
        </section>

        <section className="ffi-last-call"><div><h2>Fantasy football is better together.</h2><p>Enter the demo and see what your league can do.</p></div><button className="ffi-gold-button" type="button" onClick={onEnterDemo}>Enter the demo <ArrowRight /></button></section>
      </main>

      <footer className="ffi-site-footer"><div><BrandLockup compact /><p>Leagues make life better.</p></div><nav>{nav.map(([id, label]) => <button type="button" key={id} onClick={() => go(id)}>{label}</button>)}</nav><i>GOOD LEAGUES<br />LAST LONGER.<em /></i></footer>
    </div>
  )
}
