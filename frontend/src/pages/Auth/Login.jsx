import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUserAPI } from '~/redux/user/userSlice'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      await dispatch(loginUserAPI({ username, password }))
      navigate('/')
    } catch (err) {
      setError('Invalid credentials. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGuestLogin = () => {
    navigate('/guest-login')
  }

  return (
    <div className="bg-golf-green-500 shadow-lg rounded-xl p-8">
      <h2 className="text-white text-2xl font-serif font-medium mb-6 text-center">
        Staff Login
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-600 text-red-100 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="username"
            className="block text-luxury-gold-200 text-sm font-medium mb-2"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your username"
            className="w-full px-4 py-2.5 bg-golf-green-700 border border-golf-green-600 text-white rounded-md focus:outline-none placeholder-white transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-luxury-gold-200 text-sm font-medium mb-2"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-2.5 bg-golf-green-700 border border-golf-green-600 text-white rounded-md focus:outline-none placeholder-white transition-all"
          />
        </div>


        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-luxury-gold-500 text-white py-2.5 px-4 rounded-md transition-colors duration-300 font-medium cursor-pointer shadow-sm ${
            isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-luxury-gold-400'
          }`}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-golf-green-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-golf-green-500 text-white">or</span>
          </div>
        </div>
      </form>

      <div className="flex flex-col space-y-4">
        <button
          onClick={handleGuestLogin}
          className="w-full py-2.5 px-4 border border-luxury-gold-400 text-luxury-gold-300 rounded-md hover:bg-golf-green-600 transition-colors duration-300 font-medium text-center cursor-pointer"
        >
          Login as Guest
        </button>
      </div>
    </div>
  )
}

export default Login