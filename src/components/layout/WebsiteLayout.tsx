import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { SocialSidebar } from './SocialSidebar'

export function WebsiteLayout() {
  return (
    <>
      <Navbar />
      <SocialSidebar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
