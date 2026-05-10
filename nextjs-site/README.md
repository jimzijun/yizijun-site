# yizijun-site Next.js recreation

This directory contains a Next.js recreation of the existing website requested in issue #67.

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

- CD publishes the static export from `nextjs-site/out`.
- `next.config.js` is configured for static export and repo base path on GitHub Actions.

Repository settings requirement:
- In **Settings → Pages**, set **Source** to **GitHub Actions**.

## Routes

- `/` Home (WELCOME, Games/Portfolio navigation)
- `/portfolio` Portfolio overview sections
- `/games` Games landing
- `/games/snake` Snake mini-game
