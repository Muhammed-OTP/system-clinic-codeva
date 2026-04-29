import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/types/auth.types'

interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
}

function loadFromStorage(): AuthState {
  try {
    const token = localStorage.getItem('auth_token')
    const refreshToken = localStorage.getItem('auth_refresh')
    const raw = localStorage.getItem('auth_user')
    const user: User | null = raw ? (JSON.parse(raw) as User) : null
    if (token && user) {
      return { user, token, refreshToken, isAuthenticated: true }
    }
  } catch {
    // corrupt storage — fall through to empty state
  }
  return { user: null, token: null, refreshToken: null, isAuthenticated: false }
}

const authSlice = createSlice({
  name: 'auth',
  initialState: loadFromStorage,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ user: User; token: string; refreshToken: string }>
    ) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
      state.isAuthenticated = true
      localStorage.setItem('auth_token', action.payload.token)
      localStorage.setItem('auth_refresh', action.payload.refreshToken)
      localStorage.setItem('auth_user', JSON.stringify(action.payload.user))
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
      localStorage.setItem('auth_token', action.payload)
    },
    logout(state) {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.isAuthenticated = false
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_refresh')
      localStorage.removeItem('auth_user')
    },
  },
})

export const { setCredentials, setToken, logout } = authSlice.actions
export default authSlice.reducer
