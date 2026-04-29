import { ShieldX } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useT } from '@/hooks/useT'
import { useAppSelector } from '@/store'

const roleHome: Record<string, string> = {
  patient: '/app/patient/home',
  doctor: '/app/doctor/home',
  receptionist: '/app/reception/home',
  admin: '/app/admin/home',
}

export default function UnauthorizedPage() {
  const { t } = useT()
  const user = useAppSelector((s) => s.auth.user)
  const homeHref = user ? (roleHome[user.role] ?? '/app/login') : '/app/login'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6 text-center">
      <ShieldX size={64} className="text-[var(--color-error)]" />
      <h1 className="text-2xl font-bold text-[var(--color-accent)]">{t.unauthorizedTitle}</h1>
      <p className="text-gray-500 max-w-sm">{t.unauthorizedSub}</p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link
          to={homeHref}
          className="px-5 py-2.5 rounded-lg border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)] transition-colors text-sm font-medium"
        >
          {t.unauthorizedBack}
        </Link>
        <Link
          to="/app/login"
          className="px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] transition-colors text-sm font-medium"
        >
          {t.unauthorizedLogin}
        </Link>
      </div>
    </div>
  )
}
