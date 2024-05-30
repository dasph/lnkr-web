import type { Error, Methods, Payloads, Responses, Services } from '@types'

type Init = <T extends { [K in keyof T]: T[K] }> (payload: T) => RequestInit

const get: Init = (payload) => ({ method: 'get', headers: payload })

const post: Init = (payload) => ({ method: 'post', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) })

const init: Record<Methods[keyof Methods], Init> = { get, post }

export const fetchApi = async <S extends Services, M extends Methods[S]> (service: S, method: M, payload: Payloads[S][M]): Promise<Responses[S][M]> => {
  const options = init[method](payload)

  const response: Responses[S][M] | Error = await fetch(`${import.meta.env.VITE_API_URL}/${service}`, options).then((response) => response.json())
  if (typeof response === 'object' && response !== null && 'error' in response) throw new Error(response.error)

  return response
}
