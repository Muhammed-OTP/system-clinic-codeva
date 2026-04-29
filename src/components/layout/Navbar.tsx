import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Activity, Menu, X } from 'lucide-react'
import { useAppDispatch } from '@/store'
import { setLang } from '@/store/uiSlice'
import { useT } from '@/hooks/useT'
import { cn } from '@/utils/cn'

export function Navbar() {
  const { t, lang } = useT()
  const dispatch = useAppDispatch()
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar-glass sticky top-0 z-50 border-b border-[#E2E8F0]">
      <div className="w-full max-w-[1200px] mx-auto px-8 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-9 h-9 rounded-[10px] bg-primary flex items-center justify-center flex-shrink-0">
            <Activity size={20} className="text-white" />
          </div>
          <span className="text-xl font-extrabold text-accent tracking-tight">
            Codeva <span className="text-primary">Clinic</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {t.nav.map((label, i) => {
            const path = t.navPaths[i]
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={cn(
                  'text-sm font-medium px-3 py-1.5 rounded-lg transition-all duration-150 no-underline',
                  active
                    ? 'text-primary font-semibold bg-primary-subtle'
                    : 'text-[#475569] hover:text-primary hover:bg-primary-subtle'
                )}
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div className="flex items-center rounded-full border border-[#E2E8F0] overflow-hidden text-xs font-semibold">
            {(['fr', 'ar'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => dispatch(setLang(l))}
                className={cn(
                  'px-3 py-1.5 transition-colors duration-150 cursor-pointer uppercase',
                  lang === l ? 'bg-primary text-white' : 'text-[#475569] hover:bg-[#F1F5F9]'
                )}
              >
                {l}
              </button>
            ))}
          </div>

          {/* CTA — desktop only */}
          <Link
            to="/auth"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-primary rounded-full px-4 py-2 shadow-[0_4px_14px_0_rgba(9,20,183,0.25)] hover:bg-primary-dark hover:-translate-y-px transition-all duration-200 no-underline"
          >
            {t.cta}
          </Link>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-accent hover:bg-primary-subtle transition-colors duration-150 cursor-pointer"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="bg-white border-t border-[#E2E8F0] px-6 py-4 flex flex-col gap-1">
          {t.nav.map((label, i) => {
            const path = t.navPaths[i]
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={cn(
                  'text-sm font-medium px-3 py-2.5 rounded-lg transition-all duration-150 no-underline',
                  active
                    ? 'text-primary font-semibold bg-primary-subtle'
                    : 'text-[#475569] hover:text-primary hover:bg-primary-subtle'
                )}
              >
                {label}
              </Link>
            )
          })}
          <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
            <Link
              to="/auth"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center text-sm font-semibold text-white bg-primary rounded-full px-4 py-2.5 shadow-[0_4px_14px_0_rgba(9,20,183,0.25)] hover:bg-primary-dark transition-all duration-200 no-underline"
            >
              {t.cta}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
