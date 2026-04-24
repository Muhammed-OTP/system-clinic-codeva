import { useRef } from 'react'
import { Heart, Users, Shield, ChevronDown, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useT } from '@/hooks/useT'
import { useTitle } from '@/hooks/useTitle'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  const { t } = useT()
  useTitle(t.nav[1])
  const contentRef = useRef<HTMLElement>(null)

  const stats = [
    { num: t.stat1Num, label: t.stat1Label },
    { num: t.stat2Num, label: t.stat2Label },
    { num: t.stat3Num, label: t.stat3Label },
    { num: t.stat4Num, label: t.stat4Label },
  ]

  return (
    <main>
      {/* ── Banner ── */}
      <section className="hero-bg pt-28 pb-10 relative overflow-hidden">
        <div className="hero-dots absolute inset-0 opacity-10" />

        {/* Decorative icon composition */}
        <div className="absolute end-12 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
          <div className="relative w-56 h-56">
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-8 rounded-full border border-white/15" />
            <Heart size={72} className="text-white/20 absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2" />
            <Users size={32} className="text-white/20 absolute -top-2 end-4" />
            <Shield size={28} className="text-white/15 absolute -bottom-2 start-4" />
          </div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-8 text-center text-white">
          <span className="text-xs font-bold ltr:tracking-widest ltr:uppercase text-white/60">
            {t.aboutLabel}
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mt-2">{t.aboutTitle}</h1>
          <p className="mt-4 text-white/70 max-w-xl mx-auto text-lg leading-relaxed">{t.aboutP1.split('.')[0]}.</p>
        </div>

        {/* Scroll arrow */}
        <div className="relative z-10 flex justify-center mt-8 pb-2">
          <button
            type="button"
            onClick={() => contentRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-1 text-white/50 hover:text-white transition-colors"
            aria-label="scroll down"
          >
            <ChevronDown size={30} className="animate-bounce" />
          </button>
        </div>
      </section>

      {/* ── Story ── */}
      <section ref={contentRef} className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Text block */}
            <div>
              <p className="text-slate-600 leading-relaxed mb-5 text-base">{t.aboutP1}</p>
              <p className="text-slate-600 leading-relaxed mb-8 text-base">{t.aboutP2}</p>

              {/* Mission card */}
              <div className="border-s-4 border-primary bg-primary-subtle rounded-e-2xl p-6">
                <h3 className="text-base font-bold text-accent mb-2">{t.aboutMission}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{t.aboutMissionText}</p>
              </div>

              <div className="mt-8">
                <Link to="/contact">
                  <Button variant="primary" size="lg">{t.cta}</Button>
                </Link>
              </div>
            </div>

            {/* Visual — key facts */}
            <div className="space-y-4">
              {[
                { num: t.stat1Num, label: t.stat1Label },
                { num: t.stat2Num, label: t.stat2Label },
                { num: t.stat3Num, label: t.stat3Label },
                { num: t.stat4Num, label: t.stat4Label },
              ].map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 bg-primary-subtle border border-[#E2E8F0] rounded-2xl p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 shadow-[0_4px_14px_0_rgba(9,20,183,0.25)]">
                    <CheckCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-primary leading-none">{s.num}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats band ── */}
      <section className="bg-dark py-14">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {stats.map((s, i) => (
            <div key={i} className="text-center bg-dark px-6 py-8">
              <p className="text-4xl font-extrabold text-white">{s.num}</p>
              <p className="text-sm text-white/50 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
