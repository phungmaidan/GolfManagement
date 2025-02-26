import express from 'express'
import { itemValidation } from '~/validations/itemValidation'
import { itemController } from '~/controllers/itemController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { cacheMiddleware } from '~/middlewares/cacheMiddleware'

const Router = express.Router()

Router.route('/get-course')
  .get(
    authMiddleware.isAuthorized,
    itemValidation.getCourse,
    itemController.getCourse
  )

Router.route('/get-schedule')
  .get(
    authMiddleware.isAuthorized,
    itemValidation.getSchedule,
    itemController.getSchedule
  )

Router.route('/search-guests')
  .get(
    authMiddleware.isAuthorized,
    itemValidation.searchGuests,
    itemController.searchGuests
  )

Router.route('/save-booking')
  .post(
    authMiddleware.isAuthorized,
    itemValidation.saveBooking,
    itemController.saveBooking
  )

export const itemRoute = Router