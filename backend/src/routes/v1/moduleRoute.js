import express from 'express'
import { moduleValidation } from '~/validations/moduleValidation'
import { moduleController } from '~/controllers/moduleController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { cacheMiddleware } from '~/middlewares/cacheMiddleware'

const Router = express.Router()

// Route để lấy dữ liệu của module theo loại moduleType
Router.route('/:moduleId/:moduleType')
  .get(authMiddleware.isAuthorized, cacheMiddleware.caching, moduleValidation.getModuleData, moduleController.getModuleData)

export const moduleRoute = Router