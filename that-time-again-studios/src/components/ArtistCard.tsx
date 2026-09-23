import { Link } from '@tanstack/react-router'
import type { Artist } from '../data/artists'
import { usePlayer } from './Player'

export function ArtistCard({ artist }: { artist: Artist }) {
  const player = usePlayer()
  const track = { title: artist.track.title, artist: artist.name, album: artist.track.release, src: artist.track.src }
  const active = player.isCurrent(track)
  const playing = active && player.playing

  return (
    <article className="artist-card">
      <div className="artist-photo"><img src={artist.photo} alt={artist.name} loading="lazy" /></div>
      <div className="slate-meta">
        <h3>{artist.name}</h3>
        <span>{artist.genre}</span>
      </div>
      <p className="artist-tagline">{artist.tagline}</p>
      <p className="artist-bio">{artist.bio}</p>
      <div className={`track${active ? ' track--active' : ''}`}>
        <button className="track-button" onClick={() => player.play([track])} aria-label={`${playing ? 'Pause' : 'Play'} ${track.title}`}>
          <span className={playing ? 'icon-pause' : 'icon-play'} aria-hidden="true" />
        </button>
        <div className="track-info">
          <span className="track-title">{track.title}</span>
          <span className="track-release">{track.album}</span>
        </div>
      </div>
      <div className="artist-links">
        <Link className="text-link" to="/records" hash={artist.slug}>Full discography →</Link>
        {artist.onTheShow && <span className="artist-show">{artist.onTheShow}</span>}
      </div>
    </article>
  )
}
