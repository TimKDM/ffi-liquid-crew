import {
  ArrowDown, ArrowRight, ArrowUp, Check, ChevronLeft, ChevronRight,
  Info, Plus, Scale, Sparkles, Undo2,
} from 'lucide-react'
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

const skillPositions = ['RB', 'WR', 'TE']

function compatible(starter, reserve) {
  return starter.position === reserve.position || (starter.position === 'FLEX' && skillPositions.includes(reserve.position))
}

function Trend({ player }) {
  const [label, delta] = trendData[player.id] ?? ['steady', 0]
  const Icon = delta > 0.8 ? ArrowUp : delta < -0.8 ? ArrowDown : ArrowRight
  return <span className={`player-trend ${label}`}><Icon />{label}</span>
}

function RosterRow({ player, selected, candidate, canMove, onSelect, onReplace }) {
  const isIR = player.rosterSlot === 'ir'
  const slot = player.rosterSlot === 'starter' ? player.position : player.rosterSlot === 'ir' ? 'IR' : 'BN'
  return <article className={`roster-row-v2${selected ? ' is-selected' : ''}${candidate ? ' is-candidate' : ''}`}>
    <b className="roster-slot">{slot}</b>
    <div className="roster-player"><strong>{player.name}</strong><small>{player.nflTeam} · {player.position}</small></div>
    <div className="roster-opponent"><strong>{player.opponent}</strong><small>{kickoff[player.position] ?? 'SUN 1:00 PM'}</small></div>
    <b className="roster-projection">{player.projection ? player.projection.toFixed(1) : '—'}</b>
    <Trend player={player} />
    <span className={isIR ? 'roster-status locked' : 'roster-status'}>{isIR ? 'IR' : player.status}</span>
    <div className="roster-row-action">
      {candidate ? <button type="button" onClick={() => onReplace(player.id)}>Put in</button> : selected ? <button type="button" onClick={() => onSelect(null)}>Cancel</button> : canMove ? <button type="button" onClick={() => onSelect(player.id)}>Move</button> : null}
    </div>
  </article>
}

function RosterGroup({ title, tone, players, selectedId, candidates, candidateIds, onSelect, onReplace }) {
  return <section className={`roster-group-v2 ${tone}`}>
    <header><h2>{title}</h2><span>{players.length}</span></header>
    {players.map((player) => <RosterRow key={player.id} player={player} selected={selectedId === player.id} candidate={candidateIds.has(player.id)} canMove={(candidates.get(player.id) ?? []).length > 0} onSelect={onSelect} onReplace={onReplace} />)}
  </section>
}

