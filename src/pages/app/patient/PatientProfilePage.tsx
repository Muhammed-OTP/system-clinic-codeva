import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchMyProfile } from '@/features/patient/patientSlice'
import { useT } from '@/hooks/useT'
import { Button } from '@/components/ui/Button'

export default function PatientProfilePage() {
  const { t } = useT()
  const dispatch = useAppDispatch()
  const { profile, loading, error } = useAppSelector((s) => s.patient)

  useEffect(() => {
    if (!profile) dispatch(fetchMyProfile())
  }, [dispatch, profile])

  if (loading && !profile) {
    return <p className="text-[#64748B]">{t.loading}</p>
  }

  if (error && !profile) {
    return (
      <div>
        <p className="text-error mb-3">{t.errorLoad}</p>
        <Button variant="outline" size="sm" onClick={() => dispatch(fetchMyProfile())}>
          {t.btnRetry}
        </Button>
      </div>
    )
  }

  if (!profile) return null

  const genderLabel =
    profile.gender === 'M'
      ? t.profileGenderMale
      : profile.gender === 'F'
        ? t.profileGenderFemale
        : t.profileGenderNA

  const na = t.profileNotAvailable

  const fields = [
    { label: t.profileEmail, value: profile.email },
    { label: t.profilePhone, value: profile.phone || na },
    { label: t.profileDOB, value: profile.date_of_birth || na },
    { label: t.profileGender, value: genderLabel },
    { label: t.profileAddress, value: profile.address || na },
    { label: t.profileNationalId, value: profile.national_id || na },
    { label: t.profileEmergencyContact, value: profile.emergency_contact || na },
    { label: t.profileMedicalNotes, value: profile.medical_notes || na },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-accent mb-6">{profile.full_name}</h1>
      <div className="bg-white rounded-xl border border-[#E2E8F0] divide-y divide-[#F1F5F9]">
        {fields.map((field) => (
          <div key={field.label} className="px-5 py-4 flex justify-between items-start gap-4">
            <span className="text-sm text-[#64748B] shrink-0">{field.label}</span>
            <span className="text-sm text-accent font-medium text-end">{field.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
