import { Component, For } from 'solid-js'

import type { Image as TImage } from '@types'

import styles from './.module.scss'

type Props = {
  source: TImage
}

export const Image: Component<Props> = ({ source }) => {
  const [fallback] = source.source

  return (
    <picture class={styles.picture}>
      <For each={source.source.slice(1)} children={({ mime, srcset }) => <source type={mime} srcset={srcset} />} />

      <img width={source.width} height={source.height} alt={source.alt} src={fallback.srcset} />
    </picture>
  )
}
