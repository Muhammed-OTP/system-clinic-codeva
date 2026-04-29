import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/store'
import { useT } from '@/hooks/useT'

export default function PatientHomePage() {
  const { t } = useT()
  const navigate = useNavigate()
  const user = useAppSelector((s) => s.auth.user)

  const cards = [
    { label: t.navPatientProfile, desc: t.homeProfileDesc, path: '/app/patient/profile' },
    { label: t.navPatientDoctors, desc: t.homeDoctorsDesc, path: '/app/patient/doctors' },
    { label: t.newAppt, desc: t.homeNewApptDesc, path: '/app/patient/appointments/new' },
    { label: t.navPatientAppointments, desc: t.homeMyApptDesc, path: '/app/patient/appointments' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-accent mb-1">
        {t.welcomeBack} {user?.full_name}
      </h1>
      <p className="text-sm text-[#64748B] mb-8">{t.appTagline}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <button
            key={card.path}
            onClick={() => navigate(card.path)}
            className="bg-white rounded-xl border border-[#E2E8F0] p-5 text-start hover:border-primary hover:shadow-sm transition-all group"
          >
            <p className="font-semibold text-accent group-hover:text-primary transition-colors mb-1">
              {card.label}
            </p>
            <p className="text-sm text-[#64748B]">{card.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
