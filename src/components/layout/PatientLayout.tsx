import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { logout } from '@/features/auth/authSlice'
import { clearPatientState } from '@/features/patient/patientSlice'
import { useT } from '@/hooks/useT'

export default function PatientLayout() {
  const { t, lang } = useT()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((s) => s.auth.user)

  const handleLogout = () => {
    dispatch(clearPatientState())
    dispatch(logout())
    navigate('/app/login', { replace: true })
  }

  const navLinks = [
    { to: '/app/patient/home', label: t.navPatientHome },
    { to: '/app/patient/profile', label: t.navPatientProfile },
    { to: '/app/patient/doctors', label: t.navPatientDoctors },
    { to: '/app/patient/appointments', label: t.navPatientAppointments },
  ]

  return (
    <div className="min-h-screen bg-[#F7FAFB]" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <nav className="bg-white border-b border-[#E2E8F0] px-6 h-14 flex items-center justify-between sticky top-0 z-10">
        <span className="font-bold text-primary text-sm">{t.appBrand}</span>
        <div className="flex items-center gap-5">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-[#64748B] hover:text-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#64748B] hidden sm:block">{user?.full_name}</span>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-error hover:underline cursor-pointer"
          >
            {t.navLogout}
          </button>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}
