import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const sourceHtml = await readFile(join(dist, 'index.html'), 'utf8')

const scriptPath = sourceHtml.match(/<script[^>]+src="([^"]+)"[^>]*><\/script>/)?.[1]
const stylePath = sourceHtml.match(/<link[^>]+href="([^"]+\.css)"[^>]*>/)?.[1]

if (!scriptPath || !stylePath) throw new Error('Built JavaScript or CSS asset not found')

const javascript = await readFile(join(dist, scriptPath.replace(/^\//, '')), 'utf8')
let css = await readFile(join(dist, stylePath.replace(/^\//, '')), 'utf8')

const assetPattern = /url\((['"]?)(\/assets\/[^)'"?]+)\1\)/g
const assetMatches = [...css.matchAll(assetPattern)]

for (const match of assetMatches) {
  const assetPath = join(dist, match[2].replace(/^\//, ''))
  const bytes = await readFile(assetPath)
  const extension = assetPath.split('.').pop()
  const mime = extension === 'woff2' ? 'font/woff2' : 'font/woff'
  css = css.replaceAll(match[0], `url(data:${mime};base64,${bytes.toString('base64')})`)
}

const standalone = sourceHtml
  .replace(/<script[^>]+src="[^"]+"[^>]*><\/script>/, () => `<script type="module">${javascript}</script>`)
  .replace(/<link[^>]+href="[^"]+\.css"[^>]*>/, () => `<style>${css}</style>`)

await writeFile(join(root, 'liquid-crew-standalone.html'), standalone)
console.log(join(root, 'liquid-crew-standalone.html'))
