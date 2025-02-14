import express from 'express'
import { itemValidation } from '~/validations/itemValidation'
import { itemController } from '~/controllers/itemController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { cacheMiddleware } from '~/middlewares/cacheMiddleware'

const Router = express.Router()

Router.route('/get-course')
  .get(authMiddleware.isAuthorized, itemValidation.getCourse, itemController.getCourse)


export const itemRoute = Router