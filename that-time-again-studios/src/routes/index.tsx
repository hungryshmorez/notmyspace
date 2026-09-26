import { Link } from '@tanstack/react-router'
import { ArtistCard } from '../components/ArtistCard'
import { BookCard } from '../components/Books'
import { EpisodeCard, PosterCard, Row } from '../components/Row'
import { useTheater } from '../components/Theater'
import { artists, FESTIVAL } from '../data/artists'
import { books } from '../data/books'
import { genres, getShow, shows } from '../data/shows'

// Genres with a few shows get their own row; the one-offs share a row at the end.
const ROW_MIN = 3

const WORLDS = [
  { name: 'SHMOREZ', where: 'In the pit, front-left', url: `${FESTIVAL}shmorez.html` },
  { name: 'DriftWave Static', where: 'The chill zone', url: `${FESTIVAL}driftwave.html` },
  { name: 'Tanky Johnson', where: 'Holding the right flank', url: `${FESTIVAL}tanky.html` },
  { name: 'The Codex', where: 'The festival’s encyclopedia', url: `${FESTIVAL}codex.html` },
]

export function HomePage() {
  const flagship = getShow('al-and-sloppy')!
  const openTheater = useTheater()
  const episodes = flagship.episodes ?? []
  const byGenre = (genre: string) => shows.filter((show) => show.genre === genre)
  const genreRows = genres.filter((g) => byGenre(g).length >= ROW_MIN).sort((a, b) => byGenre(b).length - byGenre(a).length)
  const oneOffs = shows.filter((show) => byGenre(show.genre).length < ROW_MIN)
  const streaming = shows.filter((show) => show.slug !== flagship.slug && (show.episodes?.length ?? 0) > 0)
  const episodeCount = shows.reduce((sum, show) => sum + (show.episodes?.length ?? 0), 0)

  return (
    <main>
      <section className="hero hero--brand">
        <img className="hero-texture" src="/brand/texture.webp" alt="" />
        <div className="hero-copy">
          <p className="label">Stories / Sounds / Worlds / Code</p>
          <h1><img className="hero-logo" src="/brand/studios-logo.webp" alt="That Time Again Studios" /></h1>
          <p className="hero-deck">Television, music, film, code, and strange worlds.</p>
          <a className="hero-link" href="#browse">Start watching <span>↓</span></a>
        </div>
        <p className="hero-caption">Same stories / Different light</p>
      </section>

      <section className="feature">
        <div className="feature-art">
          <img src="/art/episodes/s1e08.webp" alt="That Time Again with Al & Sloppy title card" />
        </div>
        <div className="feature-copy">
          <p className="label">Original series / {flagship.status}</p>
          <h2>That Time Again <span className="feature-title-with">with Al &amp; Sloppy</span></h2>
          <p className="lede">{flagship.blurb} The Showrunner keeps the content machine alive while Buffer reports from places nobody should have sent him.</p>
          <hr />
          <p className="label">Season one</p>
          <p className="fine">{episodes.length} episodes, streaming from Showrunner. Six characters, six sets, one couch that has seen things.</p>
          <div className="actions">
            <button className="button" onClick={() => openTheater(episodes, 0, flagship.title)}>Watch episode one</button>
            <Link className="text-link" to="/shows/$slug" params={{ slug: flagship.slug }}>Episodes &amp; characters →</Link>
          </div>
        </div>
      </section>

      <section className="section browse" id="browse">
        <div className="section-head">
          <h2>Browse.</h2>
          <p className="label">{shows.length} shows / {episodeCount} episodes streaming</p>
        </div>
        <Row id="episodes" title="Now streaming — That Time Again with Al & Sloppy" label="Season one" wide>
          {episodes.map((episode, i) => <EpisodeCard key={episode.number} episodes={episodes} index={i} showTitle={flagship.title} />)}
        </Row>
        <Row title="Streaming across the slate" label={`${streaming.length} more shows with episodes`} wide>
          {streaming.map((show) => <EpisodeCard key={show.slug} episodes={show.episodes!} index={0} showTitle={show.title} showLabel />)}
        </Row>
        {genreRows.map((genre) => (
          <Row key={genre} title={genre} label={`${byGenre(genre).length} shows`}>
            {byGenre(genre).map((show) => <PosterCard key={show.slug} show={show} />)}
          </Row>
        ))}
        <Row title="More from the slate" label="Action, crime, romance, westerns and more">
          {oneOffs.map((show) => <PosterCard key={show.slug} show={show} />)}
        </Row>
      </section>

      <section className="section library-teaser" id="books">
        <div className="section-head">
          <h2>The library.</h2>
          <Link className="text-link" to="/books">All {books.length} e-books →</Link>
        </div>
        <Row title="From the library" label="Read online or download">
          {books.map((book) => <BookCard key={book.slug} book={book} />)}
        </Row>
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
          <div><dt>Television</dt><dd>{shows.length} shows on the slate, {streaming.length + 1} of them with episodes streaming right here, led by That Time Again with Al &amp; Sloppy.</dd></div>
          <div><dt>Music</dt><dd>That Time Again Records — SHMOREZ, Tanky Johnson and DriftWave Static, with full catalogs on <Link className="inline-link" to="/records">the Records page</Link>.</dd></div>
          <div><dt>Code</dt><dd>Interactive worlds, web apps and games: <a className="inline-link" href={FESTIVAL} target="_blank" rel="noreferrer">The Festival</a>, the DreamOS web-OS, the Wake Up game series, and this site. Source on <a className="inline-link" href="https://github.com/12Matt3r" target="_blank" rel="noreferrer">GitHub</a>.</dd></div>
          <div><dt>Books</dt><dd>{books.length} e-books: novels from the same worlds as the shows, horror, strange fiction and field guides, in <Link className="inline-link" to="/books">the library</Link>.</dd></div>
          <div><dt>Store</dt><dd>Merch, prints and commissions on Etsy, collectibles, and a tip jar — all in <Link className="inline-link" to="/store">the store</Link>.</dd></div>
          <div><dt>Worlds</dt><dd>Stories that spill across mediums: puppets, broken signals, strange humor and places that linger.</dd></div>
        </dl>
      </section>

      <section className="closer">
        <img className="closer-texture" src="/brand/texture.webp" alt="" />
        <p className="label">Ideas in motion</p>
        <h2>Same stories.<br />Different light.</h2>
        <a className="button" href="#browse">Start browsing</a>
      </section>
    </main>
  )
}
