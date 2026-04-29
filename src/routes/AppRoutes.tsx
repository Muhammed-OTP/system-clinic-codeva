import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PatientLayout from '@/components/layout/PatientLayout'
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
        path="patient"
        element={
          <ProtectedRoute role="patient">
            <PatientLayout />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<PatientHomePage />} />
        <Route path="profile" element={<PatientProfilePage />} />
        <Route path="doctors" element={<DoctorsListPage />} />
        <Route path="doctors/:id" element={<DoctorDetailPage />} />
        <Route path="appointments" element={<MyAppointmentsPage />} />
        <Route path="appointments/new" element={<CreateAppointmentPage />} />
      </Route>
    </Routes>
  )
}
