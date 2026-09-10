import { Filter, Plus, Search, TrendingUp } from 'lucide-react'
import { PageHeader, Panel } from '../components/AppChrome.jsx'

export function PlayersView({ data, search, setSearch, position, setPosition, onClaim }) {
  const players = data.freeAgents.filter((player) => (position === 'ALL' || player.position === position) && player.name.toLowerCase().includes(search.toLowerCase()))
  return <>
    <PageHeader title="Players" description="Search the player pool and submit waiver claims." />
    <div className="player-tools"><label><Search /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search available players" /></label><label><Filter /><select value={position} onChange={(event) => setPosition(event.target.value)}><option>ALL</option><option>QB</option><option>RB</option><option>WR</option><option>TE</option></select></label><span>{players.length} AVAILABLE</span></div>
    <Panel title="Available Players"><div className="data-table-wrap"><table className="data-table player-table"><thead><tr><th>Player</th><th>Pos</th><th>Opp</th><th>Proj</th><th>Rostered</th><th>Trend</th><th><span className="sr-only">Action</span></th></tr></thead><tbody>{players.map((player) => <tr key={player.id}><th scope="row"><strong>{player.name}</strong><small>{player.nflTeam}</small></th><td><b className="slot">{player.position}</b></td><td>{player.opponent}</td><td><b>{player.projection.toFixed(1)}</b></td><td>{player.rostered}%</td><td><span className="trend"><TrendingUp /> {player.trend}</span></td><td><button className="button compact primary" type="button" onClick={() => onClaim(player)}><Plus /> Claim</button></td></tr>)}</tbody></table></div></Panel>
  </>
}
