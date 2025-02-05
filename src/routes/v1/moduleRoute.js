import express from 'express'
import { moduleValidation } from '~/validations/moduleValidation'
import { moduleController } from '~/controllers/moduleController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

// Route để lấy dữ liệu của module theo loại moduleType
Router.route('/:moduleId/:moduleType')
  .get(authMiddleware.isAuthorized, moduleValidation.validateModuleType, moduleController.getModuleData)

export const moduleRoute = Router
