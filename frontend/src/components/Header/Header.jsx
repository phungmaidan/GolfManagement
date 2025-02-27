import React, { useState, useEffect, useRef, act } from 'react'
import { Home, LogOut, Calendar, User } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUserAPI, selectUserDetails } from '~/redux/user/userSlice'
import { Link, useNavigate } from 'react-router-dom'

const Header = ({ logo }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userDetails = useSelector(selectUserDetails)
  const isAuthenticated = userDetails?.Active
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

  const menuItems = [
    { title: 'Trang chủ', path: 'https://songbegolf.com.vn/', icon: <Home size={20} />, external: true },
    { title: 'Đặt lịch', path: 'dashboards/daily-operation', icon: <Calendar size={20} /> }
  ]

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle logout
  const handleLogout = async () => {
    try {
      await dispatch(logoutUserAPI()).unwrap()
      setIsUserMenuOpen(false)
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header className="bg-golf-green-50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-4">
            <img src={logo} alt="Logo" className="h-10 sm:h-12 w-auto" />
            <h1 className="hidden sm:block font-['Playfair_Display'] text-lg sm:text-xl font-semibold text-luxury-gold-600">
              SONG BE GOLF RESORT
            </h1>
          </Link>

          {/* Navigation + Auth */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Navigation */}
            <nav className="flex gap-1 sm:gap-3">
              {menuItems.map((item) => (
                item.external ? (
                  <a
                    key={item.title}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 sm:px-3 py-2 text-golf-green-600 hover:bg-golf-green-100 rounded"
                  >
                    {item.icon}
                    <span className="hidden sm:inline">{item.title}</span>
                  </a>
                ) : (
                  <Link
                    key={item.title}
                    to={item.path}
                    className="flex items-center gap-1 px-2 sm:px-3 py-2 text-golf-green-600 hover:bg-golf-green-100 rounded"
                  >
                    {item.icon}
                    <span className="hidden sm:inline">{item.title}</span>
                  </Link>
                )
              ))}
            </nav>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center justify-center p-2 cursor-pointer rounded-full bg-golf-green-100 text-golf-green-600 hover:bg-golf-green-200"
                >
                  <User size={24} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-1 w-48 py-2 bg-white shadow-lg rounded-lg z-10">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-800">{userDetails?.Name || 'Người dùng'}</p>
                      <p className="text-sm text-gray-500">{userDetails?.Email}</p>
                    </div>
                    <button
                      className="flex items-center gap-2 w-full px-4 py-2 text-red-500 hover:bg-gray-50 text-left cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOut size={20} />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1.5 text-golf-green-600 border border-golf-green-600 rounded hover:bg-golf-green-100"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
