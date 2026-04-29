import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import uiReducer from '@/store/uiSlice'
import patientReducer from '@/features/patient/patientSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  patient: patientReducer,
})

export default rootReducer
