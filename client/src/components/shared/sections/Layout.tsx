import { Outlet } from 'react-router-dom'
import { AppNavBarComponent, FooterComponent } from '.'

const Layout = () => {
  return (
    <>
      <section className="relative">
        <div id="top-section">
          {/* Navbar header */}
          <AppNavBarComponent />

          {/* Main */}
          <div className="w-full pt-5">
            <Outlet />
          </div>
        </div>

        {/* Footer */}
        <FooterComponent />
      </section>
    </>
  )
}

export default Layout
