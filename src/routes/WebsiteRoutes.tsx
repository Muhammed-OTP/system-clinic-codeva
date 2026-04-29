import { Route, Routes } from 'react-router-dom'
import { WebsiteLayout } from '@/components/layout/WebsiteLayout'
import HomePage from '@/pages/website/HomePage'
import AboutPage from '@/pages/website/AboutPage'
import DoctorsPage from '@/pages/website/DoctorsPage'
import ContactPage from '@/pages/website/ContactPage'
import AuthPage from '@/pages/website/AuthPage'
import NotFoundPage from '@/pages/website/NotFoundPage'

export default function WebsiteRoutes() {
  return (
    <Routes>
      <Route element={<WebsiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="doctors" element={<DoctorsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="auth" element={<AuthPage />} />
    </Routes>
  )
}
