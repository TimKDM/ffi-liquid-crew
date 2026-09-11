# FFI — The Fantasy Football Independents

A React/Vite frontend prototype with a public FFI website and a fantasy-management demo. The same independent-sports identity carries through both: charcoal, cream, amber, faded red, condensed sports typography and handwritten notes. Liquid Crew supplies the example league, its real manager/team names and the supplied SYBAU roster.

## Run and verify

```bash
npm install
npm run dev
npm run lint
npm run build
```

The public page opens at `/`. Enter Demo opens the local fantasy workspace at `/#demo`. Its five primary destinations are Home, My Team, Matchup, Players and League. Claims, trades and commissioner settings are accessible from those screens.

## Supported deployment

Deploy the complete `dist` directory produced by `npm run build`. `netlify.toml` sets that build command, the `dist` publish directory and the SPA fallback. Keep `dist/assets` and `dist/fonts` with `dist/index.html`; the site uses self-hosted fonts and photographic assets.

The legacy `build:standalone` script is **not supported by this asset-based version**. It does not correctly embed all current images and fonts. Do not use or distribute its single-file output until the script is upgraded; use the standard `npm run build` / `dist` deployment instead.

## What the demo does

- Shows starters, bench and IR together, with eligible roster swaps and an undo action. Natural player positions remain separate from lineup slots such as FLEX.
- Filters the sample free-agent pool and saves demo waiver claims and trade proposals.
- Saves league posts, reactions and editable demo settings in this browser.
- Retains the supplied 12 league teams and manager names.

Demo state is versioned in localStorage under `ffi-demo-v6`. A local save is not a server-confirmed league transaction and is not shared across browsers or devices. New league labels currently share the same demo dataset; they do not create isolated leagues. Theme choices on the public page are visual previews, not a connected custom-theme service.

## Data and service boundaries

`src/data/appData.js` contains the operational demo data. `src/data/league.js` retains the earlier league reference material. User-supplied roster and league identities are distinct from illustrative projections, trends, opponent pairings, standings and activity. The interface labels the latter as sample data; kickoff and live schedule feeds are not connected.

This repository does not provide authenticated accounts, server-enforced roster locks or permissions, waiver processing, actual trade execution, invitations, billing, live sports feeds, league import, or multi-user messaging. Commissioner forms demonstrate local configuration; they do not enforce those settings across real league operations. No paid feed is needed to explore the prototype.

## Implementation

- `src/components/Brand.jsx`: shared FFI lockup and Liquid Crew badge.
- `src/components/AppChrome.jsx`: application masthead, league picker and navigation.
- `src/views/MarketingSite.jsx`: public website and links into the demo.
- `src/views/DashboardView.jsx` and `TeamView.jsx`: Home/clubhouse and roster management.
- `src/data/rosterHelpers.js`: eligible swaps, natural-position recovery and labeled sample trend deltas.
- `src/styles.css`: shared tokens, public/app styling and responsive layouts.
- `public/assets`: photographic assets and the script badge derived by editing the approved design reference.
- `public/fonts`: self-hosted Barlow Condensed and Kalam; source URLs and SIL Open Font License notices are included.

Build and lint checks are necessary but do not establish visual approval. Reference fidelity and responsive/interaction behavior require rendered browser review.
