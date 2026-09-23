import { useRef, type ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import type { Episode, Show } from '../data/shows'
import { useTheater } from './Theater'

// A Netflix-style row: one line of cards that scrolls sideways, with arrows on wide screens.
export function Row({ title, label, id, wide, children }: { title: string; label?: string; id?: string; wide?: boolean; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null)
  const scroll = (direction: number) => {
    const el = track.current
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: 'smooth' })
  }

  return (
    <section className="row" id={id} aria-label={title}>
      <div className="row-head">
        <h3>{title}</h3>
        {label && <span className="label">{label}</span>}
        <div className="row-arrows">
          <button className="bar-button" onClick={() => scroll(-1)} aria-label={`Scroll ${title} left`}>‹</button>
          <button className="bar-button" onClick={() => scroll(1)} aria-label={`Scroll ${title} right`}>›</button>
        </div>
      </div>
      <div className={`row-track${wide ? ' row-track--wide' : ''}`} ref={track}>{children}</div>
    </section>
  )
}

export function PosterCard({ show }: { show: Show }) {
  return (
    <Link className="poster-card" to="/shows/$slug" params={{ slug: show.slug }}>
      <div className="poster"><img src={show.poster} alt={`${show.title} poster`} loading="lazy" /></div>
      <h3>{show.title}</h3>
      <span>{show.genre}{show.episodes?.length ? ` · ${show.episodes.length} episodes` : ''}</span>
    </Link>
  )
}

export function EpisodeCard({ episodes, index, showTitle }: { episodes: Episode[]; index: number; showTitle: string }) {
  const openTheater = useTheater()
  const episode = episodes[index]
  return (
    <button className="episode-tile" onClick={() => openTheater(episodes, index, showTitle)} aria-label={`Play ${episode.title}`}>
      <div className={`episode-still${episode.vertical ? ' episode-still--vertical' : ''}`}>
        <img src={episode.still} alt="" loading="lazy" />
        <span className="play-icon" aria-hidden="true" />
        {episode.duration && <span className="episode-duration">{episode.duration}</span>}
      </div>
      <span className="episode-tile-no">{episode.seasonEpisode}</span>
      <span className="episode-tile-title">{episode.title}</span>
    </button>
  )
}
