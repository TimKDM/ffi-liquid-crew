import { ArrowDown, ArrowRight, ArrowUp, Check, ChevronLeft, ChevronRight, Info, Plus, RotateCcw, ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'

const trendData = {
  'trevor-lawrence': ['steady', 0.4], 'ashton-jeanty': ['rising', 2.1],
  'bhayshul-tuten': ['cold', -3.1], 'jaxon-smith-njigba': ['hot', 4.2],
  'malik-nabers': ['rising', 1.7], 'harold-fannin': ['steady', 0.2],
  'marvin-harrison-jr': ['rising', 2.4], 'seahawks-dst': ['steady', 0.6],
  'will-reichard': ['rising', 1.1], 'kenneth-gainwell': ['rising', 1.3],
  'jakobi-meyers': ['steady', 0.5], 'malachi-washington': ['cold', -1.8],
  'marshawn-lloyd': ['cold', -1.4], 'jonah-coleman': ['rising', 1.6],
}

const kickoff = {
  QB: 'SUN 1:00 PM', RB: 'SUN 4:25 PM', WR: 'SUN 4:05 PM',
  TE: 'SUN 1:00 PM', FLEX: 'SUN 4:05 PM', 'D/ST': 'SUN 4:05 PM', K: 'MON 8:15 PM',
}

function Trend({ player }) {
  const [label, delta] = trendData[player.id] ?? ['steady', 0]
  const Icon = delta > 0.8 ? ArrowUp : delta < -0.8 ? ArrowDown : ArrowRight
  return <span className={`player-trend ${label}`}><Icon />{label}</span>
}

function PlayerRow({ player, selected, onSelect }) {
  const locked = player.rosterSlot === 'ir'
  return <tr className={selected ? 'is-selected' : ''}>
    <td><b className="roster-slot">{player.rosterSlot === 'starter' ? player.position : player.rosterSlot === 'ir' ? 'IR' : 'BN'}</b></td>
    <th scope="row"><strong>{player.name}</strong><small>{player.nflTeam} · {player.position}</small></th>
    <td><strong>{player.opponent}</strong><small>{kickoff[player.position] ?? 'SUN 1:00 PM'}</small></td>
    <td><b>{player.projection ? player.projection.toFixed(1) : '—'}</b></td>
    <td><Trend player={player} /></td>
    <td><span className={locked ? 'roster-status locked' : 'roster-status'}>{locked ? 'IR' : 'ACTIVE'}</span></td>
    <td><button className="swap-button" type="button" onClick={() => onSelect(player.id)} disabled={locked}>{locked ? 'LOCKED' : 'SWAP'}</button></td>
  </tr>
}

export function TeamView({ data, onSwap, onReset, onSave, onView }) {
  const [selectedId, setSelectedId] = useState(null)
  const [replacementId, setReplacementId] = useState('')
  const [dirty, setDirty] = useState(false)
  const starters = data.roster.filter((player) => player.rosterSlot === 'starter')
  const bench = data.roster.filter((player) => player.rosterSlot === 'bench')
  const injured = data.roster.filter((player) => player.rosterSlot === 'ir')
  const total = starters.reduce((sum, player) => sum + player.projection, 0)
  const selected = data.roster.find((player) => player.id === selectedId)

  const candidates = useMemo(() => {
    if (!selected) return []
    if (selected.rosterSlot === 'starter') {
      return bench.filter((player) => player.position === selected.position || (selected.position === 'FLEX' && ['RB', 'WR', 'TE'].includes(player.position)))
    }
    return starters.filter((player) => player.position === selected.position || (player.position === 'FLEX' && ['RB', 'WR', 'TE'].includes(selected.position)))
  }, [bench, selected, starters])

  const choosePlayer = (id) => { setSelectedId(id); setReplacementId('') }
  const confirmSwap = () => {
    if (!selectedId || !replacementId) return
    onSwap(selectedId, replacementId)
    setSelectedId(null)
    setReplacementId('')
    setDirty(true)
  }

  return <div className="team-manager">
    <header className="team-manager-head">
      <div><h1>My Team</h1><strong>SYBAU</strong><span className="team-brand-line"><b>LIQUID CREW</b> // SEASON 24</span></div>
      <div className="projected-total"><small>PROJECTED TOTAL</small><b>{total.toFixed(1)}</b></div>
      <div className="team-week-picker"><button type="button" aria-label="Previous week"><ChevronLeft /></button><span><strong>WEEK 1 · VS PAPAS FRIAS</strong><small>Sunday · 1:00 PM</small></span><button type="button" aria-label="Next week"><ChevronRight /></button></div>
    </header>

    <section className="lineup-attention">
      <ShieldCheck /><div><strong>Lineup ready</strong><span>All 9 starting slots are filled.</span></div>
      <div><Info /><span><strong>1 waiver claim pending</strong> Romeo Doubs for MarShawn Lloyd</span></div>
      <button type="button" onClick={() => onView('transactions')}>View claim <ArrowRight /></button>
    </section>

    <div className="roster-workspace">
      <section className="roster-board">
        <table className="roster-manager-table">
          <thead><tr><th>SLOT</th><th>PLAYER</th><th>OPPONENT / KICKOFF</th><th>PROJ</th><th>TREND</th><th>STATUS</th><th>ACTION</th></tr></thead>
          <tbody><tr className="roster-band starters"><th colSpan="7">STARTERS</th></tr>{starters.map((player) => <PlayerRow key={player.id} player={player} selected={selectedId === player.id} onSelect={choosePlayer} />)}
          <tr className="roster-band bench"><th colSpan="7">BENCH</th></tr>{bench.map((player) => <PlayerRow key={player.id} player={player} selected={selectedId === player.id} onSelect={choosePlayer} />)}
          <tr className="roster-band injured"><th colSpan="7">INJURED RESERVE</th></tr>{injured.map((player) => <PlayerRow key={player.id} player={player} selected={false} onSelect={choosePlayer} />)}</tbody>
        </table>
      </section>

      <aside className="team-insights">
        {selected ? <section className="swap-drawer">
          <header><h2>Replacing <b>{selected.name}</b></h2><button type="button" aria-label="Close swap options" onClick={() => setSelectedId(null)}>×</button></header>
          <p>Select an eligible {selected.position} replacement.</p>
          <div className="swap-options">{candidates.length ? candidates.map((player) => <label key={player.id} className={replacementId === player.id ? 'selected' : ''}><input type="radio" name="replacement" value={player.id} checked={replacementId === player.id} onChange={() => setReplacementId(player.id)} /><span><strong>{player.name}</strong><small>{player.nflTeam} · {player.position}</small></span><b>{player.projection.toFixed(1)}</b></label>) : <p>No eligible replacements available.</p>}</div>
          <button className="make-swap" type="button" disabled={!replacementId} onClick={confirmSwap}>Make swap</button>
        </section> : <section className="swap-help"><Info /><h2>Swap a player</h2><p>Select <strong>Swap</strong> beside any starter or bench player. FFI will show only eligible replacements.</p></section>}

        <section className="heroes-bums">
          <header><h2>Heroes & Bums</h2><span title="Recent performance versus projection"><Info /> RECENT VS PROJECTION</span></header>
          <div className="hero-row"><b>HERO <ArrowUp /></b><span><strong>Jaxon Smith-Njigba</strong><small>SEA · WR</small></span><em>+4.2<small>vs proj</small></em></div>
          <div className="bum-row"><b>BUM <ArrowDown /></b><span><strong>Bhayshul Tuten</strong><small>JAX · RB</small></span><em>−3.1<small>vs proj</small></em></div>
          <p>Recent performance math. Not an insult. Mostly.</p>
        </section>

        <section className="best-available">
          <header><h2>Best Available</h2><button type="button" onClick={() => onView('players')}>View more <ArrowRight /></button></header>
          <div><span><b>WR</b><strong>Rashid Shaheed</strong><small>NO · 9.1 projected</small></span><button type="button" onClick={() => onView('players')}><Plus /> Add</button></div>
        </section>
      </aside>
    </div>

    <footer className={dirty ? 'lineup-savebar is-dirty' : 'lineup-savebar'}><span>{dirty ? <><Info /> Lineup has unsaved changes</> : <><Check /> Lineup is saved</>}</span><button className="button secondary" type="button" onClick={() => { onReset(); setDirty(false); setSelectedId(null) }}><RotateCcw /> Reset</button><button className="button primary" type="button" disabled={!dirty} onClick={() => { onSave(); setDirty(false) }}><Check /> Save lineup</button></footer>
  </div>
}
