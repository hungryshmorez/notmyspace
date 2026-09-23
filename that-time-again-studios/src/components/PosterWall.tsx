import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { genres, shows, type Show } from '../data/shows'

export function PosterWall() {
  const [genre, setGenre] = useState<string | null>(null)
  const visible = genre ? shows.filter((show) => show.genre === genre) : shows

  return (
    <>
      <div className="genre-filter" role="group" aria-label="Filter by genre">
        <button aria-pressed={genre === null} onClick={() => setGenre(null)}>All <span>{shows.length}</span></button>
        {genres.map((g) => (
          <button key={g} aria-pressed={genre === g} onClick={() => setGenre(g)}>
            {g} <span>{shows.filter((show) => show.genre === g).length}</span>
          </button>
        ))}
      </div>
      <div className="poster-grid">
        {visible.map((show) => <PosterCard key={show.slug} show={show} />)}
      </div>
    </>
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
