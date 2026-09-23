import { useEffect, useRef, useState } from 'react'
import type { Artist } from '../data/artists'

// Nothing streams until play is pressed; the Shell pauses any other video or track.
export function ArtistCard({ artist }: { artist: Artist }) {
  const audio = useRef<HTMLAudioElement>(null)
  const [state, setState] = useState<'idle' | 'playing' | 'paused' | 'failed'>('idle')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = audio.current
    if (!el) return
    const onTime = () => setProgress(el.duration ? el.currentTime / el.duration : 0)
    const onPause = () => setState((s) => (s === 'failed' ? s : 'paused'))
    const onPlay = () => setState('playing')
    const onError = () => setState('failed')
    el.addEventListener('timeupdate', onTime)
    el.addEventListener('pause', onPause)
    el.addEventListener('play', onPlay)
    el.addEventListener('error', onError)
    return () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('play', onPlay)
      el.removeEventListener('error', onError)
    }
  }, [])

  const toggle = () => {
    const el = audio.current
    if (!el) return
    if (state === 'playing') el.pause()
    else el.play().catch(() => setState('failed'))
  }

  return (
    <article className="artist-card">
      <div className="artist-photo"><img src={artist.photo} alt={artist.name} loading="lazy" /></div>
      <div className="slate-meta">
        <h3>{artist.name}</h3>
        <span>{artist.genre}</span>
      </div>
      <p className="artist-tagline">{artist.tagline}</p>
      <p className="artist-bio">{artist.bio}</p>
      <div className="track">
        <button className="track-button" onClick={toggle} disabled={state === 'failed'} aria-label={`${state === 'playing' ? 'Pause' : 'Play'} ${artist.track.title}`}>
          <span className={state === 'playing' ? 'icon-pause' : 'icon-play'} aria-hidden="true" />
        </button>
        <div className="track-info">
          <span className="track-title">{artist.track.title}</span>
          <span className="track-release">{state === 'failed' ? 'Can’t play here' : artist.track.release}</span>
          <span className="track-bar"><span style={{ transform: `scaleX(${progress})` }} /></span>
        </div>
        <audio ref={audio} src={artist.track.src} preload="none" />
      </div>
      {artist.onTheShow && <p className="artist-show">{artist.onTheShow}</p>}
    </article>
  )
}
