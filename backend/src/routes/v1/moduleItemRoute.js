import express from 'express'
import { moduleItemValidation } from '~/validations/moduleItemValidation'
import { moduleItemController } from '~/controllers/moduleItemController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { cacheMiddleware } from '~/middlewares/cacheMiddleware'

const Router = express.Router()

// Route để lấy dữ liệu của course theo courseId và itemName
Router.route('/:itemName')
  .get(authMiddleware.isAuthorized, cacheMiddleware.caching, moduleItemValidation.getTemplateSchedule, moduleItemController.getTemplateSchedule)

export const moduleItemRoute = Router