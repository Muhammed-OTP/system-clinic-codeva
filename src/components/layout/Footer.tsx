import { Link } from 'react-router-dom'
import { Activity, Phone, Mail, MapPin } from 'lucide-react'

function FacebookIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
import { useT } from '@/hooks/useT'

export function Footer() {
  const { t } = useT()

  const quickLinks = t.nav.map((label, i) => ({ label, path: t.navPaths[i] }))
  const footerSpecialities = ['Cardiologie', 'Pédiatrie', 'Dermatologie', 'Neurologie', 'Orthopédie', 'Urgences']

  return (
    <footer style={{ background: '#1E2A38' }} className="text-white pt-14 pb-8">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-[10px] bg-primary flex items-center justify-center">
                <Activity size={18} className="text-white" />
              </div>
              <span className="text-lg font-extrabold">Codeva <span className="text-primary">Clinic</span></span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {t.footerTagline}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">{t.footerQuickLinks}</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link to={path} className="text-sm no-underline transition-colors duration-150 hover:text-white" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialities */}
          <div>
            <h4 className="text-sm font-semibold mb-4">{t.footerSpecialities}</h4>
            <ul className="space-y-2.5">
              {footerSpecialities.map((s) => (
                <li key={s}>
                  <Link to="/specialities" className="text-sm no-underline transition-colors duration-150 hover:text-white" style={{ color: 'rgba(255,255,255,0.65)' }}>
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4">{t.footerContact}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                <Phone size={14} className="flex-shrink-0" />
                +213 XX XX XX XX
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                <Mail size={14} className="flex-shrink-0" />
                contact@codeva-clinic.dz
              </li>
              <li className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                <MapPin size={14} className="flex-shrink-0" />
                123 Rue de la Santé, Alger
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between pt-6">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{t.footerCopyright}</p>
          <a
            href="#"
            aria-label="Facebook"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 transition-colors duration-150 hover:bg-[#1877F2] hover:border-[#1877F2]"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            <FacebookIcon size={14} />
          </a>
        </div>
      </div>
    </footer>
  )
}
