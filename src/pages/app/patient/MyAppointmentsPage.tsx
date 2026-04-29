import { useT } from '@/hooks/useT'

export default function MyAppointmentsPage() {
  const { t } = useT()

  return (
    <div>
      <h1 className="text-2xl font-bold text-accent mb-6">{t.myApptTitle}</h1>
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-10 text-center">
        <p className="text-lg font-semibold text-[#64748B] mb-2">{t.myApptComingSoon}</p>
        <p className="text-sm text-[#94A3B8]">{t.myApptWaitingMsg}</p>
      </div>
    </div>
  )
}
