import { specialities } from '@/constants/data'
import { useT } from '@/hooks/useT'
import { useTitle } from '@/hooks/useTitle'

export default function SpecialitiesPage() {
  const { t, lang } = useT()
  useTitle(t.nav[4])

  return (
    <main>
      {/* ── Banner ── */}
      <section className="hero-bg py-24 relative overflow-hidden">
        <div className="hero-dots absolute inset-0 opacity-10" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-8 text-center text-white">
          <span className="text-xs font-bold ltr:tracking-widest ltr:uppercase text-white/60">
            {t.specLabel}
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mt-2">{t.specTitle}</h1>
          <p className="mt-4 text-white/70 max-w-xl mx-auto text-lg">{t.specSub}</p>
        </div>
      </section>

      {/* ── Specialities Grid ── */}
      <section className="py-20 bg-primary-subtle">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {specialities.map((spec, i) => {
              const Icon = spec.icon
              return (
                <div
                  key={i}
                  className="bg-white border border-[#E2E8F0] rounded-xl p-6 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:-translate-y-[3px] hover:shadow-xl cursor-default"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary-subtle flex items-center justify-center">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <span className="font-semibold text-accent text-sm leading-tight">
                    {lang === 'ar' ? spec.ar : spec.fr}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
