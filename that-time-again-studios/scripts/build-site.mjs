// Builds site-build/: the live copy for the Site repo (public/studios/). Same app as standalone.html,
// with JS and CSS inlined, but images stay as files next to the page (art/, brand/) so the first load
// is small and images load as they scroll into view. Paths are made relative, so the folder works at
// any sub-path (e.g. hungryshmorez.github.io/Site/studios/).
import { execSync } from 'node:child_process'
import { cpSync, readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const tmp = 'dist-site'
const out = 'site-build'
execSync(`npx vite build --mode standalone --outDir ${tmp} --emptyOutDir`, { stdio: 'inherit' })

// "/art/…" and "/brand/…" (quoted, template or url()) → "art/…", "brand/…"
const relativize = (text) => text.replace(/(["'`(])\/(art|brand)\//g, '$1$2/')

let html = readFileSync(join(tmp, 'index.html'), 'utf8')
html = html.replace(/<script type="module" crossorigin src="\.?\/(assets\/[^"]+)"><\/script>/, (_, src) => {
  const js = relativize(readFileSync(join(tmp, src), 'utf8')).replace(/<\/script/g, '<\\/script')
  return `<script type="module">${js}</script>`
})
html = html.replace(/<link rel="stylesheet" crossorigin href="\.?\/(assets\/[^"]+)">/, (_, href) =>
  `<style>${relativize(readFileSync(join(tmp, href), 'utf8'))}</style>`)
if (/src="\.?\/assets|href="\.?\/assets/.test(html)) throw new Error('site build still references bundled assets')
if (/["'`(]\/(art|brand)\//.test(html)) throw new Error('site build still has absolute /art or /brand paths')

rmSync(out, { recursive: true, force: true })
mkdirSync(out)
writeFileSync(join(out, 'index.html'), html)
cpSync('public/art', join(out, 'art'), { recursive: true })
cpSync('public/brand', join(out, 'brand'), { recursive: true })
rmSync(tmp, { recursive: true })
console.log(`site-build/ written (index.html ${(html.length / 1e6).toFixed(2)} MB + art/ + brand/)`)
