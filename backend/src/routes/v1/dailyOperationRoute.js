import express from 'express'
import { dailyOperationController } from '~/controllers/dailyOperationController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { cacheMiddleware } from '~/middlewares/cacheMiddleware'
import { dailyOperationValidation } from '~/validations/dailyOperationValidation'

const Router = express.Router()

// Route để lấy dữ liệu của course theo courseId và itemName
Router.route('/')
    .get(authMiddleware.isAuthorized, cacheMiddleware.caching, dailyOperationController.getInfo)

export const dailyOperationRoute = Router