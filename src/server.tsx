import { resolve } from 'node:path'
import { mkdirSync, readFileSync, unlink, writeFileSync } from 'node:fs'
import { renderToString, generateHydrationScript as hydration } from 'solid-js/web'

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

const entry = './dist/client/entry.html'
const index = readFileSync(entry, 'utf-8').replace('<!--hydration-->', hydration())

routes
  .map(({ path }) => ({ path, page: renderToString(() => <App path={path} />) }))
  .map(({ path, page }) => ({ path, page: index.replace('<!--app-->', page) }))
  .map(({ path, page }) => createPage(path, page))

unlink(entry, () => console.log(`✓ removed entry: ${entry}`))
