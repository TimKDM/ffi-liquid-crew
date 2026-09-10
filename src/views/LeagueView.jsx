import { ArrowRight, BookOpen, MessageSquare, Settings } from 'lucide-react'
import { PageHeader, Panel } from '../components/AppChrome.jsx'

export function LeagueView({ data, onView }) {
  return <>
    <PageHeader title="League" description="Standings, managers, schedule, rules and the Liquid Crew archive." actions={<button className="button secondary" type="button" onClick={() => onView('commissioner')}><Settings /> Commissioner settings</button>} />
    <div className="league-summary"><div><span>SEASON</span><strong>24</strong></div><div><span>TEAMS</span><strong>12</strong></div><div><span>COMMISSIONER</span><strong>TIM GARCIA</strong></div><div><span>DEFENDING CHAMPION</span><strong>SYBAU</strong></div></div>
    <div className="league-grid"><Panel title="Standings"><div className="full-standings"><div className="standing-head"><span>#</span><span>Team</span><span>Manager</span><span>W</span><span>L</span><span>PF</span></div>{data.teams.map((team, index) => <div key={team.id} className={team.id === 'sybau' ? 'selected' : ''}><span>{index + 1}</span><strong>{team.name}</strong><small>{team.manager}</small><b>{team.wins}</b><b>{team.losses}</b><span>{team.points.toFixed(1)}</span></div>)}</div></Panel><div className="league-right"><Panel title="League Chat" action={<button className="text-button" type="button">Open chat <ArrowRight /></button>}><div className="chat-preview"><MessageSquare /><p><strong>Brad Ianacone</strong>When do waivers run?</p><p><strong>Tim Garcia</strong>Tomorrow morning. Same as the settings say.</p></div></Panel><Panel title="Rules & Archive"><div className="archive-link"><BookOpen /><span><strong>Liquid Crew record book</strong><small>League settings, draft recaps and 24 seasons of history.</small></span><ArrowRight /></div></Panel></div></div>
  </>
}
