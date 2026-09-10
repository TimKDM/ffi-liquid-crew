import { ArrowRight, Plus, Trash2 } from 'lucide-react'
import { EmptyState, PageHeader, Panel } from '../components/AppChrome.jsx'

export function TransactionsView({ data, onCancelClaim, tradeDraft, setTradeDraft, onTrade }) {
  return <>
    <PageHeader title="Transactions" description="Manage waiver claims and propose trades without leaving the league workspace." />
    <div className="transaction-grid">
      <Panel title="Waiver Claims"><div className="claims-list">{data.claims.length ? data.claims.map((claim, index) => <article key={claim.id}><span className="priority">{index + 1}</span><div><small>ADD</small><strong>{claim.player}</strong></div><ArrowRight /><div><small>DROP</small><strong>{claim.drop}</strong></div><span className="status pending">{claim.status}</span><button className="icon-button" type="button" onClick={() => onCancelClaim(claim.id)} aria-label={`Cancel claim for ${claim.player}`}><Trash2 /></button></article>) : <EmptyState title="No pending claims" text="Add a player from the player pool to create one." />}</div></Panel>
      <Panel title="Propose a Trade"><form className="trade-form" onSubmit={onTrade}><label>Trade partner<select value={tradeDraft.partner} onChange={(event) => setTradeDraft((draft) => ({ ...draft, partner: event.target.value }))}>{data.teams.filter((team) => team.id !== 'sybau').map((team) => <option key={team.id}>{team.name}</option>)}</select></label><label>You send<select value={tradeDraft.give} onChange={(event) => setTradeDraft((draft) => ({ ...draft, give: event.target.value }))}>{data.roster.map((player) => <option key={player.id}>{player.name}</option>)}</select></label><label>You receive<input value={tradeDraft.receive} onChange={(event) => setTradeDraft((draft) => ({ ...draft, receive: event.target.value }))} placeholder="Player name" required /></label><button className="button primary" type="submit"><Plus /> Propose trade</button></form></Panel>
    </div>
    <Panel title="Trade Center"><div className="trade-list">{data.trades.map((trade) => <article key={trade.id}><span><small>WITH</small><strong>{trade.partner}</strong></span><span><small>YOU SEND</small><strong>{trade.give}</strong></span><ArrowRight /><span><small>YOU RECEIVE</small><strong>{trade.receive}</strong></span><b className="status pending">{trade.status}</b></article>)}</div></Panel>
  </>
}
