// frontend/src/Login.jsx
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUserAPI } from '~/redux/user/userSlice'

function Login() {
  const dispatch = useDispatch()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUserAPI({ account, password }))
  }

  return (

      <div className="max-w-md w-full bg-white/90 rounded-xl p-8 border border-golf-green-400 shadow-golf">
        <h2 className="text-3xl font-bold text-center text-golf-green-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="account"
              className="block text-sm font-medium text-golf-green-600"
            >
              Account
            </label>
            <div className="mt-1">
              <input
                id="account"
                name="account"
                type="text"
                required
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                placeholder="Your account"
                className="block w-full px-4 py-2 border border-golf-green-300 rounded-md shadow-sm focus:border-golf-green-500 focus:ring focus:ring-golf-green-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-golf-green-600"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="block w-full px-4 py-2 border border-golf-green-300 rounded-md shadow-sm focus:border-golf-green-500 focus:ring focus:ring-golf-green-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-luxury-gold-600 hover:text-luxury-gold-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-golf-green-500 py-2 px-4 text-sm font-semibold text-white shadow-md hover:bg-golf-green-600 focus:outline-none focus:ring-2 focus:ring-golf-green-500 transition-colors"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-sm text-gray-700">
          Don't have an account?{' '}
          <a href="#" className="font-medium text-luxury-gold-600 hover:text-luxury-gold-500">
            Sign Up
          </a>
        </p>
      </div>

  )
}

export default Login
