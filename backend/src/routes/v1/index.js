import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userRoute } from './userRoute'
import { moduleRoute } from './moduleRoute'
import { moduleItemRoute } from './moduleItemRoute'
import { dailyOperationRoute } from './dailyOperationRoute'

const Router = express.Router()

/** Check APIs v1/status */
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' })
})

/** User APIs */
Router.use('/users', userRoute)

/** Module APIs */
Router.use('/modules', moduleRoute)

/** Course APIs */
Router.use('/dailyOperation', dailyOperationRoute)

/** Module Item APIs */
Router.use('/module_items', moduleItemRoute)

export const APIs_V1 = Router
