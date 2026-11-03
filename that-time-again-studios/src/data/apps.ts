// Games and tools built by 12matt3r / SofaKingSadBoi. Shown in the Arcade and the Apps & sites sections of the home page.
export type AppLink = { name: string; url: string }

export const ARCADE: AppLink[] = [
  { name: 'Out to Pasture: Bardo Monsters', url: 'https://app.nimblefox.ai/events/nimble-game-jam/entries/Zfq8uKHgTG' },
  { name: 'You’re Probably Gonna Die!', url: 'https://app.nimblefox.ai/g/f7AZrQFAOf' },
  { name: 'B2Buddy', url: 'https://app.nimblefox.ai/g/6VplR8vm22' },
  { name: 'CHECKMATE 55–OVERDRIVE', url: 'https://app.nimblefox.ai/g/7TJ5y6zN3N' },
  { name: 'SEVEN DAYS', url: 'https://hungryshmorez.github.io/Seven-days/' },
  { name: 'The Club', url: 'https://app.nimblefox.ai/g/L6sIaIjfQ6' },
  { name: 'Midnight Vapor Circuit', url: 'https://app.nimblefox.ai/g/UjaA1ZAbvU' },
  { name: 'NPC Therapy', url: 'https://npctherapy.on.websim.com/' },
  { name: 'Chromashift', url: 'https://websim.com/@SOFAKINGSADBOI/chromashift-hyper-surreal-dreamscape-3' },
  { name: 'Urban Life Simulator', url: 'https://urban-life-simulator-10--sofakingsadboi.on.websim.com/' },
  { name: 'Choose Your Own Grand Theft Auto Story', url: 'https://leonida-360-vice-city-crime-simulator--sofakingsadboi.on.websim.com/' },
  { name: 'Bikini Bottom Anomaly Hunt', url: 'https://fright-night.on.websim.com/' },
  { name: 'GTA Vice City Websim Edition', url: 'https://gta--sofakingsadboi.on.websim.com/' },
  { name: 'Curse of the Monkey Paw', url: 'https://wish.on.websim.com/' },
  { name: 'Trippy Racing', url: 'https://dreamworld-cattle-racing-game--sofakingsadboi.on.websim.com/' },
]

export const APPS: AppLink[] = [
  { name: 'Out to Pasture: documentation', url: 'https://out-to-pasture--sofakingsadboi.on.websim.com/' },
  { name: 'Showrunner Script Lab', url: 'https://showrunner-studio-2--sofakingsadboi.on.websim.com/' },
  { name: 'When Ocean Meets Sky: documentation', url: 'https://ocean-meets-sky--sofakingsadboi.on.websim.com/' },
  { name: 'That Time Again: documentation', url: 'https://that-time-again--sofakingsadboi.on.websim.com/' },
  { name: 'Fever Dream: documentation', url: 'https://fever-dream--sofakingsadboi.on.websim.com/' },
  { name: 'Web Fusion Studio', url: 'https://fuse2.on.websim.com/' },
  { name: 'Trippy Cam 2.0', url: 'https://trippykit.on.websim.com/' },
  { name: 'Windows 93', url: 'https://64fm47unhpzo.space.minimax.io' },
  { name: 'FFmpeg Studio', url: 'https://3jnyhlyqkqq1e.space.minimax.io/' },
  { name: 'The Book of the Fading Age', url: 'https://0vc7xut32fnw9.space.minimax.io/' },
  { name: 'Long Live the Underground', url: 'https://oy3r595rsonau.space.minimax.io/' },
  { name: 'Driftwave Vaporizer', url: 'https://oy3r595rsonau.space.minimax.io/' },
  { name: 'Start From the Bottom Now We Here', url: 'https://jcuhmw6ty0qn4.space.minimax.io/' },
]

export const hostOf = (url: string) => new URL(url).hostname.replace(/^www\./, '')
