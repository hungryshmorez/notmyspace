# Showrunner export

Everything public on the studio's Showrunner account (`showrunnerstudio.com/users/12matt3r`), pulled
from each show's public page, plus the IDs from the pasted "My Stuff" profile page.

| File | What it holds |
|------|---------------|
| `showrunner-export.json` | Everything below in one file, with a `counts` summary |
| `shows.csv` | 56 shows: name, genre, episode and scene counts, tagline, logline, id, slug, Showrunner URL, poster |
| `episodes.csv` | 68 episodes: show, season, episode, title, runtime, description, episode id, public URL, MP4 (`video_url`), HLS stream, still |
| `scenes.csv` | 402 scenes: show, title, length, creator, characters, set, description, the generation prompt, id, MP4, thumbnail |
| `characters.csv` | 388 characters per show: name, id, avatar |
| `sets.csv` | 154 sets per show: name, id, image |
| `profile-items.csv` | 221 items from the "My Stuff" page: episodes (`/app/episode/<uuid>`) and combines (`/app/combine/<number>`) with title, runtime and thumbnail |

Notes
- 47 of the 402 scenes were made by collaborators on these shows (w8wbg87r6f, Killerbrown, Michael Cole,
  StarJ64, dagarith); the `creator` column says who.
- Some scenes reference their characters/set indirectly in the page data. Characters for those were
  recovered from the prompt's `@Name` mentions; sets that couldn't be resolved are left blank.
- The combine numbers are the same numbers in the CDN paths of finished videos
  (`…/combines/<show-id>/<combine>/…`).
- Video and image URLs are Showrunner's public CDN links; they can change if something is re-rendered.

The site uses the episodes: `src/data/episodes.ts` (every slate show except That Time Again with
Al & Sloppy, whose episodes live in `src/data/shows.ts`). Five episodes belong to Showrunner shows that
aren't on the slate (The Daytime Talk Show, Robloxian Bachelor, G-O-D-Z-L-A-N-D, The Willow Drive
Tape) and aren't on the site.
