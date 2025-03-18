import express from 'express'
import { guestValidation } from '~/validations/guestValidation'
import { guestController } from '~/controllers/guestController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

Router.route('/login')
  .post(guestValidation.login, guestController.login)

Router.route('/save-booking')
  .post(authMiddleware.isAuthorized, guestController.saveBooking)

Router.route('/get-schedule')
  .get(authMiddleware.isAuthorized, guestController.getSchedule)

export const guestRoute = Router