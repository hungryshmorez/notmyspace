// Builds standalone.html: the real app in one file (JS, CSS and public/ assets inlined).
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs'
import { join, extname } from 'node:path'

const out = 'dist-standalone'
execSync(`npx vite build --mode standalone --outDir ${out} --emptyOutDir`, { stdio: 'inherit' })

const mime = { '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' }
const dataUri = (file) => `data:${mime[extname(file)]};base64,${readFileSync(file).toString('base64')}`

// Every public/ asset referenced as "/path" gets swapped for a data URI.
const assets = []
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (mime[extname(entry.name)]) assets.push(full)
  }
}
walk('public')
const inlineAssets = (text) =>
  assets.reduce((acc, file) => acc.split('/' + file.slice('public/'.length)).join(dataUri(file)), text)

let html = readFileSync(join(out, 'index.html'), 'utf8')
html = html.replace(/<script type="module" crossorigin src="\.?\/(assets\/[^"]+)"><\/script>/, (_, src) => {
  const js = inlineAssets(readFileSync(join(out, src), 'utf8')).replace(/<\/script/g, '<\\/script')
  return `<script type="module">${js}</script>`
})
html = html.replace(/<link rel="stylesheet" crossorigin href="\.?\/(assets\/[^"]+)">/, (_, href) =>
  `<style>${inlineAssets(readFileSync(join(out, href), 'utf8'))}</style>`)

if (/src="\.?\/assets|href="\.?\/assets/.test(html)) throw new Error('standalone.html still references external assets')
writeFileSync('standalone.html', html)
rmSync(out, { recursive: true })
console.log(`standalone.html written (${(html.length / 1e6).toFixed(1)} MB)`)
