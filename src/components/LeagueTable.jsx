import { ArrowRight } from 'lucide-react'

export function LeagueTable({ teams, selectedTeam, onSelectTeam }) {
  const selected = teams.find((team) => team.id === selectedTeam) ?? teams[0]
  return (
    <section className="teams-board section-shell" id="teams" aria-labelledby="teams-heading">
      <div className="crew-directory">
        <div className="board-heading"><h2 id="teams-heading">THE CREW</h2><span>12 TEAMS.<br />SAME PROBLEMS.</span></div>
        <div className="team-list">
          {teams.map((team, index) => (
            <button key={team.id} type="button" aria-pressed={selectedTeam === team.id} className={selectedTeam === team.id ? 'selected' : ''} onClick={() => onSelectTeam(team.id)}>
              <small>{String(index + 1).padStart(2, '0')}</small><strong>{team.name}</strong><span>{team.manager}</span><ArrowRight aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="team-detail" aria-live="polite"><span>SELECTED // {selected.manager}</span><p>{selected.note}</p></div>
      </div>
      <div className="preseason-board" id="preseason-board">
        <div className="board-heading"><h2>PRESEASON BOARD</h2><span>PROJECTIONS.<br />OPINIONS.<br />BAD DECISIONS.</span></div>
        <div className="projection-wrap"><table>
          <thead><tr><th>TEAM</th><th>GRADE</th><th>PROJECTED</th><th>SOS</th></tr></thead>
          <tbody>{teams.map((team) => (
            <tr key={team.id} className={selectedTeam === team.id ? 'selected' : ''}>
              <th scope="row">{team.name}</th><td data-label="Grade">{team.grade}</td><td data-label="Projected">{team.projected}</td><td data-label="SOS">{team.sos}</td>
            </tr>
          ))}</tbody>
        </table></div>
        <p className="board-note">PRESEASON PROJECTIONS FROM THE COMMISSIONER’S SEASON 24 RECAP.</p>
      </div>
    </section>
  )
}
