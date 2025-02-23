import React, { useState, useEffect } from 'react'
import { Menu, Home, LogOut, Calendar } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { Link } from 'react-router-dom'

const Header = ({ logo }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const isAuthenticated = useSelector(selectCurrentUser)?.Active
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const menuItems = [
    { title: 'Trang chủ', path: 'https://songbegolf.com.vn/', icon: <Home size={20} />, external: true },
    { title: 'Đặt lịch', path: '/booking', icon: <Calendar size={20} /> }
  ]

  return (
    <header className="bg-golf-green-50 z-500 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between md:justify-center  h-16">
          {/* Logo with Text */}
          <Link to="/" className="flex items-center gap-4">
            <img src={logo} alt="Logo" className="h-12 w-auto" />
            <div className="hidden md:block">
              <h1 className="font-['Playfair_Display'] text-xl font-semibold text-luxury-gold-600 tracking-wide">
                SONG BE GOLF RESORT
              </h1>
            </div>
          </Link>

          {/* Right Side: Navigation + Auth */}
          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            {!isMobile && (
              <nav className="flex gap-6">
                {menuItems.map((item) => (
                  item.external ? (
                    <a
                      key={item.title}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-golf-green-600"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  ) : (
                    <Link
                      key={item.title}
                      to={item.path}
                      className="flex items-center gap-2 px-4 py-2 text-golf-green-600"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  )
                ))}
              </nav>
            )}

            {/* Auth Section */}
            <div className="flex items-center gap-4">
              {isMobile ? (
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <Menu size={24} className="text-golf-green-600" />
                </button>
              ) : !isAuthenticated ? (
                <Link
                  to="/login"
                  className="px-4 py-2 text-golf-green-600 border border-golf-green-600 rounded"
                >
                  Đăng nhập
                </Link>
              ) : null}
            </div>
          </div>
        </div>

        {/* Mobile Menu - keep outside the flex container */}
        {isMenuOpen && (
          <div className="absolute top-16 right-4 w-48 py-2 bg-white shadow-lg rounded-lg">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="flex items-center gap-2 px-4 py-2 text-golf-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
            {isAuthenticated && (
              <button
                className="flex items-center gap-2 w-full px-4 py-2 text-red-500"
                onClick={() => {/* Add logout handler */}}
              >
                <LogOut size={20} />
                <span>Đăng xuất</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header