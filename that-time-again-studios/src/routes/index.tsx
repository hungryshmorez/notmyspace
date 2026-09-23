import { Link } from '@tanstack/react-router'
import { ArtistCard } from '../components/ArtistCard'
import { EpisodePlayer } from '../components/EpisodePlayer'
import { PosterWall } from '../components/PosterWall'
import { artists, FESTIVAL } from '../data/artists'
import { getShow, shows } from '../data/shows'

const FEATURED_EPISODES = [7, 11, 5, 1]

const WORLDS = [
  { name: 'SHMOREZ', where: 'In the pit, front-left', url: `${FESTIVAL}shmorez.html` },
  { name: 'DriftWave Static', where: 'The chill zone', url: `${FESTIVAL}driftwave.html` },
  { name: 'Tanky Johnson', where: 'Holding the right flank', url: `${FESTIVAL}tanky.html` },
  { name: 'The Codex', where: 'The festival’s encyclopedia', url: `${FESTIVAL}codex.html` },
]

export function HomePage() {
  const flagship = getShow('al-and-sloppy')!
  const episodes = flagship.episodes ?? []
  const featured = FEATURED_EPISODES.map((n) => episodes.find((e) => e.number === n)).filter((e) => e !== undefined)

  return (
    <main>
      <section className="hero hero--brand">
        <img className="hero-texture" src="/brand/texture.webp" alt="" />
        <div className="hero-copy">
          <p className="label">Stories / Sounds / Worlds / Code</p>
          <h1><img className="hero-logo" src="/brand/studios-logo.webp" alt="That Time Again Studios" /></h1>
          <p className="hero-deck">Television, music, film, code, and strange worlds.</p>
          <a className="hero-link" href="#slate">See all {shows.length} shows <span>↓</span></a>
        </div>
        <p className="hero-caption">Same stories / Different light</p>
      </section>

      <section className="feature">
        <div className="feature-art">
          <img src="/art/episodes/s1e08.webp" alt="That Time Again with Al & Sloppy title card" />
        </div>
        <div className="feature-copy">
          <p className="label">Original series / {flagship.status}</p>
          <h2>Al &amp; Sloppy</h2>
          <p className="lede">{flagship.blurb} The Showrunner keeps the content machine alive while Buffer reports from places nobody should have sent him.</p>
          <hr />
          <p className="label">Season one</p>
          <p className="fine">{episodes.length} episodes, streaming from Showrunner. Six characters, six sets, one couch that has seen things.</p>
          <div className="actions">
            <a className="button" href="#episodes">Watch episode one</a>
            <Link className="text-link" to="/shows/$slug" params={{ slug: flagship.slug }}>Episodes &amp; characters →</Link>
          </div>
        </div>
      </section>

      <section className="section" id="episodes">
        <div className="section-head">
          <h2>Now playing.</h2>
          <p className="label">Al &amp; Sloppy / Season one</p>
        </div>
        <p className="section-intro">Pulled straight from the broadcast. Press play on any episode — nothing loads from Showrunner until you do.</p>
        <div className="episode-grid">
          {featured.map((episode) => <EpisodePlayer key={episode.number} episode={episode} showTitle={flagship.title} />)}
        </div>
        <Link className="text-link section-foot" to="/shows/$slug" params={{ slug: flagship.slug }}>All {episodes.length} episodes →</Link>
      </section>

      <section className="section" id="slate">
        <div className="section-head">
          <h2>The slate.</h2>
          <p className="label">{shows.length} shows in development</p>
        </div>
        <p className="section-intro">Every show on the studio’s board — horror, anime, westerns, puppet comedies and whatever Scrambled Porn is. Pick a genre, or open any poster for the full pitch.</p>
        <PosterWall />
      </section>

      <section className="records-band" id="records">
        <img className="records-texture" src="/brand/texture.webp" alt="" />
        <div className="records-inner">
          <svg className="records-disc" viewBox="0 0 200 100" aria-hidden="true">
            <path d="M10 100a90 90 0 0 1 90-90v90z" fill="currentColor" opacity="0.28" />
            {[18, 30, 42, 54, 66, 78, 90].map((r) => (
              <path key={r} d={`M100 ${100 - r}a${r} ${r} 0 0 1 ${r} ${r}`} fill="none" stroke="currentColor" strokeWidth="1" opacity="0.7" />
            ))}
          </svg>
          <h2><img className="records-logo" src="/brand/records-logo.webp" alt="That Time Again Records" /></h2>
          <p>Original recordings, soundtracks and experiments from the studio universe — songs for whatever comes next.</p>
          <Link className="button records-cta" to="/records">Hear the whole catalog</Link>
        </div>
      </section>

      <section className="section roster">
        <div className="section-head">
          <h2>On the label.</h2>
          <p className="label">That Time Again Records / {artists.length} artists</p>
        </div>
        <div className="artist-grid">
          {artists.map((artist) => <ArtistCard key={artist.slug} artist={artist} />)}
        </div>
      </section>

      <section className="section" id="worlds">
        <div className="section-head">
          <h2>We build worlds too.</h2>
          <p className="label">Code / Interactive / Real-time 3D</p>
        </div>
        <div className="world-feature">
          <a className="world-shot" href={FESTIVAL} target="_blank" rel="noreferrer">
            <img src="/art/worlds/festival.webp" alt="The Festival at sunset: neon light poles, a stage screen and the crowd barrier" loading="lazy" />
            <span className="world-badge">Live in your browser</span>
          </a>
          <div>
            <p className="label">The Festival</p>
            <h3 className="world-title">A night festival you can walk through.</h3>
            <p className="fine">Our own world, coded from scratch in Three.js. Spawn on a bench at the edge of the crowd, walk the grounds, and reach an artist to step into their world — SHMOREZ in the pit, DriftWave Static in the chill zone, Tanky Johnson on the right flank.</p>
            <div className="actions">
              <a className="button" href={FESTIVAL} target="_blank" rel="noreferrer">Enter the festival ↗</a>
            </div>
          </div>
        </div>
        <ul className="world-links">
          {WORLDS.map((world) => (
            <li key={world.name}>
              <a href={world.url} target="_blank" rel="noreferrer">
                <span className="world-name">{world.name} ↗</span>
                <span className="label">{world.where}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" id="studio">
        <div className="section-head">
          <h2>What we make.</h2>
          <p className="label">That Time Again Studios</p>
        </div>
        <dl className="spec-table">
          <div><dt>Television</dt><dd>{shows.length} shows in development. Al &amp; Sloppy, season one, streaming now.</dd></div>
          <div><dt>Music</dt><dd>That Time Again Records — SHMOREZ, Tanky Johnson and DriftWave Static, with full catalogs on <Link className="inline-link" to="/records">the Records page</Link>.</dd></div>
          <div><dt>Code</dt><dd>Interactive worlds, web apps and games: <a className="inline-link" href={FESTIVAL} target="_blank" rel="noreferrer">The Festival</a>, the DreamOS web-OS, the Wake Up game series, and this site. Source on <a className="inline-link" href="https://github.com/12Matt3r" target="_blank" rel="noreferrer">GitHub</a>.</dd></div>
          <div><dt>Worlds</dt><dd>Stories that spill across mediums: puppets, broken signals, strange humor and places that linger.</dd></div>
        </dl>
      </section>

      <section className="closer">
        <img className="closer-texture" src="/brand/texture.webp" alt="" />
        <p className="label">Ideas in motion</p>
        <h2>Same stories.<br />Different light.</h2>
        <a className="button" href="#slate">Start with the slate</a>
      </section>
    </main>
  )
}
