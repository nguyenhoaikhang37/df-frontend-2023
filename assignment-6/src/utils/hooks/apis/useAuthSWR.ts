'use client'

import useSWR, { SWRConfiguration } from 'swr'
import { authApi } from '../../../services'
import { LoginPayload } from '../../../types'
import { QueryKeys, StorageKeys } from '../../constants'

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
      isPaused: () => Boolean(!localStorage.getItem(StorageKeys.JWT)),
      ...options,
      onError(err) {
        console.log(err)
        logout()
      },
    },
  )

  async function login(payload: LoginPayload) {
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
    // localStorage.removeItem(StorageKeys.USER_INFO)
  }

  return {
    profile: data?.data ?? {},
    isLoading,
    isError: error,
    login,
    logout,
    isLoggedIn: Boolean(data?.data),
  }
}
