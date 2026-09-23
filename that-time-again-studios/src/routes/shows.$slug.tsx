import { Link, useParams } from '@tanstack/react-router'
import { EpisodePlayer } from '../components/EpisodePlayer'
import { getShow, type GalleryItem } from '../data/shows'

export function ShowDetailPage() {
  const { slug } = useParams({ from: '/shows/$slug' })
  const show = getShow(slug)

  if (!show) {
    return (
      <main className="missing">
        <p className="label">404 / Off the air</p>
        <h1>Show not found.</h1>
        <Link className="button" to="/">Back to the studio</Link>
      </main>
    )
  }

  const episodes = show.episodes ?? []
  const characters = show.characters ?? []
  const sets = show.sets ?? []
  const first = episodes[0]

  return (
    <main>
      <section className={`hero hero--show${show.heroStill ? '' : ' hero--plain'}`}>
        {show.heroStill && <img className="hero-still" src={show.heroStill} alt="" />}
        <div className="hero-copy">
          <Link className="back-link" to="/" hash="slate">← The slate</Link>
          <h1>{show.title}</h1>
          {episodes.length > 0 && <a className="hero-link" href="#episodes">Watch season one <span>↓</span></a>}
        </div>
        {show.heroCaption && <p className="hero-caption">{show.heroCaption}</p>}
      </section>

      <nav className="subnav" aria-label={`${show.title} sections`}>
        <span className="subnav-title"><span className="label">{show.eyebrow}</span> {show.title}</span>
        <div className="subnav-links">
          {episodes.length > 0 && <a href="#episodes">Episodes</a>}
          {characters.length > 0 && <a href="#characters">Characters</a>}
          {sets.length > 0 && <a href="#sets">Sets</a>}
        </div>
        {first && <a className="button button--small" href="#episodes">Watch {first.seasonEpisode ?? 'episode one'}</a>}
      </nav>

      <section className="section show-intro">
        <p className="lede">{show.longDescription}</p>
        <dl className="spec-table spec-table--compact">
          <div><dt>Format</dt><dd>{show.eyebrow.toLowerCase()}</dd></div>
          <div><dt>Status</dt><dd>{show.status.toLowerCase()}</dd></div>
          {episodes.length > 0 && <div><dt>Episodes</dt><dd>{episodes.length}, season one</dd></div>}
          {episodes.length > 0 && <div><dt>Streaming</dt><dd>Showrunner</dd></div>}
        </dl>
      </section>

      {episodes.length > 0 && (
        <section className="section" id="episodes">
          <div className="section-head">
            <h2>Season one.</h2>
            <p className="label">{episodes.length} episodes</p>
          </div>
          <div className="episode-grid">
            {episodes.map((episode) => <EpisodePlayer key={episode.number} episode={episode} showTitle={show.title} />)}
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
