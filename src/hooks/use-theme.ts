import { createSignal } from 'solid-js'

import { Theme } from '@types'

export const [theme, setTheme] = createSignal<Theme>(Theme.DARK)
