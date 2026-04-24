import { Users } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useT } from '@/hooks/useT'
import { useTitle } from '@/hooks/useTitle'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  const { t } = useT()
  useTitle(t.nav[1])

  const stats = [
    { num: t.stat1Num, label: t.stat1Label },
    { num: t.stat2Num, label: t.stat2Label },
    { num: t.stat3Num, label: t.stat3Label },
    { num: t.stat4Num, label: t.stat4Label },
  ]

  return (
    <main>
      {/* ── Banner ── */}
      <section className="hero-bg py-24 relative overflow-hidden">
        <div className="hero-dots absolute inset-0 opacity-10" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-8 text-center text-white">
          <span className="text-xs font-bold ltr:tracking-widest ltr:uppercase text-white/60">
            {t.aboutLabel}
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mt-2">{t.aboutTitle}</h1>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-slate-600 leading-relaxed mb-6 text-lg">{t.aboutP1}</p>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">{t.aboutP2}</p>
              <div className="p-6 bg-primary-subtle border border-[#E2E8F0] rounded-2xl">
                <h3 className="text-lg font-bold text-accent mb-2">{t.aboutMission}</h3>
                <p className="text-slate-600 leading-relaxed">{t.aboutMissionText}</p>
              </div>
              <div className="mt-8">
                <Link to="/contact">
                  <Button variant="primary" size="lg">{t.cta}</Button>
                </Link>
              </div>
            </div>

            {/* Team photo placeholder */}
            <div className="rounded-2xl bg-gradient-to-br from-primary/8 to-primary/3 border border-[#E2E8F0] h-80 lg:h-[420px] flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Users size={36} className="text-primary/50" />
              </div>
              <p className="text-primary/30 text-sm font-medium">Codeva Clinic Team</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-primary py-16">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center text-white">
              <p className="text-4xl font-extrabold">{s.num}</p>
              <p className="text-sm text-white/60 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
