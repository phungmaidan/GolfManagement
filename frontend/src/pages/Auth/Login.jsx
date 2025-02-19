import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUserAPI } from '~/redux/user/userSlice'
import styles from './Login.module.css'

function Login() {
  const dispatch = useDispatch()
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(loginUserAPI({ account, password }))
  }

  return (
    <div className={styles.loginContainer}>
      <h2 className={'text-golf-green-600 text-xl font-bold mb-6 text-center'}>
        Login to GolfOne
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="account"
            className="block text-golf-green-600 text-sm font-medium mb-1"
          >
            Account
          </label>
          <input
            id="account"
            name="account"
            type="text"
            required
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder="Enter your account"
            className={styles.input}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-golf-green-600 text-sm font-medium mb-1"
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
            placeholder="••••••••"
            className={styles.input}
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <a href="#" className={styles.link}>
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
        >
          Sign In
        </button>
      </form>

      <p className="mt-6 text-center text-golf-green-600 text-sm">
        Don't have an account?{' '}
        <a href="#" className={styles.link}>
          Sign Up
        </a>
      </p>
    </div>
  )
}

export default Login