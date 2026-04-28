import { Route, Routes } from 'react-router-dom'
import DashboardPage from '@/pages/app/DashboardPage'
import PatientsPage from '@/pages/app/PatientsPage'
import AppointmentsPage from '@/pages/app/AppointmentsPage'
import DoctorsPage from '@/pages/app/DoctorsPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="patients" element={<PatientsPage />} />
      <Route path="appointments" element={<AppointmentsPage />} />
      <Route path="doctors" element={<DoctorsPage />} />
    </Routes>
  )
}
