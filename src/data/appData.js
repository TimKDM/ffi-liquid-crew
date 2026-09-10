export const leagueTeams = [
  ['lawrence-brandywine', 'Lawrence Brandywine', 'Corey DeRosa'],
  ['grammy9', 'Grammy9', 'Ann SwanEvans'],
  ['john-3-16', 'John 3:16', 'Casey DeRosa'],
  ['please-win', 'Please win', 'Tom Trujillo'],
  ['papas-frias', 'PAPAS FRIAS', 'Michael Hill'],
  ['tims-not-the-boss', 'Tim’s not the boss of me', 'Brad Ianacone'],
  ['horse-puzzie', 'Horse Puzzie', 'Daniel Beard'],
  ['sybau', 'SYBAU', 'Tim Garcia'],
  ['blake-street-bongers', 'Blake Street Bongers', 'Ben Kurish'],
  ['chopperstyle', 'Chopperstyle', 'Brian Lamb'],
  ['four-thin-inches', 'Four Thin Inches', 'John Kurish + King Garcia'],
  ['big-nix-energy', 'Big Nix Energy', 'Jackson “Jack” Keating'],
].map(([id, name, manager], index) => ({ id, name, manager, wins: 0, losses: 0, points: 0, waiver: index + 1 }))

export const initialRoster = [
  ['trevor-lawrence', 'QB', 'Trevor Lawrence', 'JAX', '@ KC', 19.8, 'starter'],
  ['ashton-jeanty', 'RB', 'Ashton Jeanty', 'LV', '@ DEN', 18.7, 'starter'],
  ['bhayshul-tuten', 'RB', 'Bhayshul Tuten', 'JAX', '@ KC', 10.2, 'starter'],
  ['jaxon-smith-njigba', 'WR', 'Jaxon Smith-Njigba', 'SEA', 'SF', 17.4, 'starter'],
  ['malik-nabers', 'WR', 'Malik Nabers', 'NYG', '@ DAL', 15.9, 'starter'],
  ['harold-fannin', 'TE', 'Harold Fannin Jr.', 'CLE', 'CIN', 8.6, 'starter'],
  ['marvin-harrison-jr', 'FLEX', 'Marvin Harrison Jr.', 'ARI', '@ NO', 14.7, 'starter'],
  ['seahawks-dst', 'D/ST', 'Seattle Seahawks', 'SEA', 'SF', 8.1, 'starter'],
  ['will-reichard', 'K', 'Will Reichard', 'MIN', '@ CHI', 8.4, 'starter'],
  ['kenneth-gainwell', 'RB', 'Kenneth Gainwell', 'PIT', '@ NYJ', 7.5, 'bench'],
  ['jakobi-meyers', 'WR', 'Jakobi Meyers', 'LV', '@ DEN', 10.9, 'bench'],
  ['malachi-washington', 'WR', 'Malachi Washington', 'MIA', 'NE', 6.9, 'bench'],
  ['marshawn-lloyd', 'RB', 'MarShawn Lloyd', 'GB', 'DET', 6.4, 'bench'],
  ['jonah-coleman', 'RB', 'Jonah Coleman', 'SEA', 'SF', 7.9, 'bench'],
  ['tank-dell', 'WR', 'Tank Dell', 'HOU', 'LAR', 0, 'ir'],
].map(([id, position, name, nflTeam, opponent, projection, rosterSlot]) => ({ id, position, name, nflTeam, opponent, projection, rosterSlot, status: rosterSlot === 'ir' ? 'IR' : 'Active' }))

export const freeAgents = [
  ['dylan-sampson', 'RB', 'Dylan Sampson', 'CLE', 'CIN', 9.8, 18],
  ['trey-benson', 'RB', 'Trey Benson', 'ARI', '@ NO', 11.4, 63],
  ['romeo-doubs', 'WR', 'Romeo Doubs', 'GB', 'DET', 10.1, 48],
  ['chase-brown', 'RB', 'Chase Brown', 'CIN', '@ CLE', 12.8, 54],
  ['dalton-kincaid', 'TE', 'Dalton Kincaid', 'BUF', '@ BAL', 9.6, 39],
  ['rashid-shaheed', 'WR', 'Rashid Shaheed', 'NO', 'ARI', 9.1, 31],
  ['jaylen-wright', 'RB', 'Jaylen Wright', 'MIA', 'NE', 8.3, 27],
  ['tyjae-spears', 'RB', 'Tyjae Spears', 'TEN', '@ DEN', 8.0, 42],
].map(([id, position, name, nflTeam, opponent, projection, rostered]) => ({ id, position, name, nflTeam, opponent, projection, rostered, trend: projection >= 10 ? 'up' : 'steady' }))

export const scoringRules = [
  ['Passing yards', 'Per 25 yards', 1], ['Passing TD', 'Each', 6], ['Interception', 'Each', -2],
  ['Rushing yards', 'Per 10 yards', 1], ['Rushing TD', 'Each', 6], ['Reception', 'Each', 0.5],
  ['Receiving yards', 'Per 10 yards', 1], ['Receiving TD', 'Each', 6], ['300+ passing yards', 'Game bonus', 5], ['100+ rush/receiving yards', 'Game bonus', 5],
].map(([category, rule, points], index) => ({ id: index + 1, category, rule, points }))

export const initialAppData = {
  version: 6,
  league: { id: 'liquid-crew', name: 'Liquid Crew', season: 24, year: 2026, teamCount: 12, commissioner: 'Tim Garcia', format: 'Head-to-head points', ppr: 0.5, playoffTeams: 6, championshipWeek: 17, waiverType: 'Inverse standings', tradeReviewDays: 2 },
  leagues: [{ id: 'liquid-crew', name: 'Liquid Crew', role: 'Commissioner', team: 'SYBAU' }],
  teams: leagueTeams,
  roster: initialRoster,
  freeAgents,
  claims: [{ id: 1, player: 'Romeo Doubs', drop: 'MarShawn Lloyd', priority: 8, status: 'Pending' }],
  trades: [{ id: 1, partner: 'Four Thin Inches', give: 'Malachi Washington', receive: 'Mark Andrews', status: 'Proposed' }],
  activity: [
    { id: 1, type: 'add', team: 'SYBAU', text: 'added Will Reichard', time: '12m' },
    { id: 2, type: 'waiver', team: 'PAPAS FRIAS', text: 'submitted a waiver claim', time: '1h' },
    { id: 3, type: 'trade', team: 'Four Thin Inches', text: 'proposed a trade to SYBAU', time: '3h' },
    { id: 4, type: 'add', team: 'Chopperstyle', text: 'updated the starting lineup', time: '5h' },
  ],
  settings: {
    waiverType: 'Inverse standings', waiverDays: 1, tradeReviewDays: 2, vetoVotes: 5,
    playoffTeams: 6, championshipWeek: 17, regularSeasonWeeks: 14,
    rosterSize: 15, bench: 5, ir: 1,
    starters: { QB: 1, RB: 2, WR: 2, TE: 1, FLEX: 1, 'D/ST': 1, K: 1 },
    scheduleType: 'Round robin', rivalryWeek: 14,
    draftType: 'Snake', pickSeconds: 90, draftDate: '2026-08-29T18:00', pickTrading: true,
    permissions: { tradeOffers: true, tradeVoting: true, rosterEdits: false, leagueChat: true, coManagers: true },
  },
  scoringRules,
}
