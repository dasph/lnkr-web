export type AuthPayload <T> = {
  payload: T
  key: string
}

export type Point = Record<'x' | 'y', string>

export type Link = {
  id: number
  value: string
  createdAt: Date
}

export type Hit = {
  ip: string
  town: string
  country: string
  location: Point
  createdAt: Date
}
