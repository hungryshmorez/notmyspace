# That Time Again Studios

Vite + React + TanStack Router site for That Time Again Studios.

## Visual system
The studio's own brand (logotypes, burnt film texture, cream-on-charcoal) set in the cinematic
product-page layout of gxace.com/simulacrum:
- brand assets in `public/brand/`: `studios-logo.webp` / `records-logo.webp` (transparent logotypes,
  lifted from the brand boards; `-small` versions for header/footer), `texture.webp` (the burnt film
  texture)
- warm charcoal (`#0d0c0a`), cream ink (`#efe6d6`, matches the logotypes), cream buttons
- the film texture behind the home hero, the Records band and the closing section
- animated film grain over everything (`src/components/Grain.tsx`) plus faint burnt edges (`.burn`);
  grain is static for `prefers-reduced-motion`
- huge, tightly tracked Helvetica headlines; small uppercase mono labels (IBM Plex Mono)
- rounded (14px) media cards with mono title + tag rows and hairline rules

## Routes
- `/` — logo hero, featured show, four embedded episodes, the slate (poster wall + genre filter), Records,
  the label roster, Worlds & code (The Festival), studio table
- `/shows/$slug` — every show: poster hero, synopsis, spec table, more from the genre. Shows with a
  `heroStill` (Al & Sloppy) get the still as the hero, a sticky section bar, episodes, cast and sets.
- `/records` — every release per artist, loaded live from the Media manifest

## Music player
`src/components/Player.tsx` owns a single `<audio>` for the whole site (`PlayerProvider` wraps the
app in `Shell.tsx`), so music keeps playing across routes. `usePlayer().play(queue, index)` starts a
queue; the bar at the bottom has prev / play-pause / next / seek and advances through the queue.
`src/data/catalog.ts` fetches `https://hungryshmorez.github.io/Media/manifest.json` once, groups an
artist's tracks by `album` (no album → Singles) and strips the "Artist — " prefix from titles.

## Episode embeds
`src/components/EpisodePlayer.tsx` shows the episode still with a play button; pressing it swaps in a
`<video>` for the episode's MP4 on Showrunner's CDN (`videoUrl` in `src/data/shows.ts`). Nothing is
downloaded before play, and starting one episode pauses any other (`Shell.tsx`).

## Label roster
`src/data/artists.ts` lists the Records artists (SHMOREZ, Tanky Johnson, DriftWave Static): bio (condensed
from each EPK), photo in `public/art/artists/`, a featured track, their `mediaFolder` in Media, and links
to their world and press kit on the festival site. `ArtistCard.tsx` plays the featured track through the
site-wide player and links to the full discography on `/records`.

## Slate
`src/data/slate.ts` holds all 43 shows (title, genre, synopsis, poster). `src/data/shows.ts` merges in
`extras` for shows with more than a pitch, sorts Al & Sloppy first and the rest alphabetically, and
exports `genres` for the filter. Posters are 2:3 WebP (≤560px wide) in `public/art/posters/`.

## Commands
```bash
npm install
npm run typecheck
npm run build
npm run dev
npm run build:standalone   # regenerate standalone.html
```
