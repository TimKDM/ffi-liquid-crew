import { ArrowRight } from 'lucide-react'

export function History({ primaryRules, expandedRules, historyStories, rulesOpen, onRulesToggle, archiveOpen, onArchiveToggle }) {
  const visibleRules = rulesOpen ? [...primaryRules, ...expandedRules] : primaryRules
  return (
    <section className="rules-history" id="rules">
      <div className="rules-panel"><div className="rules-inner">
        <div className="rules-kicker">SAME LEAGUE. DIFFERENT HANGOVER.</div>
        <h2>OUR RULES</h2><span className="margin-note">IT’S NOT<br />COMPLICATED.<br />THAT’S<br />THE POINT.</span>
        <dl>{visibleRules.map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}</dl>
        <button className="paper-button" type="button" aria-expanded={rulesOpen} onClick={onRulesToggle}>{rulesOpen ? 'SHOW CORE SETTINGS' : 'VIEW COMPLETE SETTINGS'} <ArrowRight aria-hidden="true" /></button>
      </div></div>
      <div className="history-panel" id="history">
        <div className="history-kicker">LIQUID CREW // HISTORY</div>
        <h2>THE STORIES ARE<br /><span>THE RECORD BOOK.</span></h2>
        <p>A tagged-up kegerator named Shannon Elizabeth. St. Ides Special Brew. Monument Valley Park. The Hill’s house. Santa and his friends. A bar built from fraternity-house lumber. Twenty-four seasons of completely meaningless bullshit.</p>
        <button className="dark-button" type="button" aria-expanded={archiveOpen} onClick={onArchiveToggle}>{archiveOpen ? 'CLOSE THE ARCHIVE' : 'ENTER THE ARCHIVE'} <ArrowRight aria-hidden="true" /></button>
        {archiveOpen ? <ul className="story-list">{historyStories.map((story) => <li key={story}>{story}</li>)}</ul> : null}
        <blockquote>“I wouldn’t want to spend 24 years arguing over rules, rosters and completely meaningless bullshit with any other group of knuckleheads and my mom.”</blockquote>
      </div>
    </section>
  )
}
