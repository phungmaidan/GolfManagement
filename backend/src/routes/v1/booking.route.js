import express from 'express'
import { bookingController } from '../../controllers/booking.controller.js'
import { bookingValidation } from '../../validations/booking/index.js'
import { verifyToken, isAdmin } from '../../middlewares/auth.middleware.js'

const router = express.Router()

// All booking routes require authentication
router.use(verifyToken)

// User booking routes
router.get('/modules/:moduleId/:type/items', bookingValidation.getModuleItemsByType, bookingController.getModuleItemsByType)
router.get('/courses', bookingValidation.getCoursesByDate, bookingController.getCoursesByDate)
router.post('/', bookingValidation.upsertBooking, bookingController.upsertBooking)
// Admin only routes
// router.get('/', isAdmin, bookingController.getAllBookings)
// router.put('/:id/status', isAdmin, validate(bookingValidation.updateBookingStatus), bookingController.updateBookingStatus)

export default router