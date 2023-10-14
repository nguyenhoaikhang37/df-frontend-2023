'use client'

import * as authApi from '../../generated/auth/auth'
import { LoginRequest } from '../../generated/model'
import { StorageKeys } from '../constants'
import { isSSR } from '../functions'

export function useAuth() {
  async function login(payload: LoginRequest) {
    if (isSSR()) return

    const res = await authApi.login(payload)
    const token = res.data?.accessToken

    if (token) {
      localStorage.setItem(StorageKeys.JWT, token)
    }
  }

  async function logout() {
    if (isSSR()) return
    localStorage.removeItem(StorageKeys.JWT)
  }

  return {
    login,
    logout,
  }
}
