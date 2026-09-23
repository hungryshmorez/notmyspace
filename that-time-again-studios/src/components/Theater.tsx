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
export function TheaterProvider({ children }: { children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [failed, setFailed] = useState(false)

  const open = (episodes: Episode[], index: number, showTitle: string) => {
    setSession({ episodes, index, showTitle })
    setFailed(false)
    if (!dialog.current?.open) dialog.current?.showModal()
  }

  const go = (index: number) => {
    setSession((s) => (s ? { ...s, index } : s))
    setFailed(false)
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
        onClose={() => setSession(null)}
        onClick={(event) => event.target === dialog.current && dialog.current.close()}
      >
        {session && episode && (
          <div className="theater-inner">
            <div className="theater-top">
              <span className="label">{session.showTitle} / {episode.seasonEpisode ?? `Episode ${episode.number}`}</span>
              <button className="bar-button" onClick={() => dialog.current?.close()} aria-label="Close player">×</button>
            </div>
            <div className={`theater-screen${episode.vertical ? ' theater-screen--vertical' : ''}`}>
              {failed ? (
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
              ) : (
                <video
                  key={episode.videoUrl}
                  src={episode.videoUrl}
                  poster={episode.still}
                  controls
                  autoPlay
                  playsInline
                  onError={() => setFailed(true)}
                  onEnded={() => hasNext && go(session.index + 1)}
                />
              )}
            </div>
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
          </div>
        )}
      </dialog>
    </TheaterContext.Provider>
  )
}
