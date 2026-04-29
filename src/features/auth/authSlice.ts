import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/types/auth.types'

interface AuthState {
  user: User | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ user: User; token: string; refreshToken: string }>
    ) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
      state.isAuthenticated = true
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    logout(state) {
      state.user = null
      state.token = null
      state.refreshToken = null
      state.isAuthenticated = false
    },
  },
})

export const { setCredentials, setToken, logout } = authSlice.actions
export default authSlice.reducer
