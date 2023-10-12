import { isSSR } from './common'
import { UserProfile } from '../../types'
import { StorageKeys } from '../constants'

export function getAccessToken(): UserProfile | null {
  if (isSSR()) {
    return null
  }

  try {
    return JSON.parse(window.localStorage.getItem(StorageKeys.JWT) || '')
  } catch (error) {
    return null
  }
}
