'use client'

import useSWR, { SWRConfiguration } from 'swr'
import { authApi } from '../../../services'
import { LoginPayload, UserProfile } from '../../../types'
import { QueryKeys, StorageKeys } from '../../constants'
import { isSSR } from '../../functions'

export interface UseAuthSWRProps {
  options?: Partial<SWRConfiguration>
}

export function useAuthSWR({ options }: UseAuthSWRProps = {}) {
  const { data, error, isLoading, mutate } = useSWR(
    QueryKeys.GET_PROFILE,
    () => authApi.getProfile(),
    {
      dedupingInterval: 60 * 60 * 1000, // 1hr
      revalidateOnFocus: false,
      isPaused: () =>
        isSSR() ? true : Boolean(!localStorage.getItem(StorageKeys.JWT)),
      ...options,
      onError(err) {
        console.log(err)
        logout()
      },
    },
  )

  async function login(payload: LoginPayload) {
    if (isSSR()) return

    const data = await authApi.login(payload)

    if (data?.data?.accessToken) {
      localStorage.setItem(
        StorageKeys.JWT,
        JSON.stringify(data.data.accessToken),
      )
    }

    await mutate()
  }

  async function logout() {
    if (isSSR()) return
    localStorage.removeItem(StorageKeys.JWT)
  }

  return {
    profile: (data?.data ?? {}) as UserProfile | undefined,
    isLoading,
    isError: error,
    login,
    logout,
    isLoggedIn: Boolean(data?.data),
  }
}
