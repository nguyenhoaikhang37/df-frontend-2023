export interface LoginPayload {
  email: string
  password: string
}

export interface UserProfile {
  accessToken: string
  email: string
  id: number
}
