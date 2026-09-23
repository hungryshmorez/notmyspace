// The label's full catalog, read at runtime from the Media repo's GitHub Pages manifest,
// so anything uploaded to Media shows up here without a rebuild.

export const MEDIA_ROOT = 'https://hungryshmorez.github.io/Media/'

export type Track = {
  title: string
  artist: string
  album: string
  src: string
}

export type Album = {
  title: string
  tracks: Track[]
}

type ManifestTrack = { src: string; title?: string; album?: string }

const SINGLES = 'Singles'

// Encode each path segment; filenames carry spaces, apostrophes and brackets.
const mediaUrl = (path: string) => MEDIA_ROOT + path.split('/').map(encodeURIComponent).join('/')

// Manifest titles read "Artist — Song"; the artist is already known here.
const songTitle = (track: ManifestTrack) => {
  const raw = track.title ?? track.src.split('/').pop()!.replace(/\.[a-z0-9]+$/i, '')
  return raw.includes(' — ') ? raw.slice(raw.indexOf(' — ') + 3) : raw.replace(/^\d+\s+/, '')
}

let request: Promise<ManifestTrack[]> | null = null

function loadManifest() {
  request ??= fetch(`${MEDIA_ROOT}manifest.json`)
    .then((res) => {
      if (!res.ok) throw new Error(`Media manifest ${res.status}`)
      return res.json() as Promise<{ tracks: ManifestTrack[] }>
    })
    .then((manifest) => manifest.tracks)
    .catch((error) => {
      request = null // let a later visit retry
      throw error
    })
  return request
}

// Albums for one artist folder in Media (music/<folder>/...), in manifest order, singles last.
export async function loadAlbums(folder: string, artist: string): Promise<Album[]> {
  const tracks = await loadManifest()
  const albums = new Map<string, Track[]>()
  for (const track of tracks) {
    if (!track.src.startsWith(`music/${folder}/`)) continue
    const album = track.album ?? SINGLES
    if (!albums.has(album)) albums.set(album, [])
    albums.get(album)!.push({ title: songTitle(track), artist, album, src: mediaUrl(track.src) })
  }
  return [...albums]
    .map(([title, list]) => ({ title, tracks: list }))
    .sort((a, b) => Number(a.title === SINGLES) - Number(b.title === SINGLES))
}
