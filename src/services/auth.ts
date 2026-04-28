import apiClient from '@/lib/axios'
import type { User } from '@/types/models'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  access: string
  refresh: string
  user: User
}

export interface SetPasswordPayload {
  new_password: string
  confirm_password: string
}

export const authService = {
  login: (data: LoginPayload) =>
    apiClient.post<LoginResponse>('/auth/login/', data),

  me: () =>
    apiClient.get<User>('/auth/me/'),

  setFirstPassword: (data: SetPasswordPayload) =>
    apiClient.post('/auth/first-login/set-password/', data),

  changePassword: (data: { old_password: string; new_password: string; confirm_password: string }) =>
    apiClient.post('/auth/change-password/', data),
}
