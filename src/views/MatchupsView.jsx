import { PageHeader, Panel } from '../components/AppChrome.jsx'

const games = [['SYBAU', '118.4', 'PAPAS FRIAS', '112.1'], ['Lawrence Brandywine', '107.2', 'Grammy9', '109.8'], ['John 3:16', '114.0', 'Please win', '96.4'], ['Tim’s not the boss of me', '121.6', 'Horse Puzzie', '116.3'], ['Blake Street Bongers', '119.2', 'Chopperstyle', '111.8'], ['Four Thin Inches', '108.7', 'Big Nix Energy', '115.5']]

export function MatchupsView() {
  return <><PageHeader title="Matchups" description="Sample pairings and projections — not the confirmed Liquid Crew schedule." actions={<div className="week-control"><strong>WEEK 1 · DEMO</strong></div>} /><div className="matchup-list">{games.map(([away, awayScore, home, homeScore], index) => <Panel key={away} title={`MATCHUP ${String(index + 1).padStart(2, '0')}`}><article className="score-row"><div><i>{away[0]}</i><span><strong>{away}</strong><small>0–0</small></span><b>{awayScore}</b></div><em>SAMPLE PROJECTION</em><div><i>{home[0]}</i><span><strong>{home}</strong><small>0–0</small></span><b>{homeScore}</b></div></article></Panel>)}</div></>
}
