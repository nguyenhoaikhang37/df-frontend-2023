import { UserProfile } from '../../types'
import { StorageKeys } from '../constants'

export function getAccessToken(): UserProfile | null {
  try {
    return JSON.parse(localStorage.getItem(StorageKeys.JWT) || '')
  } catch (error) {
    return null
  }
}
