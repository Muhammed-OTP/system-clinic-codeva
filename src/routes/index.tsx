import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebsiteRoutes from './WebsiteRoutes'
import AppRoutes from './AppRoutes'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app/*" element={<AppRoutes />} />
        <Route path="/*" element={<WebsiteRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}
