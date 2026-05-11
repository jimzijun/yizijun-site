# yizijun-site Next.js recreation

This repository now uses a Next.js recreation of the website requested in issue #67.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
npm run start
```

## GitHub Pages deployment

This project deploys with GitHub Actions via `.github/workflows/cd.yml`.

- CD publishes the static export from `out`.
- `next.config.js` is configured for static export and repo base path on GitHub Actions.

Repository settings requirement:
- In **Settings → Pages**, set **Source** to **GitHub Actions**.

## Project card pinned data

Portfolio project cards are sourced from `src/data/projects.pinned.json` in curated order.

Each entry must include these required fields:
- `title` (string)
- `impact` (string, one-line impact statement)
- `role` (string)
- `link` (string URL)

Optional fields (safe to omit):
- `stack` (string)
- `summary` (string)
- `highlights` (string[])

Validation/parsing is enforced in `src/lib/project-cards.ts`. Invalid or missing required fields fail fast during render/build, so broken entries are caught early.

## Routes

- `/` Home (WELCOME, Games/Portfolio navigation)
- `/portfolio` Portfolio overview sections
- `/games` Games landing
- `/games/snake` Snake mini-game

## Curated Projects (pinned source)

Portfolio project cards are loaded from:

- `src/data/pinned-projects.json`

Required fields per entry:

- `title` (string)
- `impact` (string, one-line outcome)
- `role` (string)
- `link` (string URL)

Optional fields:

- `blurb` (string, display description override)
- `repo` should be `owner/repo` and is used for GitHub metadata hydration

Runtime validation is in `src/app/portfolio/page.tsx` (`isPinnedProject` + `getPinnedProjects`). Invalid entries fail fast during render/build.
