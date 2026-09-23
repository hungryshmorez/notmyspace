# That Time Again Studios

The home of That Time Again Studios: television, music, film, code and strange worlds.

- **Shows**: all 43 shows on the slate, browsed in Netflix-style rows by genre, each with its own page
- **Episodes**: *That Time Again with Al & Sloppy*, season one. All 11 episodes play right on the site, in a theater player that rolls on to the next episode.
- **Records**: That Time Again Records. The full catalogs of SHMOREZ, Tanky Johnson and DriftWave Static (184 tracks across 11 releases) play on the site.
- **Worlds & code**: The Festival, our walkable 3D night festival, plus the artist worlds inside it and the rest of what we build

Live: **https://hungryshmorez.github.io/Site/studios/**. It's published through the Site repo's GitHub Pages; see Deploy.

## What's on the site

| Page | What it has |
|------|-------------|
| `/` | Logo hero, the That Time Again with Al & Sloppy feature, **Browse**: a "Now streaming" row with all 11 episodes, then one sideways-scrolling row of posters per genre (Sci-Fi, Comedy, Horror, Anime, Drama, Family, Fantasy, and "More from the slate"). Then Records, the label roster, Worlds & code, and what we make. |
| `/shows/<slug>` | Every show has a page with its poster, genre, status, full synopsis and more shows from the same genre. That Time Again with Al & Sloppy's page adds Play season one, all 11 episodes, the cast and the sets. |
| `/records` | Every album by every label artist, with Play album, Play everything and per-track play. Links to each artist's world at the festival and to their press kit. |

Clicking any episode opens the **theater**, a large player over the page with previous and next episode buttons. It plays the next episode automatically, and Escape or a click outside closes it. A **player bar** at the bottom of the page keeps music going while you browse, with previous, play/pause, next and seek. Only one song or episode plays at a time.

## Where the content comes from

| Content | Source | Notes |
|---------|--------|-------|
| Show slate (titles, genres, synopses) | `src/data/slate.ts` | Transcribed from the pitch documents. Covers are in `public/art/posters/`. |
| That Time Again with Al & Sloppy episodes, cast, sets | `src/data/shows.ts` (`extras`) | The videos are Showrunner's MP4s. Stills, characters and sets are in `public/art/`. |
| Music catalog | **The Media site**: `https://hungryshmorez.github.io/Media/manifest.json` | Read live when the page loads (`src/data/catalog.ts`). Anything uploaded to the Media repo under `music/shmorez/`, `music/tanky/` or `music/driftwave/` appears on the Records page with no rebuild. The album comes from the manifest's `album` field; tracks without one are grouped as Singles. |
| Artist bios, photos, galleries, featured tracks, links | `src/data/artists.ts` | Bios are condensed from each artist's EPK on the festival site. Gallery images are in `public/art/artists/<slug>/` (SHMOREZ: Synthetic Human Protocol). |
| The Festival and the artist worlds | **The Site repo**: `https://hungryshmorez.github.io/Site/` | Linked from the header ("Enter the festival"), the Worlds section and each artist's links. |

## Adding things

- **A new song or album:** add it to the Media repo and its `manifest.json` (`src`, `title`, `album`). It shows up on the Records page automatically.
- **A new artist:** add an entry to `src/data/artists.ts`, with `mediaFolder` set to their folder under `music/` in Media. Then add a photo to `public/art/artists/`.
- **A new show:** add an entry to `src/data/slate.ts`, and put its poster (2:3, WebP) in `public/art/posters/`.
- **Episodes, cast or sets for a show:** add them under that show's slug in `extras` in `src/data/shows.ts`. `CODING_AGENT_PROMPT.md` has the step-by-step recipe for pulling these from Showrunner.

## Run

```bash
npm install
npm run dev                # local dev server
npm run typecheck
npm run build              # production build → dist/
npm run build:standalone   # regenerate standalone.html
```

Stack: Vite, React 19, TanStack Router (code-defined route tree in `src/router.tsx`) and TypeScript. The design system is described in `SITE.md`.

## standalone.html

`standalone.html` is the whole site in one file. `npm run build:standalone` builds it from the real app: the JS, CSS and every image are inlined, and routing uses the URL hash, so it works from any host or straight from disk. Regenerate it after any content change; don't edit it by hand. Music and episodes stream from the Media site and Showrunner, so they need an internet connection.

## Deploy

This folder is self-contained inside the notmyspace repo.

- **Live site (Site repo):** the Site repo already deploys to GitHub Pages on every push to `main`. The studio site lives there as `public/studios/index.html`, a copy of `standalone.html`, served at `https://hungryshmorez.github.io/Site/studios/`. To publish changes, run `npm run build:standalone`, copy `standalone.html` over `Site/public/studios/index.html`, and merge to Site's `main`.
- **GitHub Pages for this repo:** you can also turn on Pages here and open `that-time-again-studios/standalone.html`.
- **Vercel / Netlify:** import the repo, set the root directory to `that-time-again-studios`, build with `npm run build` and output to `dist`. `vercel.json` already rewrites every route to the app.

Hosts that block outside media, such as claude.ai artifact pages, can't stream the songs or episodes. There the theater, the Records page and the player bar point to the live site (`LIVE_URL` in `src/data/site.ts`) and to Showrunner.
