# Verification status

Run on Node 22 / npm 10 with the dependencies in `package-lock.json`:

- `npm run typecheck` (`tsc --noEmit`) — 0 errors
- `npm run build` (`tsc --noEmit && vite build`) — ok
- `npm run build:standalone` — ok, `standalone.html` ~2.6 MB, no external asset references

Checked in headless Chromium against `vite preview` and the standalone file:

- `/` renders the hero, featured show, 4 episode players, the slate and the studio table
- `/shows/al-and-sloppy` renders 11 episode players, 6 characters and 6 sets; every image loads
- `standalone.html`: navigation to the detail page works (hash routing), grain renders
- 390px-wide viewport: no horizontal scroll on either page

Episode video:
- no request goes to the video CDN until play is pressed; pressing play requests the right MP4
- all 11 MP4s are H.264 with the `moov` atom at the start (stream immediately) and the CDN answers
  range requests (206), so seeking works
- actual playback could not be observed here: the sandbox's Chromium build ships without the
  H.264 codec. Chrome, Safari, Edge and Firefox play H.264 — check playback once in a real browser.
