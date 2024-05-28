import type { ManifestChunk } from 'vite'

import { resolve } from 'node:path'
import { mkdirSync, readFileSync, unlink, writeFileSync } from 'node:fs'
import { generateHydrationScript as hydration, renderToStringAsync } from 'solid-js/web'

import { App, routes } from '@app'

const parsePath = (path: string) => {
  const entries = path.split('/')

  const [dir, name] = [resolve('./dist/client/', `.${entries.slice(0, -1).join('/')}`), ...entries.slice(-1)]
  const file = `${dir}/${name || 'index'}.html`

  return { dir, name, file }
}

const createPage = (path: string, page: string) => {
  const { dir, file } = parsePath(path)

  mkdirSync(dir, { recursive: true })
  writeFileSync(file, page)

  console.log(`✓ created page: ${file}`)
}

const renderAssets = (chunk?: ManifestChunk): string => [
  chunk?.file && `<script type="module" crossorigin src="/${chunk.file}"></script>`,
  chunk?.css?.map((file) => `<link rel="stylesheet" crossorigin href="/${file}">`)
].flat().filter(Boolean).join('\n    ')

const entry = './dist/client/entry.html'
const manifestName = './dist/client/.vite/manifest.json'

const index = readFileSync(entry, 'utf-8').replace('<!--hydration-->', hydration())
const manifest: [string, ManifestChunk][] = Object.entries(JSON.parse(readFileSync(manifestName, 'utf-8')))

;(async () => {
  const pages = await Promise.all(routes.map(async ({ path, component }) => {
    const page = await renderToStringAsync(() => <App path={path} />)
    const assets = renderAssets(manifest.find(([module]) => module.endsWith(component.module))?.[1])

    return { path, page, assets }
  }))

  pages
    .map(({ assets, path, page }) => ({ assets, path, page: index.replace('<!--app-->', page).replace('<!--assets-->', assets) }))
    .map(({ path, page }) => createPage(path, page))

  unlink(entry, () => console.log(`✓ removed entry: ${entry}`))
})()
