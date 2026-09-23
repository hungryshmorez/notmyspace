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
- `/` — logo hero, featured show, Browse (episode row + genre rows), Records,
  the label roster, Worlds & code (The Festival), studio table
- `/shows/$slug` — every show: poster hero, synopsis, spec table, more from the genre. Shows with a
  `heroStill` (That Time Again with Al & Sloppy) get the still as the hero, a sticky section bar, episodes, cast and sets.
- `/records` — every release per artist, loaded live from the Media manifest
- `/books` — the e-book library, one row per shelf

## Music player
`src/components/Player.tsx` owns a single `<audio>` for the whole site (`PlayerProvider` wraps the
app in `Shell.tsx`), so music keeps playing across routes. `usePlayer().play(queue, index)` starts a
queue; the bar at the bottom has prev / play-pause / next / seek and advances through the queue.
`src/data/catalog.ts` fetches `https://hungryshmorez.github.io/Media/manifest.json` once, groups an
artist's tracks by `album` (no album → Singles) and strips the "Artist — " prefix from titles.

## Episodes: the theater
`src/components/Theater.tsx` (`TheaterProvider` in `Shell.tsx`, `useTheater()` to open) plays an
episode's MP4 from Showrunner's CDN (`videoUrl` in `src/data/shows.ts`) in a modal `<dialog>`: large
16:9 screen (vertical episodes letterboxed), title, S/E, runtime, synopsis, previous / next, and
auto-advance on `ended`. If the video can't load, it shows the still with links to the live site and
Showrunner. `EpisodeCard` (in `Row.tsx`) is the landscape tile that opens it.

## Library
`src/data/books.ts` lists the 30 e-books (title, subtitle, shelf, description, page count, chapters from
each PDF's table of contents, cover, PDF URL, optional related `show` and `mature` flag). `Books.tsx`
has `BookCard` (a book-shaped cover tile) and `BookProvider` / `useBook()`, one `<dialog>` for the site
with cover, blurb, contents, Read / Download and an "On the slate" link to the related show. PDFs are
served from `LIVE_URL/books/<slug>.pdf` (Site repo). Show pages with a related book get a "Read the
book" row; the homepage has a "From the library" row.

## Browse rows
`src/components/Row.tsx` is the Netflix-style row: a single scroll-snapped line of cards that bleeds
to the page edge, with ‹ › buttons on wide screens (hidden on phones, where you swipe). The home page
builds a "Now streaming" row of episodes plus one row per genre with 3+ shows (largest first) and a
"More from the slate" row for the rest; show pages end with a "More <genre>" row.

## Label roster
`src/data/artists.ts` lists the Records artists (SHMOREZ, Tanky Johnson, DriftWave Static): bio (condensed
from each EPK), photo in `public/art/artists/`, a featured track, their `mediaFolder` in Media, and links
to their world and press kit on the festival site. `ArtistCard.tsx` plays the featured track through the
site-wide player and links to the full discography on `/records`. An artist can also have a `gallery`
(title + images, portrait tiles, stored in `public/art/artists/<slug>/`); `/records` shows it under the
artist's header and opens each image full size in a `<dialog>` (`Gallery.tsx`). SHMOREZ's is the
"Synthetic Human Protocol" set.

## Slate
`src/data/slate.ts` holds all 43 shows (title, genre, synopsis, poster). `src/data/shows.ts` merges in
`extras` for shows with more than a pitch, sorts That Time Again with Al & Sloppy first and the rest alphabetically, and
exports `genres` for the filter. Posters are 2:3 WebP (≤560px wide) in `public/art/posters/`.

## Commands
```bash
npm install
npm run typecheck
npm run build
npm run dev
npm run build:standalone   # regenerate standalone.html
```
