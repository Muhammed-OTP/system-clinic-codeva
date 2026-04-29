export type AppointmentStatus = 'pending' | 'confirmed' | 'checked_in' | 'cancelled'

export interface Appointment {
  id: number
  patient: number
  patient_name: string
  doctor: number
  doctor_name: string
  date: string
  time: string
  reason: string
  status: AppointmentStatus
  created_at: string
}

export interface CreateAppointmentPayload {
  doctor: number
  date: string
  time: string
  reason?: string
}
