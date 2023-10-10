import { LoginPayload, UserProfile, ResponseWithData } from '../types'
import axiosClient from './axios-client'

export const authApi = {
  login(payload: LoginPayload): Promise<ResponseWithData<UserProfile>> {
    return axiosClient.post('/auth/login', payload)
  },

  getProfile(): Promise<ResponseWithData<UserProfile>> {
    return axiosClient.get('/me')
  },
}
