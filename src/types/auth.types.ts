export type UserRole = 'patient' | 'doctor' | 'receptionist' | 'admin'

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  full_name: string
  phone: string
  role: UserRole
  role_display: string
  is_first_login: boolean
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  access: string
  refresh: string
  user: User
}

export interface RegisterPayload {
  email: string
  first_name: string
  last_name: string
  phone?: string
  password: string
  password_confirm: string
  date_of_birth?: string
  gender?: 'M' | 'F'
  address?: string
  national_id?: string
  emergency_contact?: string
  medical_notes?: string
}
