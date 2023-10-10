import axios, { AxiosError } from 'axios'
import { getAccessToken } from '../utils/functions'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.request.use(async (config) => {
  const jwt = await getAccessToken()

  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`
  }

  return config
})

axiosClient.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error: AxiosError) {
    return Promise.reject(error.response?.data)
  },
)

export default axiosClient
