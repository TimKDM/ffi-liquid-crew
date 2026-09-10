import { ArrowRight, FileText, Shield, Users } from 'lucide-react'

export function SeasonOverview() {
  return (
    <section className="season-overview section-shell" id="season-24" aria-labelledby="season-heading">
      <div className="section-title-line"><h2 id="season-heading">SEASON 24</h2><span>ANOTHER YEAR. SAME BULLSHIT.</span></div>
      <div className="season-actions">
        <a href="#teams"><Shield aria-hidden="true" /><span><small>DEFENDING CHAMPION</small><strong>SYBAU</strong></span><ArrowRight aria-hidden="true" /></a>
        <a href="#teams"><Users aria-hidden="true" /><span><small>THE FIELD</small><strong>12 TEAMS</strong></span><ArrowRight aria-hidden="true" /></a>
        <a href="#preseason-board"><FileText aria-hidden="true" /><span><small>DRAFT RECAP</small><strong>READ IT</strong></span><ArrowRight aria-hidden="true" /></a>
      </div>
    </section>
  )
}