export function TeamView({ data, setData, onSwap, onView }) {
  const [selectedId, setSelectedId] = useState(null)
  const [lastRoster, setLastRoster] = useState(null)
  const starters = data.roster.filter((player) => player.rosterSlot === 'starter')
  const bench = data.roster.filter((player) => player.rosterSlot === 'bench')
  const injured = data.roster.filter((player) => player.rosterSlot === 'ir')
  const total = starters.reduce((sum, player) => sum + player.projection, 0)
  const selected = data.roster.find((player) => player.id === selectedId)

  const candidateMap = useMemo(() => {
    const map = new Map()
    data.roster.forEach((player) => {
      if (player.rosterSlot === 'starter') map.set(player.id, bench.filter((reserve) => compatible(player, reserve)))
      else if (player.rosterSlot === 'bench') map.set(player.id, starters.filter((starter) => compatible(starter, player)))
      else map.set(player.id, [])
    })
    return map
  }, [bench, data.roster, starters])

  const candidates = selected ? candidateMap.get(selected.id) ?? [] : []
  const candidateIds = new Set(candidates.map((player) => player.id))
  const bestMove = useMemo(() => {
    let best = null
    starters.forEach((starter) => {
      ;(candidateMap.get(starter.id) ?? []).forEach((reserve) => {
        const gain = reserve.projection - starter.projection
        if (gain > 0 && (!best || gain > best.gain)) best = { starter, reserve, gain }
      })
    })
    return best
  }, [candidateMap, starters])

  const replace = (replacementId, starterId = selectedId) => {
    if (!starterId || !replacementId) return
    setLastRoster(data.roster.map((player) => ({ ...player })))
    onSwap(starterId, replacementId)
    setSelectedId(null)
  }
  const undo = () => {
    if (!lastRoster) return
    setData((current) => ({ ...current, roster: lastRoster }))
    setLastRoster(null)
  }

  return <div className="team-command-v2">
    <header className="team-paper-head">
      <div><h1>My Team</h1><p><b>SYBAU</b> · Liquid Crew · Season 24</p></div>
      <div className="team-week-v2"><button type="button" aria-label="Previous week"><ChevronLeft /></button><span><strong>WEEK 1</strong><small>Schedule not connected</small></span><button type="button" aria-label="Next week"><ChevronRight /></button></div>
    </header>

    <section className="lineup-summary-v2">
      <div><Check /><span><strong>Lineup ready</strong><small>{starters.length} starting slots filled</small></span></div>
      <div><strong>{total.toFixed(1)}</strong><small>PROJECTED</small></div>
      {data.claims.length ? <button type="button" onClick={() => onView('players')}><Info /> {data.claims.length} waiver claim pending <ArrowRight /></button> : null}
    </section>

    <div className="roster-workspace-v2">
      <main className="roster-list-v2">
        <div className="roster-columns-v2"><span>SLOT</span><span>PLAYER</span><span>OPP / KICKOFF</span><span>PROJ</span><span>TREND</span><span>STATUS</span><span>ACTION</span></div>
        <RosterGroup title="Starters" tone="starters" players={starters} selectedId={selectedId} candidates={candidateMap} candidateIds={candidateIds} onSelect={setSelectedId} onReplace={replace} />
        <RosterGroup title="Bench" tone="bench" players={bench} selectedId={selectedId} candidates={candidateMap} candidateIds={candidateIds} onSelect={setSelectedId} onReplace={replace} />
        <RosterGroup title="IR" tone="ir" players={injured} selectedId={selectedId} candidates={candidateMap} candidateIds={candidateIds} onSelect={setSelectedId} onReplace={replace} />
      </main>

      <aside className="decision-rail-v2">
        <section className="best-lineup-v2"><header><Sparkles /><h2>Best lineup</h2></header>{bestMove ? <>
          <p>Start <b>{bestMove.reserve.name}</b> over {bestMove.starter.name} for <strong>+{bestMove.gain.toFixed(1)}</strong> projected points.</p>
          <button type="button" onClick={() => replace(bestMove.reserve.id, bestMove.starter.id)}>Apply suggestion <ArrowRight /></button>
        </> : <><p>Your highest-projected eligible players are already starting.</p><span><Check /> No move recommended</span></>}</section>

        <section className="compare-v2"><header><Scale /><h2>{selected ? 'Choose a replacement' : 'Compare'}</h2></header>{selected ? <>
          <p>Eligible replacements for <b>{selected.name}</b> are highlighted in the roster.</p>
          {candidates.map((player) => <button key={player.id} type="button" onClick={() => replace(player.id)}><span><strong>{player.name}</strong><small>{player.nflTeam} · {player.position}</small></span><b>{player.projection.toFixed(1)}<small>{(player.projection - selected.projection) >= 0 ? '+' : ''}{(player.projection - selected.projection).toFixed(1)}</small></b></button>)}
        </> : <p>Select <b>Move</b> beside a player. Only valid replacements will become available.</p>}</section>

        <section className="best-available-v2"><header><h2>Best available</h2><button type="button" onClick={() => onView('players')}>All players <ArrowRight /></button></header><div><b>WR</b><span><strong>Rashid Shaheed</strong><small>NO · 9.1 projected</small></span><button type="button" onClick={() => onView('players')}><Plus /> Add</button></div></section>
      </aside>
    </div>

    {lastRoster ? <div className="lineup-undo-v2" role="status"><Check /><strong>Saved</strong><button type="button" onClick={undo}><Undo2 /> Undo</button><button type="button" aria-label="Dismiss saved message" onClick={() => setLastRoster(null)}>×</button></div> : null}
  </div>
}
