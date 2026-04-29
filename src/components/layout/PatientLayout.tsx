import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, User, Stethoscope, CalendarDays, LogOut } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/store'
import { logout } from '@/features/auth/authSlice'
import { clearPatientState } from '@/features/patient/patientSlice'
import { useT } from '@/hooks/useT'

const getInitials = (name: string) =>
  name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()

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
    { to: '/app/patient/home', label: t.navPatientHome, icon: LayoutDashboard },
    { to: '/app/patient/profile', label: t.navPatientProfile, icon: User },
    { to: '/app/patient/doctors', label: t.navPatientDoctors, icon: Stethoscope },
    { to: '/app/patient/appointments', label: t.navPatientAppointments, icon: CalendarDays },
  ]

  const initials = user?.full_name ? getInitials(user.full_name) : '?'

  return (
    <div className="flex min-h-screen bg-[#F7FAFB]" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside className="w-64 bg-primary flex flex-col shrink-0 sticky top-0 h-screen">
        {/* Brand */}
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">{t.appBrand}</p>
              <p className="text-white/50 text-[10px] leading-tight mt-0.5">{t.appTagline}</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'text-white/55 hover:bg-white/10 hover:text-white/90'
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-4 py-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <span className="text-white text-[11px] font-bold">{initials}</span>
            </div>
            <span className="text-white/75 text-sm truncate flex-1">{user?.full_name}</span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 text-white/50 hover:text-white/90 text-sm w-full transition-colors cursor-pointer"
          >
            <LogOut size={15} />
            <span>{t.navLogout}</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
