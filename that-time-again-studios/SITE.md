# That Time Again Studios

Vite + React + TanStack Router site for That Time Again Studios.

## Visual system
The studio's own brand (logotypes, burnt film texture, cream-on-charcoal) set in the cinematic
product-page layout of gxace.com/simulacrum:
- brand assets in `public/brand/`: `studios-logo.webp` / `records-logo.webp` (transparent logotypes,
  lifted from the brand boards; `-small` versions for header/footer), `texture.webp` (the burnt film
  texture), `records-card.webp` (the Records board)
- warm charcoal (`#0d0c0a`), cream ink (`#efe6d6`, matches the logotypes), cream buttons
- the film texture behind the home hero, the Records band and the closing section
- animated film grain over everything (`src/components/Grain.tsx`) plus faint burnt edges (`.burn`);
  grain is static for `prefers-reduced-motion`
- huge, tightly tracked Helvetica headlines; small uppercase mono labels (IBM Plex Mono)
- rounded (14px) media cards with mono title + tag rows and hairline rules

## Routes
- `/` — logo hero, featured show, four embedded episodes, the slate, Records, studio table
- `/shows/al-and-sloppy` — hero, sticky section bar, all 11 episodes embedded, cast, sets

## Episode embeds
`src/components/EpisodePlayer.tsx` shows the episode still with a play button; pressing it swaps in a
`<video>` for the episode's MP4 on Showrunner's CDN (`videoUrl` in `src/data/shows.ts`). Nothing is
downloaded before play, and starting one episode pauses any other (`Shell.tsx`).

## Commands
```bash
npm install
npm run typecheck
npm run build
npm run dev
npm run build:standalone   # regenerate standalone.html
```
