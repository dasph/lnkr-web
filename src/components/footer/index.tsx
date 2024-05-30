import type { VoidComponent } from 'solid-js'

import { author } from '@types'

import styles from './.module.scss'

export const Footer: VoidComponent = () => (
  <footer class={styles.footer}>
    <div>
      <span>{`© 2024 ${author}`}</span>
      <span>{'Powered by SolidJS & ❤️'}</span>
    </div>
  </footer>
)
