import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchDoctors, selectDoctor } from '@/features/patient/patientSlice'
import { useT } from '@/hooks/useT'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Doctor } from '@/types/doctor.types'

export default function DoctorsListPage() {
  const { t } = useT()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { doctors, loading, error } = useAppSelector((s) => s.patient)

  useEffect(() => {
    if (doctors.length === 0) dispatch(fetchDoctors())
  }, [dispatch, doctors.length])

  const handleSelect = (doctor: Doctor) => {
    dispatch(selectDoctor(doctor))
    navigate(`/app/patient/doctors/${doctor.id}`)
  }

  if (loading && doctors.length === 0) {
    return <p className="text-[#64748B]">{t.loading}</p>
  }

  if (error && doctors.length === 0) {
    return (
      <div>
        <p className="text-error mb-3">{t.errorLoad}</p>
        <Button variant="outline" size="sm" onClick={() => dispatch(fetchDoctors())}>
          {t.btnRetry}
        </Button>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-accent mb-6">{t.doctorsLabel}</h1>
      {doctors.length === 0 ? (
        <p className="text-[#64748B]">{t.doctorNoResults}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl border border-[#E2E8F0] p-5 hover:border-primary hover:shadow-sm transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-accent">{doctor.full_name}</p>
                  <p className="text-sm text-primary mt-0.5">{doctor.specialty}</p>
                </div>
                <Badge variant={doctor.available ? 'active' : 'cancelled'}>
                  {doctor.available ? t.doctorAvailable : t.doctorUnavailable}
                </Badge>
              </div>
              <p className="text-xs text-[#64748B] mb-4">
                {doctor.years_of_experience} {t.dmYearsExp}
              </p>
              <Button size="sm" variant="outline" className="w-full" onClick={() => handleSelect(doctor)}>
                {t.doctorViewDetail}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
