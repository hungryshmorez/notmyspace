export type Artist = {
  slug: string
  name: string
  genre: string
  tagline: string
  bio: string
  photo: string // under /art/artists
  track: {
    title: string
    release: string
    src: string // streamed from the Media repo's GitHub Pages
  }
  onTheShow?: string
  mediaFolder: string // music/<folder> in the Media repo
  links: { label: string; url: string }[]
}

export const FESTIVAL = 'https://hungryshmorez.github.io/Site/'

const MEDIA = 'https://hungryshmorez.github.io/Media/music/'

// Bios condensed from each artist's EPK.
export const artists: Artist[] = [
  {
    slug: 'shmorez',
    name: 'SHMOREZ',
    genre: 'Bass / dubstep',
    tagline: 'Forged in the campfire. Dropped in the bass.',
    bio: 'A marshmallow melted into a s’more after a campfire accident involving radioactive marshmallows and a malfunctioning bass cannon. What came out serves filthy dubstep, gooey trap and sticky acid bass.',
    photo: '/art/artists/shmorez.webp',
    track: {
      title: 'Shhh, Don’t Wake Her Up',
      release: 'Thuggish Ruggish SHMOREZ',
      src: `${MEDIA}shmorez/thuggish-ruggish-shmorez/10%20shhh-dont-wake-her-up.mp3`,
    },
    onTheShow: 'The DJ on Al & Sloppy — S1 E7',
    mediaFolder: 'shmorez',
    links: [
      { label: 'Enter his world', url: 'https://hungryshmorez.github.io/Site/shmorez.html' },
      { label: 'Press kit', url: 'https://hungryshmorez.github.io/Site/epk/shmorez/' },
    ],
  },
  {
    slug: 'tanky-johnson',
    name: 'Tanky Johnson',
    genre: 'Outlaw country',
    tagline: 'The Outlaw of the Void.',
    bio: 'The sound of a city suit burning on a gravel road: rowdy honky-tonk anthems and neon-lit confessionals from a modern outlaw with a throwback soul. His debut album, For Mama, is due in 2026.',
    photo: '/art/artists/tanky-johnson.webp',
    track: {
      title: 'Cowboys Don’t Cry',
      release: 'For Mama',
      src: `${MEDIA}tanky/for-momma/11%20Cowboys%20Don%27t%20Cry.mp3`,
    },
    onTheShow: 'Al & Sloppy react to it in S1 E5',
    mediaFolder: 'tanky',
    links: [
      { label: 'Enter his world', url: 'https://hungryshmorez.github.io/Site/tanky.html' },
      { label: 'Press kit', url: 'https://hungryshmorez.github.io/Site/epk/tanky/' },
    ],
  },
  {
    slug: 'driftwave-static',
    name: 'DriftWave Static',
    genre: 'Slushwave / vaporwave',
    tagline: 'Memories melting in reverse.',
    bio: 'A transmission caught between vaporized emotion and analog decay — warped-nostalgia loops in fogged neon, with 808s pulsing underneath like distant heartbeats. Every track self-produced.',
    photo: '/art/artists/driftwave-static.webp',
    track: {
      title: 'Static Drift Anthem',
      release: 'Midnight Vapor Circuit',
      src: `${MEDIA}static-drift-anthem.mp3`,
    },
    mediaFolder: 'driftwave',
    links: [
      { label: 'Enter the chill zone', url: 'https://hungryshmorez.github.io/Site/driftwave.html' },
      { label: 'Press kit', url: 'https://hungryshmorez.github.io/Site/epk/driftwave/' },
      { label: 'Bandcamp', url: 'https://driftwavestatic.bandcamp.com/' },
    ],
  },
]
