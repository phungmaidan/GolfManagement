import express from 'express'
import authRoutes from './auth.route.js'
import bookingRoutes from './booking.route.js'
import guestRoutes from './guest.route.js'
import { StatusCodes } from 'http-status-codes'

const router = express.Router()

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoutes
  },
  {
    path: '/bookings',
    route: bookingRoutes
  },
  {
    path: '/guests',
    route: guestRoutes
  }
]

// Register default routes
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(StatusCodes.OK).send({
    status: 'ok',
    timestamp: new Date().toISOString()
  })
})

export default router