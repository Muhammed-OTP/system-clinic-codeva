import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '@/store'

export default function ProtectedRoute() {
  const isAuthenticated = useAppSelector((s) => s.auth.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/app/login" replace />
  }

  return <Outlet />
}
