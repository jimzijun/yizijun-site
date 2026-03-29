# YizijunSite

This repository contains the Angular app for `yizijun-site`.

## Stack

- Angular `21.2.x`
- Angular CLI `21.2.x`
- Angular build system via `@angular/build`
- Unit tests via Angular's built-in Vitest runner

## Install

```bash
npm install
```

## Local development

```bash
npm start
```

The dev server runs at `http://localhost:4200/`.

## Build

```bash
npm run build
```

Production output is written to `dist/yizijun-site/`.

## Tests

```bash
npm test
```

To run tests once without watch mode:

```bash
npm test -- --watch=false
```

## Notes

- The old Angular 9-era Karma, Protractor, and TSLint setup has been removed.
- The app still depends on `p5`, which currently produces a non-fatal CommonJS warning during production builds.
