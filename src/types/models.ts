export interface Patient {
  id: number
  first_name: string
  last_name: string
  date_of_birth: string
  phone: string
  email: string
  address: string
  created_at: string
}

export interface Doctor {
  id: number
  name: string
  specialty: string
  phone: string
  email: string
}

export interface Appointment {
  id: number
  patient: Patient
  doctor: Doctor
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled'
  notes: string
}
