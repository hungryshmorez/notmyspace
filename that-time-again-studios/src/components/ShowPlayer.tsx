import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { LIVE_URL } from '../data/site'

export type Playable = {
  title: string
  label?: string // e.g. "S1 E2 · 3:46" or "0:15"
  synopsis?: string
  videoUrl: string
  still?: string
  vertical?: boolean
  credit?: string
  sourceUrl?: string // where else to watch it
}

export type ShowPlayerHandle = { play: (list: Playable[], index: number) => void }

// The show page's own player: one big screen, right on the page. Tiles below it call play(),
// which starts the video inside the tap (iOS Safari needs that for sound) and rolls on to the
// next item in the same list.
export const ShowPlayer = forwardRef<ShowPlayerHandle, { first: Playable; showTitle: string }>(function ShowPlayer({ first, showTitle }, ref) {
  const video = useRef<HTMLVideoElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const [list, setList] = useState<Playable[]>([first])
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(false)
  const current = list[index] ?? first

  const play = (next: Playable[], at: number) => {
    const item = next[at]
    const el = video.current
    if (!item || !el) return
    setList(next)
    setIndex(at)
    setFailed(false)
    el.poster = item.still ?? ''
    el.src = item.videoUrl
    el.play().catch(() => {}) // if autoplay is refused, the controls are right there
    frame.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useImperativeHandle(ref, () => ({ play }))

  const hasNext = index < list.length - 1

  return (
    <div className="show-player" ref={frame}>
      <div className={`show-screen${current.vertical ? ' show-screen--vertical' : ''}`}>
        <video
          ref={video}
          controls
          playsInline
          preload="none"
          poster={first.still}
          src={first.videoUrl}
          hidden={failed}
          onError={() => setFailed(true)}
          onEnded={() => hasNext && play(list, index + 1)}
        />
        {failed && (
          <div className="theater-fallback">
            {current.still && <img src={current.still} alt="" />}
            <div>
              <p>This video can’t play on this page — the host blocks outside video.</p>
              <div className="actions">
                <a className="button" href={LIVE_URL} target="_blank" rel="noreferrer">Watch on the live site ↗</a>
                {current.sourceUrl && <a className="text-link" href={current.sourceUrl} target="_blank" rel="noreferrer">Watch on Showrunner ↗</a>}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="show-now">
        <p className="label">Now playing{current.label ? ` / ${current.label}` : ''}</p>
        <h3>{current.title}</h3>
        {current.synopsis && <p className="show-now-synopsis">{current.synopsis}</p>}
        {current.credit && <p className="label show-now-credit">{current.credit}</p>}
        <p className="label show-now-show">{showTitle}</p>
      </div>
    </div>
  )
})

export function PlayTile({ item, onPlay }: { item: Playable; onPlay: () => void }) {
  return (
    <button className="episode-tile" onClick={onPlay} aria-label={`Play ${item.title}`}>
      <div className={`episode-still${item.vertical ? ' episode-still--vertical' : ''}`}>
        <div className="still-blank" />
        {item.still && <img src={item.still} alt="" loading="lazy" onError={(event) => { event.currentTarget.style.visibility = 'hidden' }} />}
        <span className="play-icon" aria-hidden="true" />
        {item.label && <span className="episode-duration">{item.label.split(' · ').pop()}</span>}
      </div>
      {item.label?.includes('·') && <span className="episode-tile-no">{item.label.split(' · ')[0]}</span>}
      <span className="episode-tile-title">{item.title}</span>
      {item.credit && <span className="episode-tile-no">{item.credit}</span>}
    </button>
  )
}
