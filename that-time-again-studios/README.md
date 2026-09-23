# That Time Again Studios — Rebuilt

This package is a clean reconstruction of the That Time Again Studios site from the available design material and project audit.

## Included

- Complete Vite + React + TanStack Router project root
- `package.json`, `vite.config.ts`, `tsconfig.json`, `vercel.json`
- code-defined TanStack route tree (no hand-edited generated route file)
- homepage in the charcoal / film-grain cinematic look (see SITE.md)
- Al & Sloppy show-detail page
- 11 episodes embedded as click-to-play video (Showrunner MP4s), plus Showrunner links
- 6 character entries with local WebP artwork
- 6 set entries with local WebP artwork
- explicit `> 0` checks, so empty arrays do not render a stray `0`
- `CODING_AGENT_PROMPT.md`
- `SITE.md`
- self-contained `standalone.html`

## Run

```bash
npm install
npm run typecheck
npm run build
npm run dev
npm run build:standalone   # regenerate standalone.html
```

## Standalone file

`standalone.html` is generated from the real app by `npm run build:standalone` (JS, CSS and every
`public/` asset inlined, hash routing so the detail page works from `file://`). Regenerate it after
any content change instead of editing it by hand.

## Content

Al & Sloppy's episodes, characters and sets are the real Showrunner data: episode titles, runtimes
and per-episode Showrunner URLs, and the original character/set artwork in `public/art/`.

The earlier full slate (44 shows with posters) is not in this rebuild; the homepage currently features
Al & Sloppy, Channel 86 and Records only.

## Deploy

This folder is self-contained inside the notmyspace repo.

- **Vercel / Netlify:** import the repo and set the project's root directory to `that-time-again-studios`
  (build `npm run build`, output `dist`). `vercel.json` already rewrites all routes to the SPA.
- **Anywhere, no build:** `standalone.html` is the whole site in one file and works from any URL or
  straight from disk.

