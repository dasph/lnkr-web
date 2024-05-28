import type { Component } from 'solid-js'

import { Default } from '@layouts'
import { Footer, Header } from '@components'

import styles from './.module.scss'

export default (() => {
  return (
    <Default>
      <Header />
      <div class={styles.div} />
      <Footer />
    </Default>
  )
}) satisfies Component
