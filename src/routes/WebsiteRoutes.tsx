import { Route, Routes } from 'react-router-dom'
import { WebsiteLayout } from '@/components/layout/WebsiteLayout'
import HomePage from '@/pages/website/HomePage'
import AboutPage from '@/pages/website/AboutPage'
import ServicesPage from '@/pages/website/ServicesPage'
import DoctorsPage from '@/pages/website/DoctorsPage'
import SpecialitiesPage from '@/pages/website/SpecialitiesPage'
import ContactPage from '@/pages/website/ContactPage'
import AuthPage from '@/pages/website/AuthPage'
import NotFoundPage from '@/pages/website/NotFoundPage'

export default function WebsiteRoutes() {
  return (
    <Routes>
      <Route element={<WebsiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="doctors" element={<DoctorsPage />} />
        <Route path="specialities" element={<SpecialitiesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="auth" element={<AuthPage />} />
    </Routes>
  )
}
