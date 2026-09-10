import { useEffect, useState } from 'react'
import { AppChrome, Toast } from './components/AppChrome.jsx'
import { Modal } from './components/Modal.jsx'
import { initialAppData } from './data/appData.js'
import { usePersistentState } from './hooks/usePersistentState.js'
import { CommissionerView } from './views/CommissionerView.jsx'
import { DashboardView } from './views/DashboardView.jsx'
import { LeagueView } from './views/LeagueView.jsx'
import { MatchupsView } from './views/MatchupsView.jsx'
import { PlayersView } from './views/PlayersView.jsx'
import { TeamView } from './views/TeamView.jsx'
import { TransactionsView } from './views/TransactionsView.jsx'

function App() {
  const [data, setData] = usePersistentState('ffi-demo-v6', initialAppData)
  const [view, setView] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [leagueMenuOpen, setLeagueMenuOpen] = useState(false)
  const [activeLeagueId, setActiveLeagueId] = useState(data.leagues[0].id)
  const [search, setSearch] = useState('')
  const [position, setPosition] = useState('ALL')
  const [claimPlayer, setClaimPlayer] = useState(null)
  const [claimDrop, setClaimDrop] = useState(data.roster.find((player) => player.rosterSlot === 'bench')?.name ?? '')
  const [commissionerTab, setCommissionerTab] = useState('League Settings')
  const [createLeagueOpen, setCreateLeagueOpen] = useState(false)
  const [newLeague, setNewLeague] = useState({ name: '', teams: 12, scoring: 'Head-to-head points' })
  const [tradeDraft, setTradeDraft] = useState({ partner: data.teams[0].name, give: data.roster[0].name, receive: '' })
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])

  const notify = (message) => setToast(message)
  const handleView = (nextView) => { window.scrollTo({ top: 0, behavior: 'auto' }); setView(nextView); setLeagueMenuOpen(false) }

  const movePlayer = (playerId) => {
    setData((current) => {
      const player = current.roster.find((item) => item.id === playerId)
      if (!player || player.rosterSlot === 'ir') return current
      if (player.rosterSlot === 'starter') {
        const replacement = current.roster.find((item) => item.rosterSlot === 'bench' && (item.position === player.position || (player.position === 'FLEX' && ['RB', 'WR', 'TE'].includes(item.position))))
        if (!replacement) { notify(`No eligible bench player for ${player.position}`); return current }
        return { ...current, roster: current.roster.map((item) => item.id === player.id ? { ...item, rosterSlot: 'bench' } : item.id === replacement.id ? { ...item, rosterSlot: 'starter', position: player.position } : item) }
      }
      const starter = current.roster.find((item) => item.rosterSlot === 'starter' && (item.position === player.position || (item.position === 'FLEX' && ['RB', 'WR', 'TE'].includes(player.position))))
      if (!starter) { notify(`No eligible starting slot for ${player.position}`); return current }
      return { ...current, roster: current.roster.map((item) => item.id === player.id ? { ...item, rosterSlot: 'starter', position: starter.position } : item.id === starter.id ? { ...item, rosterSlot: 'bench', position: player.position } : item) }
    })
  }

  const swapPlayers = (playerId, replacementId) => {
    setData((current) => {
      const player = current.roster.find((item) => item.id === playerId)
      const replacement = current.roster.find((item) => item.id === replacementId)
      if (!player || !replacement || player.rosterSlot === replacement.rosterSlot || player.rosterSlot === 'ir' || replacement.rosterSlot === 'ir') return current
      const starter = player.rosterSlot === 'starter' ? player : replacement
      const reserve = player.rosterSlot === 'bench' ? player : replacement
      return { ...current, roster: current.roster.map((item) => item.id === starter.id ? { ...item, rosterSlot: 'bench', position: reserve.position } : item.id === reserve.id ? { ...item, rosterSlot: 'starter', position: starter.position } : item) }
    })
  }

  const submitClaim = (event) => {
    event.preventDefault()
    if (!claimPlayer) return
    setData((current) => ({ ...current, claims: [...current.claims, { id: Date.now(), player: claimPlayer.name, drop: claimDrop, priority: 8, status: 'Pending' }], activity: [{ id: Date.now(), type: 'waiver', team: 'SYBAU', text: `submitted a claim for ${claimPlayer.name}`, time: 'now' }, ...current.activity] }))
    setClaimPlayer(null)
    notify(`Waiver claim submitted for ${claimPlayer.name}`)
  }

  const submitTrade = (event) => {
    event.preventDefault()
    setData((current) => ({ ...current, trades: [{ id: Date.now(), ...tradeDraft, status: 'Proposed' }, ...current.trades], activity: [{ id: Date.now() + 1, type: 'trade', team: 'SYBAU', text: `proposed a trade to ${tradeDraft.partner}`, time: 'now' }, ...current.activity] }))
    setTradeDraft((draft) => ({ ...draft, receive: '' }))
    notify(`Trade proposed to ${tradeDraft.partner}`)
  }

  const createLeague = (event) => {
    event.preventDefault()
    const id = `league-${Date.now()}`
    setData((current) => ({ ...current, leagues: [...current.leagues, { id, name: newLeague.name, role: 'Commissioner', team: 'Unassigned' }] }))
    setActiveLeagueId(id)
    setCreateLeagueOpen(false)
    setNewLeague({ name: '', teams: 12, scoring: 'Head-to-head points' })
    notify('New league workspace created')
  }

  const shared = { data, setData }
  const views = {
    dashboard: <DashboardView {...shared} onView={handleView} onMove={movePlayer} />,
    matchups: <MatchupsView {...shared} />,
    team: <TeamView {...shared} onSwap={swapPlayers} onView={handleView} onReset={() => { setData((current) => ({ ...current, roster: initialAppData.roster })); notify('Lineup reset') }} onSave={() => notify('Week 1 lineup saved')} />,
    players: <PlayersView {...shared} search={search} setSearch={setSearch} position={position} setPosition={setPosition} onClaim={(player) => { setClaimPlayer(player); setClaimDrop(data.roster.find((item) => item.rosterSlot === 'bench')?.name ?? '') }} />,
    transactions: <TransactionsView {...shared} onCancelClaim={(id) => { setData((current) => ({ ...current, claims: current.claims.filter((claim) => claim.id !== id) })); notify('Waiver claim cancelled') }} tradeDraft={tradeDraft} setTradeDraft={setTradeDraft} onTrade={submitTrade} />,
    league: <LeagueView {...shared} onView={handleView} />,
    commissioner: <CommissionerView {...shared} commissionerTab={commissionerTab} setCommissionerTab={setCommissionerTab} onSave={() => notify('League settings saved')} />,
  }

  const activeLeague = data.leagues.find((league) => league.id === activeLeagueId) ?? data.leagues[0]

  return <AppChrome view={view} onView={handleView} sidebarOpen={sidebarOpen} onSidebar={setSidebarOpen} leagueMenuOpen={leagueMenuOpen} onLeagueMenu={() => setLeagueMenuOpen((open) => !open)} onCreateLeague={() => { setCreateLeagueOpen(true); setLeagueMenuOpen(false) }} leagues={data.leagues} activeLeague={activeLeague} onSelectLeague={(league) => { setActiveLeagueId(league.id); setLeagueMenuOpen(false); handleView('dashboard'); notify(`${league.name} selected`) }} onGlobalSearch={(event) => { event.preventDefault(); const query = new FormData(event.currentTarget).get('query')?.toString() ?? ''; setSearch(query); handleView('players') }}>{views[view]}<Toast message={toast} />
    {claimPlayer ? <Modal title={`Claim ${claimPlayer.name}`} onClose={() => setClaimPlayer(null)} footer={<><button className="button secondary" type="button" onClick={() => setClaimPlayer(null)}>Cancel</button><button className="button primary" type="submit" form="claim-form">Submit claim</button></>}><form id="claim-form" className="modal-form" onSubmit={submitClaim}><div className="player-callout"><b>{claimPlayer.position}</b><span><strong>{claimPlayer.name}</strong><small>{claimPlayer.nflTeam} · {claimPlayer.opponent} · {claimPlayer.projection.toFixed(1)} projected</small></span></div><label>Drop player<select value={claimDrop} onChange={(event) => setClaimDrop(event.target.value)}>{data.roster.filter((player) => player.rosterSlot === 'bench').map((player) => <option key={player.id}>{player.name}</option>)}</select></label><p>Claim priority: <strong>#8</strong>. Claims process after the one-day waiver period.</p></form></Modal> : null}
    {createLeagueOpen ? <Modal title="Create a League" onClose={() => setCreateLeagueOpen(false)} footer={<><button className="button secondary" type="button" onClick={() => setCreateLeagueOpen(false)}>Cancel</button><button className="button primary" type="submit" form="create-league-form">Create league</button></>}><form id="create-league-form" className="modal-form" onSubmit={createLeague}><label>League name<input value={newLeague.name} onChange={(event) => setNewLeague((league) => ({ ...league, name: event.target.value }))} required /></label><label>Number of teams<input type="number" min="4" max="32" value={newLeague.teams} onChange={(event) => setNewLeague((league) => ({ ...league, teams: Number(event.target.value) }))} /></label><label>Scoring format<select value={newLeague.scoring} onChange={(event) => setNewLeague((league) => ({ ...league, scoring: event.target.value }))}><option>Head-to-head points</option><option>Best ball</option><option>Rotisserie</option></select></label></form></Modal> : null}
  </AppChrome>
}

export default App
