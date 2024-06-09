import { createMemo, createSignal, type VoidComponent } from 'solid-js'
import { startAuthentication, startRegistration } from '@simplewebauthn/browser'

import { useAuth } from '@hooks'
import { fetchApi } from '@helpers'

import styles from './.module.scss'

type Props = Partial<Pick<Element, 'className'>>

export const Auth: VoidComponent<Props> = (props) => {
  const [auth, setAuth] = useAuth

  const [name, setName] = createSignal<string>('')
  const [link, setLink] = createSignal<string>('')

  const [alias, setAlias] = createSignal<string>('')

  const encodedName = createMemo(() => btoa(encodeURIComponent(name())))

  const url = createMemo(() => alias() ? `${import.meta.env.VITE_API_URL}/${alias()}` : '')

  const isHttpUrl = createMemo(() => {
    try {
      const { protocol } = new URL(link())
      return ['http:', 'https:'].includes(protocol)
    } catch (_) { return false }
  })

  const signup = async (name: string) => {
    const { key, payload } = await fetchApi('auth/signup', 'get', { name })

    const registration = await startRegistration(payload)

    await fetchApi('auth/signup', 'post', { key, payload: registration }).catch(() => undefined).then((value) => setAuth(!!value))
  }

  const signin = async () => {
    const { key, payload } = await fetchApi('auth/signin', 'get', {})

    const authentication = await startAuthentication(payload)

    await fetchApi('auth/signin', 'post', { key, payload: authentication }).catch(() => undefined).then((value) => setAuth(!!value))
  }

  const signout = () => fetchApi('auth/signout', 'get', {}).then(() => setAuth(false))

  const submit = async () => {
    const { alias } = await fetchApi('', 'post', { tags: [], value: link() }).catch(() => ({ alias: '' }))

    setLink('')
    setAlias(alias)
  }

  return (
    <section class={`${styles.module} ${props.className || ''}`}>
      {auth() ? <input type='button' value='Log out' onClick={signout} /> : (<>
        <div class={styles.signup}>
          <input type='text' placeholder='your name' value={name()} onInput={({ target: { value } }) => setName(value)} />
          <input type='button' value='Continue' onClick={() => signup(encodedName())} disabled={encodedName().length > 64} />
        </div>
        <div class={styles.divider}>
          <span>{'or'}</span>
        </div>
        <span class={styles.signin}>{'Already have an account? '}<a href='#' onClick={signin}>{'Log In'}</a></span>
      </>)}

      {auth() && (<>
        <div class={styles.signup}>
          <input type='text' placeholder='url' value={link()} onInput={({ target: { value } }) => setLink(value)} />
          <input type='button' value='Submit' onClick={submit} disabled={!isHttpUrl()} />
        </div>

        <span class={styles.copy} onClick={() => navigator.clipboard.writeText(url())}>{url()}</span>
      </>)}
    </section>
  )
}
