import apiClient from '@/lib/axios'
import type { LoginPayload, LoginResponse, RegisterPayload, User } from '@/types/auth.types'

export const authService = {
  login: (payload: LoginPayload) =>
    apiClient.post<LoginResponse>('/auth/login/', payload).then((r) => r.data),

  register: (payload: RegisterPayload) =>
    apiClient
      .post<{ message: string; data: User }>('/auth/register/patient/', payload)
      .then((r) => r.data),

  me: () => apiClient.get<User>('/auth/me/').then((r) => r.data),

  setFirstPassword: (payload: { new_password: string; confirm_password: string }) =>
    apiClient
      .post<{ message: string }>('/auth/first-login/set-password/', payload)
      .then((r) => r.data),

  changePassword: (payload: {
    old_password: string
    new_password: string
    confirm_password: string
  }) =>
    apiClient
      .post<{ message: string }>('/auth/change-password/', payload)
      .then((r) => r.data),
}
