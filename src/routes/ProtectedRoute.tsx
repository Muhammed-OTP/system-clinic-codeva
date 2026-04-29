import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/store'
import type { UserRole } from '@/types/auth.types'

interface Props {
  role: UserRole
  children: ReactNode
}

export default function ProtectedRoute({ role, children }: Props) {
  const { user, isAuthenticated } = useAppSelector((s) => s.auth)

  if (!isAuthenticated || !user) {
    return <Navigate to="/app/login" replace />
  }

  if (user.role !== role) {
    return <Navigate to="/app/unauthorized" replace />
  }

  return <>{children}</>
}
