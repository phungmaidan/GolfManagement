import { StatusCodes } from 'http-status-codes'
import { bookingService } from '../services/booking/index.js'
import logger from '../config/logger.config.js'

const searchGuest = async (req, res, next) => {
  try {
    const { guestName } = req
    const guestInfoRecords = await bookingService.ComGuestService.getSuggestInfo(guestName, 5)
    res.status(StatusCodes.OK).json({
      status: 'success',
        guests: guestInfoRecords
    })
  } catch (error) {
    logger.error('Error in searchGuestByName controller:', error)
    next(error)
  }
}

export const guestController = {
    searchGuest
}