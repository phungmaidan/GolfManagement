import express from 'express'
import { verifyToken } from '../../middlewares/auth.middleware.js'
import { authValidation } from '../../validations/auth/index.js'
import { authController } from '../../controllers/auth.controller.js'
const router = express.Router()

// Existing routes
router.post('/refresh-token', verifyToken, authController.refreshToken)

// New routes for specific user types
router.post('/staff/login', authValidation.login, authController.loginStaff)
router.post('/guest/login', authValidation.login, authController.loginGuest)

export default router