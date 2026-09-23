# Coding Agent Prompt — That Time Again Studios

Maintain this project as a complete, reproducible Vite + React + TanStack Router application.

## Non-negotiables
1. Preserve the visual system described in SITE.md (brand logotypes + burnt film texture, warm charcoal and cream, animated grain, tight Helvetica headlines, mono labels, rounded media cards). Never re-type the logo in a font; use the images in public/brand/.
2. Do not replace the site with a generic white SaaS layout.
3. Never hand-edit standalone.html; regenerate it with `npm run build:standalone`.
4. Always call the show by its full name, "That Time Again with Al & Sloppy" (never just "Al & Sloppy"). Keep its detail content: 11 episodes, 6 characters, 6 sets. Keep all 43 shows on the slate with their posters.
5. Never use truthy numeric lengths to conditionally render links. Use explicit `> 0` checks.
6. The project must remain runnable from the delivered root with `npm install && npm run build`.
7. Do not hand-edit generated router output. This rebuild uses a code-defined route tree in `src/router.tsx`, so there is no generated route tree to maintain.
8. Local image assets belong in `public/art`.
9. Before claiming success, run `npm run typecheck` and `npm run build`.
10. Never invent episode, character or set data. If real data isn't available, leave the array empty.
11. After content changes, run `npm run build:standalone` so `standalone.html` stays in sync.

## Adding another show's episodes / characters / sets

Data lives in `src/data/shows.ts`. Given a show's Showrunner page source:

1. Episodes: for each episode, take its title, season/episode label (e.g. `S1 E5`), runtime and
   description, and build the URL as
   `https://www.showrunnerstudio.com/shows/<show-slug>/episodes?episode=<episode-uuid>`.
   Number them in broadcast order. Omit `synopsis` when there is no description; don't write filler.
   The page source also holds each episode's JSON object (`"id":"<episode-uuid>"`): take `video_url`
   as `videoUrl` and download `preview_image_url` as the still, converted to WebP at
   `public/art/episodes/<show-slug>-s1eNN.webp`. Set `vertical: true` for 9:16 episodes.
   Match on the episode id — never on proximity in the HTML, neighbouring episodes get mixed up.
2. Characters and sets: dedupe by name. Download each avatar / set image, convert to WebP
   (~800px wide) and save as `public/art/<characters|sets>/<kebab-name>.webp`; reference it as
   `/art/characters/<kebab-name>.webp`. If several shows get galleries, move to per-show folders
   (`public/art/<show-slug>/...`) to avoid filename clashes.
3. Shape (see That Time Again with Al & Sloppy for a complete example):
   `{ number, title, seasonEpisode?, duration?, synopsis?, showrunnerUrl, videoUrl, still, vertical? }` for episodes,
   `{ name, role?, image, description? }` for characters and sets.
4. The homepage card link and the detail sections appear automatically once any array is non-empty.

## Adding an artist to the label
Add an entry to `src/data/artists.ts`: bio from the artist's EPK (condensed, not invented), a square
WebP photo (~900px) in `public/art/artists/<slug>.webp`, `mediaFolder` (their folder under `music/` in
the Media repo — their whole catalog then appears on /records from the live manifest), a featured
track whose `src` is a file in Media served at `https://hungryshmorez.github.io/Media/music/...`
(URL-encode spaces and apostrophes, and confirm it returns audio), and links to their festival world
and EPK on `https://hungryshmorez.github.io/Site/`.

Never copy the music catalog into this repo: it is read live from the Media manifest.

## Adding an e-book
1. Render page 1 of the PDF as the cover (e.g. PyMuPDF at ~110 dpi, then WebP ≤480px wide) into
   `public/art/books/<slug>.webp`.
2. Pull the chapter titles from the book's table of contents (the "Chapter N" lines on pages 2–4).
3. Add the entry to `src/data/books.ts`; write the description from the book itself, never invent plot.
4. Copy the PDF to the Site repo as `public/studios/books/<slug>.pdf` (that's where `pdf()` points).

