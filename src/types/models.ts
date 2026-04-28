export type UserRole = 'patient' | 'doctor' | 'receptionist' | 'admin'
export type AppointmentStatus = 'pending' | 'confirmed' | 'checked_in' | 'cancelled'
export type Gender = 'M' | 'F'

export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  full_name: string
  phone: string
  role: UserRole
  role_display: string
  is_first_login: boolean
}

export interface PatientProfile {
  id: number
  full_name: string
  email: string
  first_name: string
  last_name: string
  phone: string
  date_of_birth: string | null
  gender: Gender | ''
  address: string
  national_id: string
  emergency_contact: string
  medical_notes: string
}

export interface PatientListItem {
  id: number
  full_name: string
  email: string
  phone: string
  date_of_birth: string | null
  gender: Gender | ''
  national_id: string
}

export interface DoctorPatientListItem {
  id: number
  patient_id: number
  profile_id: number
  full_name: string
  first_name: string
  last_name: string
  email: string
  phone: string
  date_of_birth: string | null
  gender: Gender | ''
  national_id: string
  created_at: string
}

export interface Doctor {
  id: number
  full_name: string
  email: string
  phone: string
  specialty: string
  bio: string
  years_of_experience: number
  available: boolean
}

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

export interface ReceptionAppointment {
  id: number
  patient: number
  patient_name: string
  patient_email: string
  patient_phone: string
  doctor: number
  doctor_name: string
  doctor_email: string
  date: string
  time: string
  reason: string
  status: AppointmentStatus
  status_display: string
  created_at: string
}

export interface MedicalRecord {
  id: number
  patient: number
  patient_name: string
  doctor: number
  doctor_name: string
  note: string
  created_at: string
}
