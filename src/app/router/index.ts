import { RouteDefinition } from '@solidjs/router'

import { pages } from '@pages'

export const routes = [{
  path: '/',
  component: pages['home']
}, {
  path: '/404',
  component: pages['not-found']
}] satisfies RouteDefinition<string>[]
