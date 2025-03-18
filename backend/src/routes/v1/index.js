import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { userRoute } from './userRoute'
import { moduleRoute } from './moduleRoute'
import { itemRoute } from './itemRoute'
import { guestRoute } from './guestRoute'
const Router = express.Router()

/** Check APIs v1/status */
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' })
})

/** User APIs */
Router.use('/users', userRoute)

/** Module APIs */
Router.use('/modules', moduleRoute)

/** Item APIs */
Router.use('/items', itemRoute)

/** Guest APIs */
Router.use('/guests', guestRoute)

export const APIs_V1 = Router