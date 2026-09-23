import { Link, useParams } from '@tanstack/react-router'
import { BookCard } from '../components/Books'
import { EpisodeCard, PosterCard, Row } from '../components/Row'
import { useTheater } from '../components/Theater'
import { books } from '../data/books'
import { getShow, shows, type GalleryItem } from '../data/shows'

export function ShowDetailPage() {
  const { slug } = useParams({ from: '/shows/$slug' })
  const openTheater = useTheater()
  const show = getShow(slug)

  if (!show) {
    return (
      <main className="missing">
        <p className="label">404 / Off the air</p>
        <h1>Show not found.</h1>
        <Link className="button" to="/" hash="browse">See every show</Link>
      </main>
    )
  }

  const episodes = show.episodes ?? []
  const characters = show.characters ?? []
  const sets = show.sets ?? []
  const first = episodes[0]
  const related = shows.filter((s) => s.genre === show.genre && s.slug !== show.slug)
  const playFirst = () => openTheater(episodes, 0, show.title)
  const reading = books.filter((book) => book.show === show.slug)

  return (
    <main>
      <section className={`hero hero--show${show.heroStill ? '' : ' hero--poster'}`}>
        <img className={show.heroStill ? 'hero-still' : 'hero-still hero-still--poster'} src={show.heroStill ?? show.poster} alt="" />
        <div className="hero-copy">
          <Link className="back-link" to="/" hash="browse">← All shows</Link>
          <p className="label">{show.genre} / {show.status}</p>
          <h1>{show.title}</h1>
          {first && <button className="hero-link hero-link--button" onClick={playFirst}>Play season one <span>▶</span></button>}
        </div>
        {!show.heroStill && <div className="poster hero-poster"><img src={show.poster} alt={`${show.title} poster`} /></div>}
        {show.heroCaption && <p className="hero-caption">{show.heroCaption}</p>}
      </section>

      {first && (
        <nav className="subnav" aria-label={`${show.title} sections`}>
          <span className="subnav-title">{show.title}</span>
          <div className="subnav-links">
            <a href="#episodes">Episodes</a>
            {characters.length > 0 && <a href="#characters">Characters</a>}
            {sets.length > 0 && <a href="#sets">Sets</a>}
          </div>
          <button className="button button--small" onClick={playFirst}>Play {first.seasonEpisode ?? 'episode one'}</button>
        </nav>
      )}

      <section className={`section show-intro${show.heroStill ? '' : ' show-intro--text'}`}>
        {show.heroStill && <div className="poster show-poster"><img src={show.poster} alt={`${show.title} poster`} /></div>}
        <div>
          <p className="lede">{show.description}</p>
          <dl className="spec-table spec-table--compact">
            <div><dt>Genre</dt><dd>{show.genre}</dd></div>
            <div><dt>Status</dt><dd>{show.status}</dd></div>
            {episodes.length > 0 && <div><dt>Episodes</dt><dd>{episodes.length}, season one</dd></div>}
            {episodes.length > 0 && <div><dt>Streaming</dt><dd>Right here, and on Showrunner</dd></div>}
          </dl>
        </div>
      </section>

      {reading.length > 0 && (
        <div className="section">
          <Row title={reading.length === 1 ? 'Read the book' : 'Read the books'} label={`${reading.length} from the library`}>
            {reading.map((book) => <BookCard key={book.slug} book={book} />)}
          </Row>
        </div>
      )}

      {episodes.length > 0 && (
        <section className="section" id="episodes">
          <div className="section-head">
            <h2>Season one.</h2>
            <p className="label">{episodes.length} episodes</p>
          </div>
          <div className="episode-tile-grid">
            {episodes.map((episode, i) => <EpisodeCard key={episode.number} episodes={episodes} index={i} showTitle={show.title} />)}
          </div>
        </section>
      )}

      {characters.length > 0 && (
        <section className="section" id="characters">
          <div className="section-head">
            <h2>The cast.</h2>
            <p className="label">{characters.length} characters</p>
          </div>
          <div className="asset-grid">
            {characters.map((item) => <AssetCard key={item.name} {...item} />)}
          </div>
        </section>
      )}

      {sets.length > 0 && (
        <section className="section" id="sets">
          <div className="section-head">
            <h2>The sets.</h2>
            <p className="label">{sets.length} locations</p>
          </div>
          <div className="asset-grid">
            {sets.map((item) => <AssetCard key={item.name} {...item} />)}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <div className="section">
          <Row title={`More ${show.genre.toLowerCase()}`} label={`${related.length} shows`}>
            {related.map((s) => <PosterCard key={s.slug} show={s} />)}
          </Row>
          <Link className="text-link section-foot" to="/" hash="browse">Browse all {shows.length} shows →</Link>
        </div>
      )}
    </main>
  )
}

function AssetCard({ name, role, image, description }: GalleryItem) {
  return (
    <article className="asset-card">
      <div className="asset-image"><img src={image} alt={name} loading="lazy" /></div>
      <div className="slate-meta">
        <h3>{name}</h3>
      </div>
      {role && <p className="asset-role">{role}</p>}
      {description && <p>{description}</p>}
    </article>
  )
}
