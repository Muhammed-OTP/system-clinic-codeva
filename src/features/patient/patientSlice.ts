import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { patientService } from '@/services/patientService'
import type { PatientProfile } from '@/types/patient.types'
import type { Doctor } from '@/types/doctor.types'
import type { Appointment, CreateAppointmentPayload } from '@/types/appointment.types'
import type { MedicalRecord } from '@/types/medical.types'

interface PatientState {
  profile: PatientProfile | null
  doctors: Doctor[]
  selectedDoctor: Doctor | null
  appointments: Appointment[]
  records: MedicalRecord[]
  loading: boolean
  error: string | null
}

const initialState: PatientState = {
  profile: null,
  doctors: [],
  selectedDoctor: null,
  appointments: [],
  records: [],
  loading: false,
  error: null,
}

export const fetchMyProfile = createAsyncThunk('patient/fetchMyProfile', () =>
  patientService.getMyProfile()
)

export const fetchDoctors = createAsyncThunk('patient/fetchDoctors', () =>
  patientService.getDoctors()
)

export const bookAppointment = createAsyncThunk(
  'patient/bookAppointment',
  (payload: CreateAppointmentPayload) => patientService.createAppointment(payload)
)

export const cancelAppointment = createAsyncThunk(
  'patient/cancelAppointment',
  (id: number) => patientService.cancelAppointment(id)
)

export const fetchMyRecords = createAsyncThunk('patient/fetchMyRecords', () =>
  patientService.getMyRecords()
)

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    selectDoctor(state, action: PayloadAction<Doctor>) {
      state.selectedDoctor = action.payload
    },
    clearPatientState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyProfile.fulfilled, (state, action) => {
        state.loading = false
        state.profile = action.payload
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false
        state.doctors = action.payload
      })
      .addCase(bookAppointment.fulfilled, (state, action) => {
        state.loading = false
        state.appointments.unshift(action.payload.data)
      })
      .addCase(cancelAppointment.fulfilled, (state) => {
        state.loading = false
        // list re-fetch required — no GET /appointments/me/ endpoint yet
      })
      .addCase(fetchMyRecords.fulfilled, (state, action) => {
        state.loading = false
        state.records = action.payload
      })
      .addMatcher(
        isPending(fetchMyProfile, fetchDoctors, bookAppointment, cancelAppointment, fetchMyRecords),
        (state) => {
          state.loading = true
          state.error = null
        }
      )
      .addMatcher(
        isRejected(fetchMyProfile, fetchDoctors, bookAppointment, cancelAppointment, fetchMyRecords),
        (state, action) => {
          state.loading = false
          state.error = action.error.message ?? 'خطأ غير متوقع'
        }
      )
  },
})

export const { selectDoctor, clearPatientState } = patientSlice.actions
export default patientSlice.reducer
