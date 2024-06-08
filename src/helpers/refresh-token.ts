import { useAuth } from '@hooks'
import { fetchApi } from '@helpers'

const [_auth, setAuth] = useAuth

let interval: NodeJS.Timeout | undefined = undefined

const callback = () => fetchApi('auth/refresh', 'get', {}).catch(() => false).then((value) => setAuth(!!value))

export const toogleRefreshToken = (stop?: boolean) => {
  interval = (stop || interval) ? void clearInterval(interval) : setInterval(callback, 1000 * 60 * 4.5)
}
