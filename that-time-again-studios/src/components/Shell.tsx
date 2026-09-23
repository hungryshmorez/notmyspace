import { useEffect, type ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { FESTIVAL } from '../data/artists'
import { Grain } from './Grain'
import { PlayerProvider } from './Player'

export function Shell({ children }: { children: ReactNode }) {
  // Only one episode or track plays at a time.
  useEffect(() => {
    const onPlay = (event: Event) => {
      document.querySelectorAll<HTMLMediaElement>('video, audio').forEach((media) => {
        if (media !== event.target) media.pause()
      })
    }
    document.addEventListener('play', onPlay, true)
    return () => document.removeEventListener('play', onPlay, true)
  }, [])

  return (
    <PlayerProvider>
      <div className="site-shell">
        <div className="burn" aria-hidden="true" />
        <Grain />
        <header className="site-header">
          <Link to="/" className="wordmark" aria-label="That Time Again Studios home">
            <img src="/brand/studios-logo-small.webp" alt="That Time Again Studios" />
          </Link>
          <nav className="main-nav" aria-label="Primary">
            <Link to="/" hash="slate">Shows</Link>
            <Link to="/" hash="episodes">Episodes</Link>
            <Link to="/records">Records</Link>
            <Link to="/" hash="worlds">Worlds</Link>
          </nav>
          <a className="header-note" href={FESTIVAL} target="_blank" rel="noreferrer">Enter the festival ↗</a>
        </header>
        {children}
        <footer className="site-footer">
          <Link to="/" className="wordmark" aria-label="That Time Again Studios home">
            <img src="/brand/studios-logo-small.webp" alt="That Time Again Studios" />
          </Link>
          <p>Same stories. Different light.</p>
          <span>© 2026 That Time Again Studios</span>
        </footer>
      </div>
    </PlayerProvider>
  )
}
