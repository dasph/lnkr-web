import type { AuthenticationResponseJSON, PublicKeyCredentialCreationOptionsJSON, PublicKeyCredentialRequestOptionsJSON, RegistrationResponseJSON } from '@simplewebauthn/types'

import { AuthPayload } from './api'

type Service<N, M, P, R> = {
  name: N
  method: M,
  payload: P
  response: R
}

type List = [
  Service<'auth/signin', 'get', {}, AuthPayload<PublicKeyCredentialRequestOptionsJSON>>,
  Service<'auth/signin', 'post', AuthPayload<AuthenticationResponseJSON>, { verified: boolean }>,
  Service<'auth/signup', 'get', { name: string }, AuthPayload<PublicKeyCredentialCreationOptionsJSON>>,
  Service<'auth/signup', 'post', AuthPayload<RegistrationResponseJSON>, { verified: boolean }>
]

export type Error = { error: string }

export type Services = List[number]['name']

export type Methods = {
  [N in Services]: Extract<List[number], { name: N }>['method']
}

export type Payloads = {
  [N in Services]: { [M in Methods[N]]: Extract<List[number], { name: N, method: M }>['payload'] }
}

export type Responses = {
  [N in Services]: { [M in Methods[N]]: Extract<List[number], { name: N, method: M }>['response'] }
}
