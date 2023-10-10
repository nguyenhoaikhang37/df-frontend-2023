'use client'

import useSWR, { SWRConfiguration } from 'swr'
import { topicApi } from '../../../services'
import { QueryKeys } from '../../constants'

export interface UseTopicSWRProps {
  options?: SWRConfiguration
}

export function useTopicSWR({ options }: UseTopicSWRProps = {}) {
  const { data, error, isLoading } = useSWR(
    QueryKeys.GET_TOPIC_LIST,
    () => topicApi.getAll(),
    {
      dedupingInterval: 60 * 60 * 1000, // 1hr
      ...options,
    },
  )

  return {
    topicList: data?.data ?? [],
    isLoading,
    isError: error,
  }
}
