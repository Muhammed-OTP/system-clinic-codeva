import { useRef, useState } from 'react'
import { X, Award, GraduationCap, Briefcase, Building2, Stethoscope, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { doctors, type Doctor } from '@/constants/data'
import { useT } from '@/hooks/useT'
import { useTitle } from '@/hooks/useTitle'
import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

function DoctorModal({ doctor, onClose }: { doctor: Doctor; onClose: () => void }) {
  const { t, lang } = useT()

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* Modal header */}
        <div className="hero-bg rounded-t-2xl p-6 relative overflow-hidden">
          <div className="hero-dots absolute inset-0 opacity-10 pointer-events-none" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 end-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white transition-colors z-10"
            aria-label={t.dmClose}
          >
            <X size={16} />
          </button>
          <div className="flex items-center gap-4 relative z-10">
            {doctor.image ? (
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-2xl object-cover object-top flex-shrink-0 border-2 border-white/30"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0 border border-white/20">
                <Stethoscope size={28} className="text-white" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-extrabold text-white">{doctor.name}</h2>
              <p className="text-white/80 text-sm mt-0.5">
                {lang === 'ar' ? doctor.specialtyAr : doctor.specialtyFr}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 mt-4 relative z-10 bg-white/15 border border-white/25 text-white text-xs font-semibold px-3 py-1 rounded-full">
            <Award size={12} />
            {t.dmCertified}
          </span>
        </div>

        {/* Modal body */}
        <div className="p-6 space-y-5">
          {/* Education */}
          <div className="bg-primary-subtle rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center">
                <GraduationCap size={14} className="text-primary" />
              </div>
              <h3 className="font-bold text-accent text-sm ltr:tracking-wide ltr:uppercase">
                {t.dmEducation}
              </h3>
            </div>
            <ul className="space-y-2">
              <li className="text-sm text-slate-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                {doctor.degree}
              </li>
              <li className="text-sm text-slate-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                {doctor.specialization}
              </li>
            </ul>
          </div>

          {/* Experience */}
          <div className="bg-primary-subtle rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center">
                <Briefcase size={14} className="text-primary" />
              </div>
              <h3 className="font-bold text-accent text-sm ltr:tracking-wide ltr:uppercase">
                {t.dmExperience}
              </h3>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold text-primary">{doctor.yearsExp}</span>
              <span className="text-sm font-medium text-slate-500">{t.dmYearsExp}</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {lang === 'ar' ? doctor.domainsAr : doctor.domainsFr}
            </p>
          </div>

          {/* Workplaces */}
          <div className="bg-primary-subtle rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center">
                <Building2 size={14} className="text-primary" />
              </div>
              <h3 className="font-bold text-accent text-sm ltr:tracking-wide ltr:uppercase">
                {t.dmWorkplaces}
              </h3>
            </div>
            <ul className="space-y-2">
              {doctor.workplaces.map((wp, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                      wp.type === 'gov'
                        ? 'bg-blue-50 text-blue-600 border-blue-100'
                        : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    }`}
                  >
                    {wp.type === 'gov' ? '🏛' : '🏥'}
                  </span>
                  <span className="text-sm text-slate-700">{wp.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal footer */}
        <div className="px-6 pb-6 flex gap-3 justify-end border-t border-[#E2E8F0] pt-4">
          <Button variant="outline" size="md" onClick={onClose}>{t.dmClose}</Button>
          <Link to="/auth">
            <Button variant="primary" size="md">{t.dmBook}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function DoctorsPage() {
  const { t, lang } = useT()
  useTitle(t.nav[2])
  const contentRef = useRef<HTMLElement>(null)
  const [selected, setSelected] = useState<Doctor | null>(null)

  return (
    <main>
      {/* ── Banner ── */}
      <section className="hero-bg pt-28 pb-10 relative overflow-hidden">
        <div className="hero-dots absolute inset-0 opacity-10" />

        {/* Decorative composition */}
        <div className="absolute end-12 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
          <div className="relative w-56 h-56">
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-10 rounded-full border border-white/15" />
            <Stethoscope size={80} className="text-white/18 absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2" />
            <Award size={34} className="text-white/22 absolute -top-2 end-6" />
            <GraduationCap size={28} className="text-white/15 absolute -bottom-2 start-6" />
          </div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-8 text-center text-white">
          <span className="text-xs font-bold ltr:tracking-widest ltr:uppercase text-white/60">
            {t.doctorsLabel}
          </span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mt-2">{t.doctorsTitle}</h1>
          <p className="mt-4 text-white/70 max-w-xl mx-auto text-lg">{t.doctorsSub}</p>
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

      {/* ── Doctor Cards ── */}
      <section ref={contentRef} className="py-20 bg-primary-subtle">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className="group bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-[4px] hover:shadow-xl hover:border-primary/20 flex flex-col"
              >
                {/* Card avatar */}
                <div className={cn(
                  'h-40 hero-bg relative overflow-hidden',
                  !doc.image && 'flex flex-col items-center justify-center gap-2'
                )}>
                  {doc.image ? (
                    <>
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="absolute inset-0 w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                      <span className="absolute bottom-2 start-0 end-0 flex justify-center z-10">
                        <span className="bg-white/15 border border-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          {doc.yearsExp} {t.dmYearsExp}
                        </span>
                      </span>
                    </>
                  ) : (
                    <>
                      <div className="hero-dots absolute inset-0 opacity-10" />
                      <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/20 flex items-center justify-center relative z-10">
                        <Stethoscope size={28} className="text-white" />
                      </div>
                      <span className="relative z-10 bg-white/15 border border-white/20 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {doc.yearsExp} {t.dmYearsExp}
                      </span>
                    </>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-accent text-base">{doc.name}</h3>
                  <p className="text-primary text-sm font-semibold mt-0.5">
                    {lang === 'ar' ? doc.specialtyAr : doc.specialtyFr}
                  </p>
                  <p className="text-slate-500 text-xs leading-relaxed mt-2 flex-1">
                    {lang === 'ar' ? doc.bioAr : doc.bioFr}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setSelected(doc)}
                    >
                      {t.viewProfile}
                    </Button>
                    <Link to="/auth" className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">{t.book}</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && <DoctorModal doctor={selected} onClose={() => setSelected(null)} />}
    </main>
  )
}
