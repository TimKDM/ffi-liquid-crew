# Liquid Crew on FFI

A Netlify-ready React site for Liquid Crew, one league inside **FFI — The Fantasy Football Independents**.

FFI is the future platform layer: leagues keep their own identity, rules, history and culture instead of being flattened into a generic fantasy-football template. This release builds the public Liquid Crew league page and keeps the data separate from the presentation layer so authentication, commissioner tools, scoring, lineups, waivers and trades can follow later.

## Run locally

```bash
npm install
npm run dev
```

## Build and deploy to Netlify

```bash
npm run build
```

For a Netlify Drop deployment that accepts a single file, run:

```bash
npm run build:standalone
```

This creates `liquid-crew-standalone.html` with the JavaScript, CSS and fonts embedded. Netlify can rename it to `index.html` during upload.

Import the repository in Netlify. `netlify.toml` already sets:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback routing

## Content and accuracy

Confirmed Season 24 facts, all 12 teams, preseason projections, rules and history live in `src/data/league.js`. The interface intentionally avoids invented matchups, standings and founding dates. Draft recaps are presented as a preseason snapshot, not a live roster source.

## Visual direction

The design combines mid-to-late-90s photocopied sports zines, VHS broadcast graphics and early-computer interface details. The teal, amber, paper and charcoal palette carries the FFI platform into the league page; textures and registration marks are built in CSS, with no beer-keg hero artwork.
