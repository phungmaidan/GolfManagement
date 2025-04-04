import express from 'express'
import { verifyToken, isAdmin } from '../../middlewares/auth.middleware.js'
import { guestValidation } from '../../validations/guest/index.js'
import { guestController } from '../../controllers/guest.controller.js'
const router = express.Router()
// All guest routes require authentication
router.use(verifyToken)
// Existing routes
router.get('/search', guestValidation.searchGuest, guestController.searchGuest)

export default router