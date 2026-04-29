import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import LoginPage from '@/pages/app/LoginPage'
import UnauthorizedPage from '@/pages/app/UnauthorizedPage'
import PatientHomePage from '@/pages/app/patient/PatientHomePage'
import PatientProfilePage from '@/pages/app/patient/PatientProfilePage'
import DoctorsListPage from '@/pages/app/patient/DoctorsListPage'
import DoctorDetailPage from '@/pages/app/patient/DoctorDetailPage'
import CreateAppointmentPage from '@/pages/app/patient/CreateAppointmentPage'
import MyAppointmentsPage from '@/pages/app/patient/MyAppointmentsPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="unauthorized" element={<UnauthorizedPage />} />
      <Route
        path="patient/home"
        element={
          <ProtectedRoute role="patient">
            <PatientHomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="patient/profile"
        element={
          <ProtectedRoute role="patient">
            <PatientProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="patient/doctors"
        element={
          <ProtectedRoute role="patient">
            <DoctorsListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="patient/doctors/:id"
        element={
          <ProtectedRoute role="patient">
            <DoctorDetailPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="patient/appointments"
        element={
          <ProtectedRoute role="patient">
            <MyAppointmentsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="patient/appointments/new"
        element={
          <ProtectedRoute role="patient">
            <CreateAppointmentPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
