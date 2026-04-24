import { Button } from '@/components/ui/Button'
import { services } from '@/constants/data'
import { useT } from '@/hooks/useT'
import { useTitle } from '@/hooks/useTitle'
import { Link } from 'react-router-dom'

export default function ServicesPage() {
  const { t, lang } = useT()
  useTitle(t.nav[2])

  return (
    <main>
      {/* ── Banner ── */}
      <section className="hero-bg py-24 relative overflow-hidden">
        <div className="hero-dots absolute inset-0 opacity-10" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-8 text-center text-white">
          <span className="text-xs font-bold ltr:tracking-widest ltr:uppercase text-white/60">
            {t.servicesLabel}
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mt-2">{t.servicesTitle}</h1>
          <p className="mt-4 text-white/70 max-w-xl mx-auto text-lg">{t.servicesSub}</p>
        </div>
      </section>

      {/* ── Services Grid ── */}
      <section className="py-20 bg-primary-subtle">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => {
              const Icon = svc.icon
              return (
                <div
                  key={i}
                  className="bg-white border border-[#E2E8F0] rounded-xl p-6 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-subtle flex items-center justify-center mb-4">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-accent text-lg mb-2">{svc[lang].title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{svc[lang].desc}</p>
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
