export type Episode = {
  number: number
  title: string
  seasonEpisode?: string
  duration?: string
  synopsis?: string
  showrunnerUrl: string
  videoUrl: string // direct MP4 from Showrunner's CDN
  still: string // poster frame under /art/episodes
  vertical?: boolean // 9:16 episode
}

export type GalleryItem = {
  name: string
  role?: string
  image: string
  description?: string
}

import { slate, type SlateEntry } from './slate'

export type Show = SlateEntry & {
  status: string
  blurb?: string
  heroStill?: string
  heroCaption?: string
  episodes?: Episode[]
  characters?: GalleryItem[]
  sets?: GalleryItem[]
}

// Shows with more than a pitch: episodes, cast and sets. Everything else comes from the slate.
const extras: Record<string, Partial<Show>> = {
  'al-and-sloppy': {
    status: 'Season one streaming',
    blurb: 'Two hopelessly unqualified hosts react to synthetic media from a collapsing public-access studio.',
    heroStill: '/art/episodes/s1e01.webp',
    heroCaption: 'Still from S1 E1 / Seasoned Soul',
    episodes: [
      { number: 1, title: "Episode 1: Seasoned Soul - wide screen", seasonEpisode: "S1 E1", duration: "1:30", synopsis: "Friends attempt to devour a sentient burrito who undergoes a cosmic transformation, becoming a broadcast signal that sends them all on a surreal journey through space.", showrunnerUrl: "https://www.showrunnerstudio.com/shows/that-time-again-with-al-sloppy-556ffae1/episodes?episode=73cf9be7-0a3a-4acc-affa-7620cae0c42a", videoUrl: "https://d2a132qjpri1we.cloudfront.net/combines/6016df4d-ab12-40f0-8bd1-776acf16f83d/3516/b8265e3d-0c6b-4898-a3dc-84f4225653c1/mp4/3516_avc_1080p.mp4", still: "/art/episodes/s1e01.webp" },
      { number: 2, title: "The Couch Dimension", seasonEpisode: "S1 E2", duration: "3:46", showrunnerUrl: "https://www.showrunnerstudio.com/shows/that-time-again-with-al-sloppy-556ffae1/episodes?episode=6f68a892-f424-49d5-becd-ffa0ca1085d3", videoUrl: "https://d2a132qjpri1we.cloudfront.net/combines/6016df4d-ab12-40f0-8bd1-776acf16f83d/3535/1217ba29-1f0d-4a53-8f51-5570fa957212/mp4/3535_avc_1080p.mp4", still: "/art/episodes/s1e02.webp" },
      { number: 3, title: "The Great Firewall", seasonEpisode: "S1 E3", duration: "3:46", showrunnerUrl: "https://www.showrunnerstudio.com/shows/that-time-again-with-al-sloppy-556ffae1/episodes?episode=acad2481-58d9-4296-a94b-9ba69eca58ef", videoUrl: "https://d2a132qjpri1we.cloudfront.net/combines/6016df4d-ab12-40f0-8bd1-776acf16f83d/3612/4b02e013-ef9d-4ad6-b163-a1a31ec8909f/mp4/3612_avc_1080p.mp4", still: "/art/episodes/s1e03.webp" },
      { number: 4, title: "GTA6 the first look", seasonEpisode: "S1 E4", duration: "5:24", showrunnerUrl: "https://www.showrunnerstudio.com/shows/that-time-again-with-al-sloppy-556ffae1/episodes?episode=ae7145d5-2021-4ad4-83ff-4e136265824f", videoUrl: "https://d2a132qjpri1we.cloudfront.net/episodes/6016df4d-ab12-40f0-8bd1-776acf16f83d/ae7145d5-2021-4ad4-83ff-4e136265824f/b4c946b7-5d22-4314-a146-ee52293fcfb5/mp4/ae7145d5-2021-4ad4-83ff-4e136265824f_avc_1080p.mp4", still: "/art/episodes/s1e04.webp" },
      { number: 5, title: "Cowboys don't cry - that time again", seasonEpisode: "S1 E5", duration: "3:04", synopsis: "Al and Sloppy watched Tanky Johnson's video. Cowboys don't cry.", showrunnerUrl: "https://www.showrunnerstudio.com/shows/that-time-again-with-al-sloppy-556ffae1/episodes?episode=4af8a40b-86eb-4169-925c-fbe4b5549f78", videoUrl: "https://d2a132qjpri1we.cloudfront.net/episodes/6016df4d-ab12-40f0-8bd1-776acf16f83d/4af8a40b-86eb-4169-925c-fbe4b5549f78/af28bdb8-64f9-43a4-908d-08fa66ace264/mp4/4af8a40b-86eb-4169-925c-fbe4b5549f78_avc_1080p.mp4", still: "/art/episodes/s1e05.webp" },
      { number: 6, title: "A Living Hell", seasonEpisode: "S1 E6", duration: "7:28", showrunnerUrl: "https://www.showrunnerstudio.com/shows/that-time-again-with-al-sloppy-556ffae1/episodes?episode=da600340-7d33-44bb-b585-e6622c57e5b4", videoUrl: "https://d2a132qjpri1we.cloudfront.net/episodes/6016df4d-ab12-40f0-8bd1-776acf16f83d/da600340-7d33-44bb-b585-e6622c57e5b4/f8d324aa-cf84-42ae-9144-5b0f9712c176/mp4/da600340-7d33-44bb-b585-e6622c57e5b4_avc_1080p.mp4", still: "/art/episodes/s1e06.webp" },
      { number: 7, title: "That Time Again ft. SHMOREZ", seasonEpisode: "S1 E7", duration: "37:52", synopsis: "Al & Sloppy take a trip with SHMOREZ along with Buffer.", showrunnerUrl: "https://www.showrunnerstudio.com/shows/that-time-again-with-al-sloppy-556ffae1/episodes?episode=56730b65-7e65-4ab8-9c35-8048889e18eb", videoUrl: "https://d2a132qjpri1we.cloudfront.net/episodes/6016df4d-ab12-40f0-8bd1-776acf16f83d/56730b65-7e65-4ab8-9c35-8048889e18eb/d74fb242-ac5f-47cb-87d8-0c714fd527a1/mp4/56730b65-7e65-4ab8-9c35-8048889e18eb_avc_720p.mp4", still: "/art/episodes/s1e07.webp" },
      { number: 8, title: "Overstimulated at Ollie's", seasonEpisode: "S1 E8", duration: "10:27", showrunnerUrl: "https://www.showrunnerstudio.com/shows/that-time-again-with-al-sloppy-556ffae1/episodes?episode=c0794d19-fee6-434a-9088-85c0a4b544c9", videoUrl: "https://d2a132qjpri1we.cloudfront.net/episodes/6016df4d-ab12-40f0-8bd1-776acf16f83d/c0794d19-fee6-434a-9088-85c0a4b544c9/68951aea-f8e5-4159-a6a6-f01dedd20b07/mp4/c0794d19-fee6-434a-9088-85c0a4b544c9_avc_1080p.mp4", still: "/art/episodes/s1e08.webp" },
      { number: 9, title: "Binary Bits & Cosmic Tacos", seasonEpisode: "S1 E9", duration: "3:28", showrunnerUrl: "https://www.showrunnerstudio.com/shows/that-time-again-with-al-sloppy-556ffae1/episodes?episode=0517b138-38df-400e-9e3d-8fc8c2a02ba1", videoUrl: "https://d2a132qjpri1we.cloudfront.net/combines/6016df4d-ab12-40f0-8bd1-776acf16f83d/3777/6267379e-381c-42d1-ac7a-a3a696d86d2a/mp4/3777_avc_1080p.mp4", still: "/art/episodes/s1e09.webp", vertical: true },
      { number: 10, title: "The Zest of the Void", seasonEpisode: "S1 E10", duration: "3:07", showrunnerUrl: "https://www.showrunnerstudio.com/shows/that-time-again-with-al-sloppy-556ffae1/episodes?episode=9c8186fa-af58-4e64-a7b8-8d32a67a5709", videoUrl: "https://d2a132qjpri1we.cloudfront.net/combines/6016df4d-ab12-40f0-8bd1-776acf16f83d/3875/ed738781-0826-41f5-b1d1-6900914619fe/mp4/3875_avc_1080p.mp4", still: "/art/episodes/s1e10.webp", vertical: true },
      { number: 11, title: "What is this ai Sloppy?", seasonEpisode: "S1 E11", duration: "11:15", synopsis: "The guys find where someone made their own AI show of them!", showrunnerUrl: "https://www.showrunnerstudio.com/shows/that-time-again-with-al-sloppy-556ffae1/episodes?episode=f33f5c15-a504-4b33-8032-9a908f2cc01a", videoUrl: "https://d2a132qjpri1we.cloudfront.net/episodes/6016df4d-ab12-40f0-8bd1-776acf16f83d/f33f5c15-a504-4b33-8032-9a908f2cc01a/7117a4a6-3244-465e-b594-483d0970c1ea/mp4/f33f5c15-a504-4b33-8032-9a908f2cc01a_avc_1080p.mp4", still: "/art/episodes/s1e11.webp" },
    ],
    characters: [
      { name: "Al", role: "Lead Co-Host — The Self-Important AI Critic", image: "/art/characters/al.webp", description: "A cynical, droopy-eyed grey puppet with wire-rimmed glasses and a faded vintage band tee. Armed with boundless, unearned intellectual authority and zero technical comprehension of machine learning, Al approaches raw generative AI hallucinations like a tenured film theorist breaking down European arthouse cinema — dry, condescending, over-enunciated deadpan delivery." },
      { name: "Sloppy", role: "Co-Host — The Chaos-Brained Synthetic Sympathizer", image: "/art/characters/sloppy.webp", description: "A wide-eyed, neon-pink puppet with wild, spiky yellow hair and a loud, mismatched 90s colorblock windbreaker. The emotional heart and unfiltered id of the couch — falls deeply and unconditionally in love with the glitches, cries tears of pure joy over audio desync, and possesses total, joyful immunity to the existential horror of generative media." },
      { name: "The Showrunner", role: "Frantic In-Studio Producer — The Algorithmic Content Engine", image: "/art/characters/the-showrunner.webp", description: "A rough, 3D-printed figurine puppet with visible layer lines, jagged plastic teeth, and a grime-streaked hoodie stamped CONTENT MACHINE. Lives in constant terror of being unplugged, running on a manic compulsion to keep churning out content to satisfy \"The Mouth.\" High-speed, jittery, slightly pitch-shifted tech-babble." },
      { name: "Buffer", role: "Doomed On-Scene Field Correspondent — Hazardous Remote Reporter", image: "/art/characters/buffer.webp", description: "A battered, weather-beaten grey/beige felt puppet in a rumpled trench coat with a yellowed press pass, holding a dented handheld mic. The long-suffering straight man forced to do hazardous field work in environments where the laws of physics and prompt coherence don't apply — deadpan newsman cadence constantly broken by digital latency and packet loss." },
      { name: "SHMOREZ", role: "The Show's DJ", image: "/art/characters/shmorez.webp", description: "Joins the crew on the late-night couch to spin tracks — laid-back, groovy, and entirely unbothered no matter how much chaos is unfolding around the booth." },
      { name: "Great Value Al & Sloppy", role: "Knockoff counterfeit doubles", image: "/art/characters/great-value-al-sloppy.webp", description: "Eerily smooth, slightly-too-smooth AI-generated duplicates of Al and Sloppy who show up as antagonists in the \"Extra Fingers\" / \"The Great Value Guest\" episode arc — sardonic deadpan even under duress, speaking in unsettling unison." },
    ],
    sets: [
      { name: "The Emerald Sunset Stage", image: "/art/sets/emerald-sunset-stage.webp" },
      { name: "SHMOREZ DJ Booth", image: "/art/sets/shmorez-dj-booth.webp", description: "A campfire-core rig glowing amber amid sweet woodsmoke and ember light." },
      { name: "The Hallucination Station", image: "/art/sets/hallucination-station-set.webp", description: "A ceramic portal alcove in glitchy brickwork, strobing neon cyan and magenta." },
      { name: "The Technicolor Time-Chamber", image: "/art/sets/technicolor-time-chamber.webp", description: "A CRT-glitched broadcast void with strobing neon grids and a stained thrift-store couch." },
      { name: "The Painterly Public Access Studio", image: "/art/sets/painterly-public-access-studio.webp", description: "A glitchy painterly public-access TV studio with CRT scan-line overlays and flickering neon chyrons." },
      { name: "The Grease-Trap Broadcast Bunker", image: "/art/sets/grease-trap-broadcast-bunker.webp", description: "A cramped public-access broadcast bunker at night, buzzing sodium-vapor light over a milk-crate Zenith CRT monitor rack." },
    ],
  },
}

const byTitle = (a: SlateEntry, b: SlateEntry) => a.title.localeCompare(b.title)

// That Time Again with Al & Sloppy leads; the rest of the slate is alphabetical.
export const shows: Show[] = [...slate]
  .sort((a, b) => (a.slug === 'al-and-sloppy' ? -1 : b.slug === 'al-and-sloppy' ? 1 : byTitle(a, b)))
  .map((entry) => ({ status: 'In development', ...entry, ...extras[entry.slug] }))

export const genres = [...new Set(shows.map((show) => show.genre))].sort()

export function getShow(slug: string) {
  return shows.find((show) => show.slug === slug)
}
