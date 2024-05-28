import type { ParentComponent } from 'solid-js'

import styles from './.module.scss'

export const Default: ParentComponent = ({ children }) => (
  <div class={styles.module}>
    {children}
  </div>
)
