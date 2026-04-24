import heroImg from '@/assets/hero.png'
import { Button } from '@/components/ui/Button'
import { benefits, services } from '@/constants/data'
import { useT } from '@/hooks/useT'
import { useTitle } from '@/hooks/useTitle'

export default function HomePage() {
  const { t, lang } = useT()
  useTitle(t.nav[0])

  const stats = [
    { num: t.stat1Num, label: t.stat1Label },
    { num: t.stat2Num, label: t.stat2Label },
    { num: t.stat3Num, label: t.stat3Label },
    { num: t.stat4Num, label: t.stat4Label },
  ]

  return (
    <main>
      {/* ── Hero ── */}
      <section className="hero-bg relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
        <div className="hero-dots absolute inset-0 opacity-10" />
        <div className="absolute end-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl bg-primary pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-8 py-20 w-full flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-white">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-success" />
              {t.clinicBadge}
            </span>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              {t.heroTitle1}
              <br />
              <span className="text-white/85">{t.heroTitle2}</span>
            </h1>
            <p className="text-lg text-white/70 max-w-md mb-8 leading-relaxed">{t.heroSub}</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" size="lg" className="shadow-[0_4px_24px_0_rgba(9,20,183,0.5)]">
                {t.cta}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-white border border-white/30 hover:bg-white/10 hover:text-white"
              >
                {t.heroLearnMore}
              </Button>
            </div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end">
            <img
              src={heroImg}
              alt="Codeva Clinic"
              className="w-full max-w-lg object-contain drop-shadow-2xl select-none"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="relative z-10 border-t border-white/10">
          <div className="max-w-[1200px] mx-auto px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center text-white">
                <p className="text-3xl font-extrabold">{s.num}</p>
                <p className="text-sm text-white/60 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 bg-primary-subtle">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold ltr:tracking-widest ltr:uppercase text-primary">{t.servicesLabel}</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-accent mt-2">{t.servicesTitle}</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">{t.servicesSub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((svc, i) => {
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

      {/* ── Why Choose Us ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold ltr:tracking-widest ltr:uppercase text-primary">{t.whyLabel}</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-accent mt-2">{t.whyTitle}</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">{t.whySub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <div
                  key={i}
                  className="bg-primary-subtle border border-[#E2E8F0] rounded-xl p-6 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-accent text-lg mb-2">{b[lang].title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{b[lang].desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-primary py-16">
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">{t.ctaBannerTitle}</h2>
          <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">{t.ctaBannerSub}</p>
          <Button variant="secondary" size="lg">{t.ctaBannerBtn}</Button>
        </div>
      </section>
    </main>
  )
}
