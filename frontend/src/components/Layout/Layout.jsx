import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const Layout = () => {
  return (
    <div className='min-h-screen bg-gray-900 relative overflow-hidden'>
      {/* Background gradient */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,var(--golf-green-400)_0%,var(--golf-green-600)_45%,rgba(0,0,0,0.1)_100%)]' />
        </div>
      </div>
      <div className="relative flex flex-col">
        <Header logo={'https://songbegolf.com.vn/template/images/logo.svg'} />
        <main>
          <Outlet />
        </main>
        <Footer logo={'https://songbegolf.com.vn/template/images/logo.svg'} />
      </div>
    </div>

  )
}

export default Layout