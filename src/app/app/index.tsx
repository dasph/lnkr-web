import { Router } from '@solidjs/router'
import { Suspense, createEffect, type Component } from 'solid-js'

import { routes } from '@app'
import { useAuth } from '@hooks'
import { fetchApi, toogleRefreshToken } from '@helpers'

import './.css'

type Props = {
  path?: string
}

export const App: Component<Props> = ({ path }) => {
  const [auth, setAuth] = useAuth

  createEffect(() => toogleRefreshToken(!auth()), [auth])

  createEffect(() => void fetchApi('auth/refresh', 'get', {}).catch(() => false).then((value) => setAuth(!!value)), [])

  return (
    <Suspense children={<Router url={path} children={routes} />} />
  )
}
