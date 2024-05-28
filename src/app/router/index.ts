import { RouteDefinition } from '@solidjs/router'

import { Home, NotFound } from '@pages'

export const routes = [{
  path: '/',
  component: Home
}, {
  path: '/404',
  component: NotFound
}] satisfies RouteDefinition<string>[]
