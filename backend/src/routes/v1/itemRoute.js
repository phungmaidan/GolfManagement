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
    cacheMiddleware.caching, 
    itemController.getCourse 
  )

Router.route('/get-schedule')
  .get(
    authMiddleware.isAuthorized, 
    itemValidation.getSchedule, 
    cacheMiddleware.caching, 
    itemController.getSchedule 
  )
  
export const itemRoute = Router