import express from 'express'
import { dailyOperationController } from '~/controllers/dailyOperationController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { dailyOperationValidation } from '~/validations/dailyOperationValidation'

const Router = express.Router()

// Route để lấy dữ liệu của course theo courseId và itemName
Router.route('/')
    .get(authMiddleware.isAuthorized, dailyOperationController.getInfo)

export const dailyOperationRoute = Router