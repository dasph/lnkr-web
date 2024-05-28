import { hydrate, render } from 'solid-js/web'

import { App } from '@app'

(import.meta.env.DEV ? render : hydrate)(() => <App />, document.getElementById('root')!)
