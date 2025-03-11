import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginGuestAPI } from '~/redux/user/userSlice'

function GuestLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [guestId, setGuestId] = useState('')
  const [guestPassword, setGuestPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await dispatch(loginGuestAPI({
        account: guestId,
        password: guestPassword
      }))
      navigate('/')
    } catch (err) {
      setError('Invalid guest credentials. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginInstead = () => {
    navigate('/login')
  }

  return (
    <div className="bg-golf-green-500 shadow-lg rounded-xl p-8">
      <h2 className="text-white text-2xl font-serif font-medium mb-6 text-center">
        Guest Access
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-900/20 border border-red-600 text-red-100 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="guestId"
            className="block text-luxury-gold-200 text-sm font-medium mb-2"
          >
            Guest ID
          </label>
          <input
            id="guestId"
            name="guestId"
            type="text"
            required
            value={guestId}
            onChange={(e) => setGuestId(e.target.value)}
            placeholder="Enter guest ID"
            className="w-full px-4 py-2.5 bg-golf-green-700 border border-golf-green-600 text-white rounded-md focus:outline-none placeholder-white transition-all"
          />
        </div>

        <div>
          <label
            htmlFor="guestPassword"
            className="block text-luxury-gold-200 text-sm font-medium mb-2"
          >
            Password
          </label>
          <input
            id="guestPassword"
            name="guestPassword"
            type="password"
            required
            value={guestPassword}
            onChange={(e) => setGuestPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-2.5 bg-golf-green-700 border border-golf-green-600 text-white rounded-md focus:outline-none placeholder-white transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full cursor-pointer bg-luxury-gold-500 text-white py-2.5 px-4 rounded-md transition-colors duration-300 font-medium shadow-sm ${
            isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-luxury-gold-400'
          }`}
        >
          {isLoading ? 'Logging in...' : 'Login as Guest'}
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

      <div className="text-center">
        <button
          onClick={handleLoginInstead}
          className="w-full py-2.5 px-4 border border-luxury-gold-400 text-luxury-gold-300 rounded-md hover:bg-golf-green-600 transition-colors duration-300 font-medium text-center cursor-pointer"
        >
          Sign in for Staff Account
        </button>
      </div>
    </div>
  )
}

export default GuestLogin