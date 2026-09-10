# FFI Product Roadmap

## Release 1 — Liquid Crew league page

- Public responsive league page inside an FFI platform shell
- All 12 Season 24 teams and preseason projection board
- Current league settings and expandable history archive
- League content in one replaceable data module
- Netlify build and SPA routing configuration

## Release 2 — The complete league archive

- Championship history and season records
- Draft-night archive, photos, rule changes, and league lore
- Weekly recaps and commissioner posts
- CSV or manual season-data import

## Release 3 — Private league operations

- Member accounts and commissioner roles
- Live rosters, lineup submission, and scoring
- Waivers, free agents, trades, and transaction log
- League constitution and configurable scoring rules
- Email and push notifications

Suggested platform: keep the React frontend on Netlify, add Netlify Functions for trusted server operations, and use Postgres through Supabase or Neon for league, player, roster, scoring, and transaction data.

## Release 4 — FFI as a real ESPN alternative

- Create and join leagues
- Multiple scoring formats and commissioner controls
- Draft room
- Player news and stat-provider integration
- Public and private leagues
- Native-quality mobile experience, then a PWA or mobile app if usage justifies it

The expensive part is not the interface. It is licensed player/stat data, scoring reliability, and the transactional integrity required for waivers and lineups. The current architecture protects the design work while letting those systems arrive later.
