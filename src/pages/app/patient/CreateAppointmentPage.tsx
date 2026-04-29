import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store'
import { bookAppointment } from '@/features/patient/patientSlice'
import { useT } from '@/hooks/useT'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function CreateAppointmentPage() {
  const { t } = useT()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { selectedDoctor, loading, error } = useAppSelector((s) => s.patient)

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [reason, setReason] = useState('')
  const [success, setSuccess] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  if (!selectedDoctor) {
    return (
      <div className="text-center py-16">
        <p className="text-[#64748B] mb-5">{t.apptSelectDoctor}</p>
        <Button type="button" variant="outline" onClick={() => navigate('/app/patient/doctors')}>
          {t.apptBackToDoctors}
        </Button>
      </div>
    )
  }

  if (success) {
    return (
      <div className="text-center py-16">
        <p className="text-success font-semibold text-lg">{t.apptSuccess}</p>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await dispatch(
      bookAppointment({ doctor: selectedDoctor.id, date, time, reason: reason || undefined })
    )
    if (bookAppointment.fulfilled.match(result)) {
      setSuccess(true)
      setTimeout(() => navigate('/app/patient/home'), 2000)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-accent mb-6">{t.apptNewTitle}</h1>

      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 max-w-md">
        <div className="mb-5 p-3 bg-[#F7FAFB] rounded-lg border border-[#E2E8F0]">
          <p className="text-xs text-[#64748B] mb-0.5">{t.apptDoctor}</p>
          <p className="font-semibold text-accent">{selectedDoctor.full_name}</p>
          <p className="text-sm text-primary">{selectedDoctor.specialty}</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            id="date"
            type="date"
            label={t.apptDate}
            value={date}
            min={today}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <Input
            id="time"
            type="time"
            label={t.apptTime}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <Textarea
            id="reason"
            label={t.apptReason}
            placeholder={t.apptReasonPh}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
          />

          {error && <p className="text-sm text-error">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full mt-2">
            {loading ? t.loading : t.apptSubmit}
          </Button>
        </form>
      </div>
    </div>
  )
}
