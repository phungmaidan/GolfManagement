import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import Login from './Login'
import styles from './Auth.module.css'

function Auth() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const currentUser = useSelector(selectCurrentUser)

  if (currentUser) {
    return <Navigate to='/' replace={true} />
  }

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${styles.authContainer}`}>
      <div className="max-w-4xl w-full flex flex-col lg:flex-row items-center gap-8">
        {/* Left side - Login form */}
        <div className="w-full max-w-sm mx-auto">
          {isLogin && <Login />}
        </div>

        {/* Right side - Image and text */}
        <div className="flex-1 hidden lg:block">
          <div className={styles.imageWrapper}>
            <img
              src="https://media.istockphoto.com/id/465611306/vi/anh/golf-ball-g%E1%BA%A7n-l%E1%BB%97.jpg?s=612x612&w=0&k=20&c=sBdkhD3D7gLqivXskF517nIwzbROVMzkk4kNPPhqiXA="
              alt="Luxury Golf"
              className="w-full h-[480px] object-cover" // Reduced height
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-golf-green-900/90 to-transparent">
              <h3 className={`${styles.welcomeTitle} text-luxury-gold-300 text-2xl font-bold mb-2`}>
                Welcome to GolfOne
              </h3>
              <p className="text-luxury-gold-50 text-base">
                Experience luxury and excellence in every swing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
