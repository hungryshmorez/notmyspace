import { useState } from 'react'
import type { Episode } from '../data/shows'

// Poster first; the Showrunner video only loads once someone presses play.
// If the browser or host can't load it, the card falls back to a link to Showrunner.
export function EpisodePlayer({ episode, showTitle }: { episode: Episode; showTitle: string }) {
  const [state, setState] = useState<'idle' | 'playing' | 'failed'>('idle')
  const label = [episode.seasonEpisode, episode.duration].filter(Boolean).join(' · ')

  return (
    <article className="episode-card">
      <div className={`player${episode.vertical ? ' player--vertical' : ''}`}>
        {state === 'playing' ? (
          <video
            src={episode.videoUrl}
            poster={episode.still}
            controls
            autoPlay
            playsInline
            preload="auto"
            onError={() => setState('failed')}
          />
        ) : state === 'failed' ? (
          <a className="player-poster player-poster--fallback" href={episode.showrunnerUrl} target="_blank" rel="noreferrer">
            <img src={episode.still} alt="" />
            <span className="player-fallback">Watch on Showrunner ↗</span>
          </a>
        ) : (
          <button className="player-poster" onClick={() => setState('playing')} aria-label={`Play ${episode.title}`}>
            <img src={episode.still} alt="" loading="lazy" />
            <span className="play-icon" aria-hidden="true" />
          </button>
        )}
      </div>
      <div className="episode-meta">
        <h3>{episode.title}</h3>
        <span>{label || showTitle}</span>
      </div>
      {episode.synopsis && <p className="episode-synopsis">{episode.synopsis}</p>}
      <a className="episode-source" href={episode.showrunnerUrl} target="_blank" rel="noreferrer">
        Open on Showrunner ↗
      </a>
    </article>
  )
}
