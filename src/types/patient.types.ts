export interface PatientProfile {
  id: number
  full_name: string
  email: string
  first_name: string
  last_name: string
  phone: string
  date_of_birth: string | null
  gender: 'M' | 'F' | ''
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
  date_of_birth: string
  gender: 'M' | 'F' | ''
  national_id: string
}
