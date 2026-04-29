import apiClient from '@/lib/axios'
import type { PatientProfile } from '@/types/patient.types'
import type { Doctor } from '@/types/doctor.types'
import type { Appointment, CreateAppointmentPayload } from '@/types/appointment.types'
import type { MedicalRecord } from '@/types/medical.types'

export const patientService = {
  getMyProfile: () => apiClient.get<PatientProfile>('/patients/me/').then((r) => r.data),

  getDoctors: () => apiClient.get<Doctor[]>('/doctors/').then((r) => r.data),

  createAppointment: (payload: CreateAppointmentPayload) =>
    apiClient
      .post<{ message: string; data: Appointment }>('/appointments/create/', payload)
      .then((r) => r.data),

  cancelAppointment: (id: number) =>
    apiClient.post<{ message: string }>(`/appointments/${id}/cancel/`).then((r) => r.data),

  getMyRecords: () => apiClient.get<MedicalRecord[]>('/medical-records/me/').then((r) => r.data),

  // getMyAppointments: blocked — waiting for GET /api/appointments/me/ from backend
}
