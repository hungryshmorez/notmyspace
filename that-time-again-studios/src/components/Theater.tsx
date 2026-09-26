import { createContext, useContext, useRef, useState, type ReactNode } from 'react'
import type { Episode } from '../data/shows'
import { LIVE_URL } from '../data/site'

type Session = { episodes: Episode[]; index: number; showTitle: string }

const TheaterContext = createContext<((episodes: Episode[], index: number, showTitle: string) => void) | null>(null)

export function useTheater() {
  const open = useContext(TheaterContext)
  if (!open) throw new Error('useTheater needs a TheaterProvider')
  return open
}

// Episodes play here, in a big player over the page, and roll on to the next one.
// The <video> stays mounted so a tap can start it directly (iOS Safari only plays
// sound when play() runs inside the user's gesture).
export function TheaterProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [failed, setFailed] = useState(false)

  const load = (next: Session) => {
    const episode = next.episodes[next.index]
    setSession(next)
    setFailed(false)
    const el = video.current
    if (!el || !episode) return
    el.poster = episode.still
    el.src = episode.videoUrl
    el.play().catch(() => {}) // if the browser refuses autoplay, the controls are right there
  }

  const open = (episodes: Episode[], index: number, showTitle: string) => {
    if (!dialog.current?.open) dialog.current?.showModal()
    load({ episodes, index, showTitle })
  }

  const go = (index: number) => session && load({ ...session, index })

  const close = () => {
    video.current?.pause()
    video.current?.removeAttribute('src')
    video.current?.load()
    setSession(null)
  }

  const episode = session?.episodes[session.index]
  const hasPrev = !!session && session.index > 0
  const hasNext = !!session && session.index < session.episodes.length - 1

  return (
    <TheaterContext.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        className="theater"
        aria-label="Episode player"
        onClose={close}
        onClick={(event) => event.target === dialog.current && dialog.current.close()}
      >
        <div className="theater-inner">
          <div className="theater-top">
            <span className="label">
              {session && episode ? `${session.showTitle} / ${episode.seasonEpisode ?? `Episode ${episode.number}`}` : ''}
            </span>
            <button className="bar-button" onClick={() => dialog.current?.close()} aria-label="Close player">×</button>
          </div>
          <div className={`theater-screen${episode?.vertical ? ' theater-screen--vertical' : ''}`}>
            <video
              ref={video}
              controls
              playsInline
              preload="none"
              hidden={failed}
              onError={() => video.current?.getAttribute('src') && setFailed(true)}
              onEnded={() => hasNext && session && go(session.index + 1)}
            />
            {failed && episode && (
              <div className="theater-fallback">
                <img src={episode.still} alt="" />
                <div>
                  <p>This episode can’t play on this page — the host blocks outside video.</p>
                  <div className="actions">
                    <a className="button" href={LIVE_URL} target="_blank" rel="noreferrer">Watch on the live site ↗</a>
                    <a className="text-link" href={episode.showrunnerUrl} target="_blank" rel="noreferrer">Watch on Showrunner ↗</a>
                  </div>
                </div>
              </div>
            )}
          </div>
          {session && episode && (
            <div className="theater-meta">
              <div>
                <h2>{episode.title}</h2>
                <p className="label">{[episode.seasonEpisode, episode.duration].filter(Boolean).join(' · ')}</p>
                {episode.synopsis && <p className="theater-synopsis">{episode.synopsis}</p>}
              </div>
              <div className="theater-nav">
                <button className="button button--ghost" onClick={() => go(session.index - 1)} disabled={!hasPrev}>← Previous</button>
                <button className="button" onClick={() => go(session.index + 1)} disabled={!hasNext}>Next episode →</button>
              </div>
            </div>
          )}
        </div>
      </dialog>
    </TheaterContext.Provider>
  )
}
