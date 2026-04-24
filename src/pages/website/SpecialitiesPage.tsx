import { useRef } from 'react'
import { Heart, Baby, Brain, Eye, Bone, Stethoscope, Activity, Pill, ChevronDown } from 'lucide-react'
import { specialities } from '@/constants/data'
import { useT } from '@/hooks/useT'
import { useTitle } from '@/hooks/useTitle'

const mosaicIcons = [Heart, Baby, Brain, Eye, Bone, Stethoscope, Activity, Pill, Heart]
const mosaicOpacity = ['opacity-10', 'opacity-20', 'opacity-30']

export default function SpecialitiesPage() {
  const { t, lang } = useT()
  useTitle(t.nav[4])
  const contentRef = useRef<HTMLElement>(null)

  return (
    <main>
      {/* ── Banner ── */}
      <section className="hero-bg pt-28 pb-10 relative overflow-hidden">
        <div className="hero-dots absolute inset-0 opacity-10" />

        {/* Icon mosaic decoration */}
        <div className="absolute end-8 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:grid grid-cols-3 gap-3">
          {mosaicIcons.map((Icon, i) => (
            <div
              key={i}
              className={`w-12 h-12 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center ${mosaicOpacity[i % 3]}`}
            >
              <Icon size={20} className="text-white" />
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-8 text-center text-white">
          <span className="text-xs font-bold ltr:tracking-widest ltr:uppercase text-white/60">
            {t.specLabel}
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mt-2">{t.specTitle}</h1>
          <p className="mt-4 text-white/70 max-w-xl mx-auto text-lg">{t.specSub}</p>
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

      {/* ── Specialities Grid ── */}
      <section ref={contentRef} className="py-20 bg-primary-subtle">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {specialities.map((spec, i) => {
              const Icon = spec.icon
              return (
                <div
                  key={i}
                  className="group bg-white border border-[#E2E8F0] rounded-2xl p-6 flex flex-col items-center text-center gap-4 transition-all duration-300 hover:-translate-y-[4px] hover:shadow-xl hover:border-primary/20 cursor-default"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center group-hover:from-primary group-hover:to-primary-dark transition-all duration-300 shadow-sm">
                    <Icon size={26} className="text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="font-semibold text-accent text-sm leading-snug">
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
