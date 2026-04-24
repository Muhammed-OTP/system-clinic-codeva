import { useRef } from 'react'
import { Activity, Heart, Brain, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { services } from '@/constants/data'
import { useT } from '@/hooks/useT'
import { useTitle } from '@/hooks/useTitle'
import { Link } from 'react-router-dom'

export default function ServicesPage() {
  const { t, lang } = useT()
  useTitle(t.nav[2])
  const contentRef = useRef<HTMLElement>(null)

  return (
    <main>
      {/* ── Banner ── */}
      <section className="hero-bg pt-28 pb-10 relative overflow-hidden">
        <div className="hero-dots absolute inset-0 opacity-10" />

        {/* Decorative icons */}
        <div className="absolute end-10 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
          <div className="relative w-52 h-52">
            <Activity size={100} className="text-white/15 absolute top-0 end-0" />
            <Heart size={52} className="text-white/20 absolute bottom-2 start-0" />
            <Brain size={42} className="text-white/12 absolute top-16 start-10" />
            <div className="absolute inset-0 rounded-full bg-white/3 blur-3xl" />
          </div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-8 text-center text-white">
          <span className="text-xs font-bold ltr:tracking-widest ltr:uppercase text-white/60">
            {t.servicesLabel}
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mt-2">{t.servicesTitle}</h1>
          <p className="mt-4 text-white/70 max-w-xl mx-auto text-lg">{t.servicesSub}</p>
        </div>

        {/* Scroll arrow */}
        <div className="relative z-10 flex justify-center mt-8 pb-2">
          <button
            type="button"
            onClick={() => contentRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="text-white/50 hover:text-white transition-colors"
            aria-label="scroll down"
          >
            <ChevronDown size={30} className="animate-bounce" />
          </button>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section ref={contentRef} className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => {
              const Icon = svc.icon
              return (
                <div
                  key={i}
                  className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-[4px] hover:shadow-xl hover:border-primary/20 flex flex-col"
                >
                  {/* Number + icon row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center group-hover:from-primary group-hover:to-primary-dark transition-all duration-300">
                      <Icon size={24} className="text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-xs font-bold text-slate-200 group-hover:text-primary/30 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-bold text-accent text-base mb-2">{svc[lang].title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1">{svc[lang].desc}</p>
                  {/* Hover accent bar */}
                  <div className="h-0.5 w-0 group-hover:w-full bg-primary/30 mt-4 transition-all duration-500 rounded-full" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-primary py-16">
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-3">{t.ctaBannerTitle}</h2>
          <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">{t.ctaBannerSub}</p>
          <Link to="/contact">
            <Button variant="secondary" size="lg">{t.ctaBannerBtn}</Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
