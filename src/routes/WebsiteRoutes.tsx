import { Route, Routes } from 'react-router-dom'
import HomePage from '@/pages/website/HomePage'
import AboutPage from '@/pages/website/AboutPage'
import ServicesPage from '@/pages/website/ServicesPage'
import ContactPage from '@/pages/website/ContactPage'

export default function WebsiteRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="services" element={<ServicesPage />} />
      <Route path="contact" element={<ContactPage />} />
    </Routes>
  )
}
