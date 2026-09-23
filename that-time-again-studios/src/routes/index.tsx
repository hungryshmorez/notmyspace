import { Link } from '@tanstack/react-router'
import { EpisodePlayer } from '../components/EpisodePlayer'
import { getShow, shows } from '../data/shows'

const FEATURED_EPISODES = [7, 11, 5, 1]

export function HomePage() {
  const flagship = getShow('al-and-sloppy')!
  const episodes = flagship.episodes ?? []
  const featured = FEATURED_EPISODES.map((n) => episodes.find((e) => e.number === n)).filter((e) => e !== undefined)

  return (
    <main>
      <section className="hero hero--brand">
        <img className="hero-texture" src="/brand/texture.webp" alt="" />
        <div className="hero-copy">
          <p className="label">Stories / Sounds / Worlds / Always</p>
          <h1><img className="hero-logo" src="/brand/studios-logo.webp" alt="That Time Again Studios" /></h1>
          <p className="hero-deck">Television, music, film, and strange worlds.</p>
          <a className="hero-link" href="#episodes">Watch the show <span>↓</span></a>
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
          <p className="label">Television / Music / Worlds</p>
        </div>
        <div className="slate-grid">
          {shows.map((show) => {
            const hasDetails =
              (show.episodes?.length ?? 0) > 0 ||
              (show.characters?.length ?? 0) > 0 ||
              (show.sets?.length ?? 0) > 0

            return (
              <article className="slate-card" key={show.slug}>
                <div className={`slate-art slate-art--${show.heroKind}`}>
                  {show.cardImage || show.heroStill ? (
                    <img src={show.cardImage ?? show.heroStill} alt="" loading="lazy" />
                  ) : show.heroKind === 'record' ? (
                    <div className="record-disc" />
                  ) : (
                    <div className="tv-screen">{show.slug === 'channel-86' ? '86' : 'TTA'}</div>
                  )}
                </div>
                <div className="slate-meta">
                  <h3>{show.title}</h3>
                  <span>{show.eyebrow}</span>
                </div>
                <p>{show.blurb}</p>
                {hasDetails && (
                  <Link className="text-link" to="/shows/$slug" params={{ slug: show.slug }}>
                    Episodes &amp; characters →
                  </Link>
                )}
              </article>
            )
          })}
        </div>
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
        </div>
      </section>

      <section className="section" id="studio">
        <div className="section-head">
          <h2>What we make.</h2>
          <p className="label">That Time Again Studios</p>
        </div>
        <dl className="spec-table">
          <div><dt>Production</dt><dd>Development, production and creative direction for film and television.</dd></div>
          <div><dt>Music</dt><dd>That Time Again Records — original recordings, soundtracks and artist collaboration.</dd></div>
          <div><dt>Worlds</dt><dd>Stories that spill across mediums: puppets, broken signals, strange humor and places that linger.</dd></div>
          <div><dt>Now showing</dt><dd>Al &amp; Sloppy, season one. Channel 86 in development.</dd></div>
        </dl>
      </section>

      <section className="closer">
        <img className="closer-texture" src="/brand/texture.webp" alt="" />
        <p className="label">Ideas in motion</p>
        <h2>Same stories.<br />Different light.</h2>
        <a className="button" href="#episodes">Start watching</a>
      </section>
    </main>
  )
}
