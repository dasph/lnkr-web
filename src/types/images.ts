export enum ImageMime {
  AVIF = 'image/avif',
  JPG = 'image/jpeg',
  PNG = 'image/png',
  SVG = 'image/svg+xml',
  WEBP = 'image/webp'
}

export type Source = {
  mime: ImageMime
  srcset: string
}

export type Image = {
  alt: string
  width: number
  height: number
  source: [Source, ...Source[]]
}
