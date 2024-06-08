import type { Component } from 'solid-js'

import { Default } from '@layouts'
import { Auth } from '@components'

import styles from './.module.scss'

export default (() => {
  return (
    <Default>
      <main class={styles.module}>
        <section class={styles.home}>
          <h1>{'Welcome to lndb.cc'}</h1>
          <span>{'Get started - it\'s free. No credit card needed.'}</span>
          <Auth className={styles.auth} />
        </section>
      </main>
    </Default>
  )
}) satisfies Component
