import express from 'express'
import { moduleItemValidation } from '~/validations/moduleItemValidation'
import { moduleItemController } from '~/controllers/moduleItemController'
import { authMiddleware } from '~/middlewares/authMiddleware'

const Router = express.Router()

// Route để lấy dữ liệu của course theo courseId và itemName
Router.route('/:itemName')
  .get(authMiddleware.isAuthorized, moduleItemValidation.getItemData, moduleItemController.getItemData)

export const moduleItemRoute = Router