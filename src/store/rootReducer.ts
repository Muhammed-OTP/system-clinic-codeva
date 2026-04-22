import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import uiReducer from '@/store/uiSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
})

export default rootReducer
