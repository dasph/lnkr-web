import type { Component } from 'solid-js'

import { Default } from '@layouts'
import { Footer, Header } from '@components'

import styles from './.module.scss'

export const Home: Component = () => {
  return (
    <Default>
      <Header />
      <div class={styles.div} />
      <Footer />
    </Default>
  )
}
