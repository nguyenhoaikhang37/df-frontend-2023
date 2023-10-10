import { ResponseWithData, Topic } from '../types'
import axiosClient from './axios-client'

export const topicApi = {
  getAll(): Promise<ResponseWithData<Array<Topic>>> {
    return axiosClient.get('/topics')
  },
}
