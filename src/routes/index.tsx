import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebsiteRoutes from './WebsiteRoutes'
import AppRoutes from './AppRoutes'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<WebsiteRoutes />} />
        <Route path="/app/*" element={<AppRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}
