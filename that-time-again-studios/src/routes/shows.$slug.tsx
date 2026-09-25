import { useRef } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import { BookCard } from '../components/Books'
import { PosterCard, Row } from '../components/Row'
import { PlayTile, ShowPlayer, type Playable, type ShowPlayerHandle } from '../components/ShowPlayer'
import { books } from '../data/books'
import { clips } from '../data/clips'
import { getShow, shows, type GalleryItem } from '../data/shows'

const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

export function ShowDetailPage() {
  const { slug } = useParams({ from: '/shows/$slug' })
  const player = useRef<ShowPlayerHandle>(null)
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

  const episodes: Playable[] = (show.episodes ?? []).map((episode) => ({
    title: episode.title,
    label: [episode.seasonEpisode, episode.duration].filter(Boolean).join(' · '),
    synopsis: episode.synopsis,
    videoUrl: episode.videoUrl,
    still: episode.still,
    vertical: episode.vertical,
    sourceUrl: episode.showrunnerUrl,
  }))
  const showClips: Playable[] = (clips[show.slug] ?? []).map((clip) => ({
    title: clip.title,
    label: clip.seconds ? clock(clip.seconds) : undefined,
    synopsis: clip.description,
    videoUrl: clip.videoUrl,
    still: clip.thumb,
    vertical: clip.vertical,
    credit: clip.creator ? `Made by ${clip.creator}` : undefined,
  }))
  const first = episodes[0] ?? showClips[0]
  const characters = show.characters ?? []
  const sets = show.sets ?? []
  const related = shows.filter((s) => s.genre === show.genre && s.slug !== show.slug)
  const reading = books.filter((book) => book.show === show.slug)
  const playFirst = () => player.current?.play(episodes.length ? episodes : showClips, 0)

  return (
    <main>
      <section className={`hero hero--show${show.heroStill ? '' : ' hero--poster'}`}>
        <img className={show.heroStill ? 'hero-still' : 'hero-still hero-still--poster'} src={show.heroStill ?? show.poster} alt="" />
        <div className="hero-copy">
          <Link className="back-link" to="/" hash="browse">← All shows</Link>
          <p className="label">{show.genre} / {show.status}</p>
          <h1>{show.title}</h1>
          {first && (
            <button className="hero-link hero-link--button" onClick={playFirst}>
              {episodes.length > 1 ? 'Play from episode one' : episodes.length ? 'Play the episode' : 'Play the clips'} <span>▶</span>
            </button>
          )}
        </div>
        {!show.heroStill && <div className="poster hero-poster"><img src={show.poster} alt={`${show.title} poster`} /></div>}
        {show.heroCaption && <p className="hero-caption">{show.heroCaption}</p>}
      </section>

      {first && (
        <nav className="subnav" aria-label={`${show.title} sections`}>
          <span className="subnav-title">{show.title}</span>
          <div className="subnav-links">
            <a href="#watch">Watch</a>
            {episodes.length > 0 && <a href="#episodes">Episodes</a>}
            {showClips.length > 0 && <a href="#clips">Clips</a>}
            {characters.length > 0 && <a href="#characters">Characters</a>}
            {sets.length > 0 && <a href="#sets">Sets</a>}
          </div>
          <button className="button button--small" onClick={playFirst}>Play</button>
        </nav>
      )}

      {first && (
        <section className="section watch" id="watch">
          <ShowPlayer key={show.slug} ref={player} first={first} showTitle={show.title} />

          {episodes.length > 0 && (
            <div className="watch-list" id="episodes">
              <div className="row-head">
                <h3>Episodes</h3>
                <span className="label">{episodes.length} {episodes.length === 1 ? 'episode' : 'episodes'}</span>
              </div>
              <div className="episode-tile-grid">
                {episodes.map((item, i) => <PlayTile key={item.videoUrl} item={item} onPlay={() => player.current?.play(episodes, i)} />)}
              </div>
            </div>
          )}

          {showClips.length > 0 && (
            <div id="clips">
              <Row title="Clips" label={`${showClips.length} scenes`} wide>
                {showClips.map((item, i) => <PlayTile key={item.videoUrl} item={item} onPlay={() => player.current?.play(showClips, i)} />)}
              </Row>
            </div>
          )}
        </section>
      )}

      <section className={`section show-intro${show.heroStill ? '' : ' show-intro--text'}`}>
        {show.heroStill && <div className="poster show-poster"><img src={show.poster} alt={`${show.title} poster`} /></div>}
        <div>
          <p className="lede">{show.description}</p>
          <dl className="spec-table spec-table--compact">
            <div><dt>Genre</dt><dd>{show.genre}</dd></div>
            <div><dt>Status</dt><dd>{show.status}</dd></div>
            {episodes.length > 0 && <div><dt>Episodes</dt><dd>{episodes.length}</dd></div>}
            {showClips.length > 0 && <div><dt>Clips</dt><dd>{showClips.length}</dd></div>}
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
