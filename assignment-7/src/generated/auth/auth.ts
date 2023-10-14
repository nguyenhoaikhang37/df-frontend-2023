/**
 * Generated by orval v6.18.1 🍺
 * Do not edit manually.
 * Swagger API
 * This is a swagger for API.
 * OpenAPI spec version: 1.0
 */
import type {
  LoginResponse,
  LoginRequest,
  MessageResponse,
  SignupRequest,
} from '../model'
import { customInstance } from '../../services/custom-instance'

// eslint-disable-next-line
  type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P,
) => any
  ? P
  : never

/**
 * Login to portal by email
 * @summary Login to portal
 */
export const login = (
  loginRequest: LoginRequest,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<LoginResponse>(
    {
      url: `/auth/login`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: loginRequest,
    },
    options,
  )
}

/**
 * Signup
 * @summary Signup
 */
export const signup = (
  signupRequest: SignupRequest,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<MessageResponse>(
    {
      url: `/auth/signup`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: signupRequest,
    },
    options,
  )
}
