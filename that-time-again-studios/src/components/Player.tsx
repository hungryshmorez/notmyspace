import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import type { Track } from '../data/catalog'
import { LIVE_URL } from '../data/site'

type Player = {
  current?: Track
  playing: boolean
  failed: boolean
  isCurrent: (track: Track) => boolean
  play: (queue: Track[], index?: number) => void
  toggle: () => void
}

const PlayerContext = createContext<Player | null>(null)

export function usePlayer() {
  const player = useContext(PlayerContext)
  if (!player) throw new Error('usePlayer needs a PlayerProvider')
  return player
}

// One audio element for the whole site, so music keeps going between pages.
export function PlayerProvider({ children }: { children: ReactNode }) {
  const audio = useRef<HTMLAudioElement>(null)
  const [queue, setQueue] = useState<Track[]>([])
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)
  const [progress, setProgress] = useState(0)
  const current = queue[index]
  const hasNext = index < queue.length - 1

  // Load and start whichever track is current.
  useEffect(() => {
    const el = audio.current
    if (!el || !current) return
    setFailed(false)
    setProgress(0)
    el.src = current.src
    el.play().catch(() => {})
  }, [current])

  useEffect(() => {
    const el = audio.current
    if (!el) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onTime = () => setProgress(el.duration ? el.currentTime / el.duration : 0)
    const onError = () => {
      if (!el.getAttribute('src')) return
      setFailed(true)
      setPlaying(false)
    }
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    el.addEventListener('timeupdate', onTime)
    el.addEventListener('error', onError)
    return () => {
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('error', onError)
    }
  }, [])

  const isCurrent = (track: Track) => current?.src === track.src

  const toggle = () => {
    const el = audio.current
    if (!el || !current) return
    if (el.paused) el.play().catch(() => setFailed(true))
    else el.pause()
  }

  const play = (list: Track[], at = 0) => {
    if (isCurrent(list[at])) return toggle()
    setQueue(list)
    setIndex(at)
  }

  const step = (by: number) => {
    const el = audio.current
    if (by < 0 && el && el.currentTime > 3) {
      el.currentTime = 0
      return
    }
    setIndex((i) => Math.min(Math.max(i + by, 0), queue.length - 1))
  }

  const close = () => {
    audio.current?.pause()
    audio.current?.removeAttribute('src')
    setQueue([])
    setIndex(0)
  }

  const seek = (fraction: number) => {
    const el = audio.current
    if (el?.duration) el.currentTime = fraction * el.duration
  }

  return (
    <PlayerContext.Provider value={{ current, playing, failed, isCurrent, play, toggle }}>
      {children}
      <audio ref={audio} preload="none" onEnded={() => (hasNext ? setIndex(index + 1) : setPlaying(false))} />
      {current && (
        <div className="player-bar" role="region" aria-label="Now playing">
          <div className="player-bar-controls">
            <button className="bar-button" onClick={() => step(-1)} aria-label="Previous track">
              <span className="icon-prev" aria-hidden="true" />
            </button>
            <button className="track-button" onClick={toggle} disabled={failed} aria-label={playing ? 'Pause' : 'Play'}>
              <span className={playing ? 'icon-pause' : 'icon-play'} aria-hidden="true" />
            </button>
            <button className="bar-button" onClick={() => step(1)} disabled={!hasNext} aria-label="Next track">
              <span className="icon-next" aria-hidden="true" />
            </button>
          </div>
          <div className="player-bar-info">
            <span className="track-title">{current.title}</span>
            <span className="track-release">
              {failed ? <>Can’t play on this page — <a className="inline-link" href={LIVE_URL} target="_blank" rel="noreferrer">open the live site ↗</a></> : `${current.artist} · ${current.album}`}
            </span>
            <input
              className="player-seek"
              type="range"
              min={0}
              max={1000}
              value={Math.round(progress * 1000)}
              onChange={(event) => seek(Number(event.target.value) / 1000)}
              aria-label="Seek"
            />
          </div>
          <span className="player-bar-count">{index + 1} / {queue.length}</span>
          <button className="bar-button bar-close" onClick={close} aria-label="Close player">×</button>
        </div>
      )}
    </PlayerContext.Provider>
  )
}
