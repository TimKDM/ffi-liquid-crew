export const league = {
  name: 'Liquid Crew',
  seasonYear: 2026,
  seasonNumber: 24,
  teamCount: 12,
  commissioner: 'Tim Garcia',
  defendingChampion: 'SYBAU',
  format: 'Head-to-head points',
  receptionScoring: '0.5 PPR',
}

export const teams = [
  { id: 'lawrence-brandywine', name: 'Lawrence Brandywine', manager: 'Corey DeRosa', grade: 'B-', projected: '5–9', sos: '8/12', note: 'Strong backfield. Travis Hunter’s offensive workload is the swing.' },
  { id: 'grammy9', name: 'Grammy9', manager: 'Ann SwanEvans', grade: 'B+', projected: '6–8', sos: '4/12', note: 'Chase, Pickens and the Burrow stack can carry a week. Ann can file schedule complaints with the commissioner.' },
  { id: 'john-3-16', name: 'John 3:16', manager: 'Casey DeRosa', grade: 'B+', projected: '6–8', sos: '6/12', note: 'Jefferson, London, Hurts and LaPorta provide the foundation. The running backs have to become more than supporting documentation.' },
  { id: 'please-win', name: 'Please win', manager: 'Tom Trujillo', grade: 'C', projected: '3–11', sos: '9/12', note: 'Bijan, A.J. Brown and Bowers are excellent. The autodrafted bench developed a tight-end fetish.' },
  { id: 'papas-frias', name: 'PAPAS FRIAS', manager: 'Michael Hill', grade: 'B-', projected: '6–8', sos: '1/12', note: 'A strong running-back room, uncertain receiver ceiling and three quarterbacks searching for a trade market.' },
  { id: 'tims-not-the-boss', name: 'Tim’s not the boss of me', manager: 'Brad Ianacone', grade: 'A', projected: '10–4', sos: '10/12', note: 'One of the deepest rosters in the league. Apparently finishing last is excellent draft capital.' },
  { id: 'horse-puzzie', name: 'Horse Puzzie', manager: 'Daniel Beard', grade: 'A-', projected: '7–7', sos: '5/12', note: 'Elite upside and veteran receiver depth, with age and durability yelling at clouds in the background.' },
  { id: 'sybau', name: 'SYBAU', manager: 'Tim Garcia', grade: 'A', projected: '10–4', sos: '12/12', note: 'The defending champion has a deep receiver room, major weekly ceiling and an RB2 problem he fully intends to negotiate with.' },
  { id: 'blake-street-bongers', name: 'Blake Street Bongers', manager: 'Ben Kurish', grade: 'A', projected: '9–5', sos: '2/12', note: 'Autodraft worked while Ben boarded a plane: elite starters with only minor repairs needed.' },
  { id: 'chopperstyle', name: 'Chopperstyle', manager: 'Brian Lamb', grade: 'A-', projected: '8–6', sos: '3/12', note: 'A strong core, a recovering Nabers and one Mahomes waiver decision that will remain in the permanent record.' },
  { id: 'four-thin-inches', name: 'Four Thin Inches', manager: 'John Kurish + King Garcia', grade: 'B+', projected: '7–7', sos: '7/12', note: 'Six strong starters and a thin RB2 spot despite having twice the management.' },
  { id: 'big-nix-energy', name: 'Big Nix Energy', manager: 'Jack Keating', grade: 'A', projected: '8–6', sos: '11/12', note: 'The league’s newest manager starts with an excellent young core and the burden of the Keating name.' },
]

export const primaryRules = [
  ['FORMAT', 'HEAD-TO-HEAD POINTS'],
  ['SCORING', '0.5 PPR'],
  ['PASSING TD', '6 POINTS'],
  ['ROSTER', '10 STARTERS · 4 BENCH · 1 IR'],
  ['DEFENSE', 'D/ST + 1 IDP'],
  ['WAIVERS', '1 DAY · WEEKLY INVERSE STANDINGS'],
  ['PLAYOFFS', '6 TEAMS · CHAMPIONSHIP WEEK 17'],
]

export const expandedRules = [
  ['DRAFT', 'SNAKE · 60 SECONDS PER PICK · PICK TRADING ON'],
  ['BONUSES', '+5 AT 300 PASSING OR 100 RUSHING/RECEIVING YARDS'],
  ['TRADES', 'NO LIMIT · 2-DAY REVIEW · 5 VOTES TO VETO'],
  ['REGULAR SEASON', '14 ONE-WEEK MATCHUPS · NO HOME-FIELD ADVANTAGE'],
  ['LINEUPS', 'EACH PLAYER LOCKS AT SCHEDULED GAME TIME'],
]

export const historyStories = [
  'A tagged-up kegerator named Shannon Elizabeth.',
  'St. Ides Special Brew and liquid lunch.',
  'Monument Valley Park and the Hill’s house.',
  'Santa Claus and his friends learned a difficult lesson.',
  'A bar built from fraternity-house framing lumber.',
  'Pete tried to pay dues with baked goods. Fuck Pete.',
]
