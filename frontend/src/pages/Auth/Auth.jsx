import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Login from './Login'
import GuestLogin from './GuestLogin'
import { useState, useEffect } from 'react'

function Auth() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const isGuestLogin = location.pathname === '/guest-login'
  const currentUser = useSelector(selectCurrentUser)
  const [animateClass, setAnimateClass] = useState('')

  // Handle animation when route changes
  useEffect(() => {
    setAnimateClass('opacity-0 -translate-x-6')

    const timer = setTimeout(() => {
      setAnimateClass('opacity-100 translate-x-0')
    }, 150)

    return () => clearTimeout(timer)
  }, [location.pathname])

  if (currentUser) {
    return <Navigate to='/' replace={true} />
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-5xl w-full  lg:bg-white rounded-xl lg:shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Login form */}
          <div className="w-full lg:w-1/2 px-8 py-12 flex items-center justify-center">
            <div className={`w-full max-w-sm transform transition-all duration-300 ease-out ${animateClass}`}>
              {isLogin && <Login />}
              {isGuestLogin && <GuestLogin />}
            </div>
          </div>

          {/* Right side - Image and text */}
          <div className="w-full lg:w-1/2 relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-golf-green-700 to-golf-green-900 opacity-90 z-10"></div>
            <img
              src="https://media.istockphoto.com/id/465611306/vi/anh/golf-ball-g%E1%BA%A7n-l%E1%BB%97.jpg?s=612x612&w=0&k=20&c=sBdkhD3D7gLqivXskF517nIwzbROVMzkk4kNPPhqiXA="
              alt="Luxury Golf"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative z-20 h-full flex flex-col justify-end p-12">
              <h3 className={`font-serif text-luxury-gold-300 text-3xl font-bold mb-4 transition-all duration-300 ${animateClass}`}>
                {isGuestLogin ? 'Guest Access to GolfOne' : 'Welcome to GolfOne'}
              </h3>
              <p className={`text-luxury-gold-50 text-lg transition-all duration-300 ${animateClass}`}>
                {isGuestLogin
                  ? 'Quick access for guest players and visitors'
                  : 'Experience luxury and excellence in every swing'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
