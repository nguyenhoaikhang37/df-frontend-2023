import { StorageKeys } from '../constants'
import { isSSR } from './common'

export function getAccessToken(): string | null {
  if (isSSR()) {
    return null
  }

  try {
    return window.localStorage.getItem(StorageKeys.JWT) || null
  } catch (error) {
    return null
  }
}

export const isPausedIfNoJWT = () =>
  isSSR() ? true : Boolean(!localStorage.getItem(StorageKeys.JWT))
