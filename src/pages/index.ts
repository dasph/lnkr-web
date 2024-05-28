import { lazy, type Component } from 'solid-js'

const entries = Object
  .entries(import.meta.glob<{ default: Component }>('./*/*'))
  .map(([module, value]) => [module.slice(2), lazy(value)] as const)
  .map(([module, value]) => [module.split('/')[0], Object.assign(value, { module })] as const)

export const pages = Object.fromEntries(entries)
