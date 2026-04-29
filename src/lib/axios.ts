import axios from 'axios'
import { store } from '@/store'
import { logout, setToken } from '@/features/auth/authSlice'

const BASE_URL = import.meta.env.VITE_API_URL ?? 'https://codevasante.pythonanywhere.com/api'

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
})

// Inject Bearer token on every request
apiClient.interceptors.request.use((config) => {
  const token = store.getState().auth.token
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// On 401: attempt one token refresh, queue concurrent requests, force logout if refresh fails
let isRefreshing = false
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = []

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)))
  failedQueue = []
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config as typeof error.config & { _retry?: boolean }

    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error)
    }

    const refreshToken = store.getState().auth.refreshToken

    if (!refreshToken) {
      store.dispatch(logout())
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((token) => {
        original.headers.Authorization = `Bearer ${token}`
        return apiClient(original)
      })
    }

    original._retry = true
    isRefreshing = true

    try {
      // Use plain axios (not apiClient) to avoid triggering this interceptor recursively
      const { data } = await axios.post(`${BASE_URL}/auth/refresh/`, { refresh: refreshToken })
      const newToken: string = data.access
      store.dispatch(setToken(newToken))
      processQueue(null, newToken)
      original.headers.Authorization = `Bearer ${newToken}`
      return apiClient(original)
    } catch (refreshError) {
      processQueue(refreshError)
      store.dispatch(logout())
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

export default apiClient
