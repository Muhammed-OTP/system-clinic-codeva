import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/store'
import { useT } from '@/hooks/useT'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export default function DoctorDetailPage() {
  const { t } = useT()
  const navigate = useNavigate()
  const doctor = useAppSelector((s) => s.patient.selectedDoctor)

  if (!doctor) {
    return (
      <div className="text-center py-16">
        <p className="text-[#64748B] mb-5">{t.doctorDetailNotFound}</p>
        <Button type="button" variant="outline" onClick={() => navigate('/app/patient/doctors')}>
          {t.doctorDetailBack}
        </Button>
      </div>
    )
  }

  return (
    <div>
      <button
        onClick={() => navigate('/app/patient/doctors')}
        className="text-sm text-[#64748B] hover:text-primary mb-6 block cursor-pointer"
      >
        {t.doctorDetailBack}
      </button>

      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-accent">{doctor.full_name}</h1>
            <p className="text-primary font-medium mt-1">{doctor.specialty}</p>
          </div>
          <Badge variant={doctor.available ? 'active' : 'cancelled'}>
            {doctor.available ? t.doctorAvailable : t.doctorUnavailable}
          </Badge>
        </div>

        <p className="text-sm text-[#64748B] mb-4">
          {doctor.years_of_experience} {t.dmYearsExp}
        </p>

        {doctor.bio ? (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-accent mb-2">{t.doctorDetailBio}</h2>
            <p className="text-sm text-[#64748B] leading-relaxed">{doctor.bio}</p>
          </div>
        ) : null}

        {doctor.available ? (
          <Button type="button" onClick={() => navigate('/app/patient/appointments/new')}>
            {t.doctorDetailBookAppt}
          </Button>
        ) : null}
      </div>
    </div>
  )
}
