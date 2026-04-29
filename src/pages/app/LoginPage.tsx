import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { setCredentials } from '@/features/auth/authSlice'
import { authService } from '@/services/authService'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useT } from '@/hooks/useT'
import type { UserRole } from '@/types/auth.types'

const roleRedirect: Record<UserRole, string> = {
  patient: '/app/patient/home',
  doctor: '/app/doctor/home',
  receptionist: '/app/reception/home',
  admin: '/app/admin/home',
}

export default function LoginPage() {
  const { t, lang } = useT()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAppSelector((s) => s.auth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (isAuthenticated && user) {
    const redirect = user.is_first_login && user.role === 'doctor'
      ? '/app/set-password'
      : roleRedirect[user.role]
    return <Navigate to={redirect} replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await authService.login({ email, password })
      dispatch(setCredentials({ user: data.user, token: data.access, refreshToken: data.refresh }))
      const redirect = data.user.is_first_login && data.user.role === 'doctor'
        ? '/app/set-password'
        : roleRedirect[data.user.role]
      navigate(redirect, { replace: true })
    } catch {
      setError(t.loginError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-[#F7FAFB] flex items-center justify-center p-4"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <h1 className="text-xl font-bold text-accent">{t.appBrand}</h1>
          <p className="text-sm text-[#64748B] mt-1">{t.appTagline}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] p-6">
          <h2 className="text-lg font-bold text-accent mb-1">{t.appLoginTitle}</h2>
          <p className="text-sm text-[#64748B] mb-6">{t.appLoginSub}</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              id="email"
              type="email"
              label={t.fieldEmail}
              placeholder={t.fieldEmailPh}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Input
              id="password"
              type="password"
              label={t.fieldPassword}
              placeholder={t.fieldPasswordPh}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            {error && <p className="text-sm text-error text-center">{error}</p>}

            <Button type="submit" disabled={loading} className="w-full mt-2">
              {loading ? t.loading : t.btnSignin}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
