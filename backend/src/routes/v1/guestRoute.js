import express from 'express'
import { guestValidation } from '~/validations/guestValidation'
import { guestController } from '~/controllers/guestController'

const Router = express.Router()

Router.route('/login')
  .post(guestValidation.login, guestController.login)

export const guestRoute = Router