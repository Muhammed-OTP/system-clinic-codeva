import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '@/pages/app/LoginPage'
import SetPasswordPage from '@/pages/app/SetPasswordPage'
import ProtectedRoute from '@/components/app/ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public app routes */}
      <Route path="login" element={<LoginPage />} />
      <Route path="set-password" element={<SetPasswordPage />} />

      {/* Protected — redirect to login if not authenticated */}
      <Route element={<ProtectedRoute />}>
        <Route path="admin/*" element={<div className="p-8 text-2xl font-bold">Admin — coming next sprint</div>} />
        <Route path="doctor/*" element={<div className="p-8 text-2xl font-bold">Doctor — coming next sprint</div>} />
        <Route path="reception/*" element={<div className="p-8 text-2xl font-bold">Reception — coming next sprint</div>} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/app/login" replace />} />
    </Routes>
  )
}
