import express from 'express'
import { itemValidation } from '~/validations/itemValidation'
import { itemController } from '~/controllers/itemController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { cacheMiddleware } from '~/middlewares/cacheMiddleware'

const Router = express.Router()

Router.route('/:itemName')
  .get(authMiddleware.isAuthorized, cacheMiddleware.caching, itemValidation.getTemplateSchedule, itemController.getTemplateSchedule)

export const itemRoute = Router