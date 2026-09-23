import { useEffect, useState } from 'react'
import { Gallery } from '../components/Gallery'
import { usePlayer } from '../components/Player'
import { artists, type Artist } from '../data/artists'
import { loadAlbums, type Album } from '../data/catalog'

const PREVIEW = 6

export function RecordsPage() {
  return (
    <main>
      <section className="records-band records-band--page">
        <img className="records-texture" src="/brand/texture.webp" alt="" />
        <div className="records-inner">
          <h1><img className="records-logo" src="/brand/records-logo.webp" alt="That Time Again Records" /></h1>
          <p>Every release from the label, streamed straight from the Media site. Press play on anything — the player keeps going while you browse the rest of the studio.</p>
          <nav className="records-jump" aria-label="Artists">
            {artists.map((artist) => <a key={artist.slug} href={`#${artist.slug}`}>{artist.name}</a>)}
          </nav>
        </div>
      </section>
      {artists.map((artist) => <Discography key={artist.slug} artist={artist} />)}
    </main>
  )
}

function Discography({ artist }: { artist: Artist }) {
  const player = usePlayer()
  const [albums, setAlbums] = useState<Album[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    loadAlbums(artist.mediaFolder, artist.name).then(setAlbums, () => setError(true))
  }, [artist])

  const everything = albums?.flatMap((album) => album.tracks) ?? []

  return (
    <section className="section discography" id={artist.slug}>
      <div className="disco-head">
        <div className="artist-photo"><img src={artist.photo} alt={artist.name} /></div>
        <div>
          <p className="label">{artist.genre}</p>
          <h2>{artist.name}</h2>
          <p className="artist-tagline">{artist.tagline}</p>
          <p className="artist-bio">{artist.bio}</p>
          <p className="label disco-count">
            {albums ? `${albums.length} releases · ${everything.length} tracks` : error ? 'Catalog unavailable here' : 'Loading the catalog…'}
          </p>
          <div className="actions">
            {everything.length > 0 && <button className="button" onClick={() => player.play(everything)}>Play everything</button>}
            {artist.links.map((link) => (
              <a key={link.url} className="text-link" href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>
            ))}
          </div>
        </div>
      </div>
      {artist.gallery && <Gallery title={artist.gallery.title} images={artist.gallery.images} artist={artist.name} />}
      {error && (
        <p className="section-intro">
          The catalog streams from hungryshmorez.github.io and couldn’t load on this page. Open the site from GitHub Pages to hear everything.
        </p>
      )}
      {albums && (
        <div className="album-grid">
          {albums.map((album) => <AlbumBlock key={album.title} album={album} />)}
        </div>
      )}
    </section>
  )
}

function AlbumBlock({ album }: { album: Album }) {
  const player = usePlayer()
  const [open, setOpen] = useState(false)
  const shown = open ? album.tracks : album.tracks.slice(0, PREVIEW)

  return (
    <article className="album">
      <div className="album-head">
        <div>
          <h3>{album.title}</h3>
          <span className="label">{album.tracks.length} tracks</span>
        </div>
        <button className="button button--small" onClick={() => player.play(album.tracks)}>Play album</button>
      </div>
      <ol className="tracklist">
        {shown.map((track, i) => {
          const active = player.isCurrent(track)
          return (
            <li key={track.src}>
              <button className={`track-row${active ? ' track-row--active' : ''}`} onClick={() => player.play(album.tracks, i)}>
                <span className="track-no">{active && player.playing ? '▶' : String(i + 1).padStart(2, '0')}</span>
                <span className="track-name">{track.title}</span>
              </button>
            </li>
          )
        })}
      </ol>
      {album.tracks.length > PREVIEW && (
        <button className="tracklist-more" onClick={() => setOpen(!open)}>
          {open ? 'Show fewer' : `Show all ${album.tracks.length}`}
        </button>
      )}
    </article>
  )
}
