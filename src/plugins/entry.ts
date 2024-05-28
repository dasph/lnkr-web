import type { Connect, Plugin } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'

import { parse } from 'node:url'
import { readFileSync } from 'node:fs'
import { nextTick } from 'node:process'

export const entry = (index: string): Plugin => {
  const code = readFileSync(index, 'utf-8')

  const write = (res: ServerResponse<IncomingMessage>) => res.writeHead(200, { 'Content-Type': 'text/html' }).end(code)
  const handle: Connect.NextHandleFunction = (req, res, next) => parse(req.url || '').path === '/index.html' ? write(res) : next()

  return {
    name: 'entry',
    enforce: 'post',

    config: () => ({ build: { rollupOptions: { input: { index } } } }),

    configureServer: (server) => nextTick(() => server.middlewares.stack.splice(-2, 0, { route: '', handle })),

    generateBundle: (_opts, bundle) => Object.values(bundle).filter(({ name }) => !name).forEach((chunk) => chunk.fileName = 'entry.html')
  }
}
