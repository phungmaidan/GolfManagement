import { StatusCodes } from 'http-status-codes'
import { bookingService } from '../services/booking/index.js'
import logger from '../config/logger.config.js'
import db from '../models/index.js'
const { sequelize } = db
const getModuleItemsByType = async (req, res, next) => {
  try {
    const { moduleId, type } = req
    const items = await bookingService.SysOnItemService.getModuleItemsByType(moduleId, type)

    res.status(StatusCodes.OK).json({
      status: 'success',
      items: items
    })
  } catch (error) {
    logger.error('Error in getStaffModules controller:', error)
    next(error)
  }
}

const getCoursesByDate = async (req, res, next) => {
  try {
    const { date } = req
    const courses = await bookingService.ComCourseMasterService.getCoursesByDate(date)

    res.status(StatusCodes.OK).json({
      status: 'success',
      courses: courses
    })
  } catch (error) {
    logger.error('Error in getCourseByDate controller:', error)
    next(error)
  }
}

const upsertBooking = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const { BookingMaster, BookingDetails } = req
    if (BookingMaster.pax != BookingDetails.length) {
      res.status(StatusCodes.BAD_REQUEST).json({
        status: 'error',
        message: 'The pax number must match the number of booking details records.'
      })
    }
    let BookingID = req?.BookingID
    if(!BookingID) {
      BookingID = await bookingService.FreBookingNumberService.generateBookingId(BookingMaster.entryDate, transaction)
    }
    const BookingMasterData = await bookingService.FreBookingMasterService.upsertBookingMaster(
      BookingID,
      BookingMaster,
      transaction
    )

    const BookingDetailsData = await bookingService.FreBookingDetailsService.handleBookingDetailsWhenUpdatingBookingMaster(
      BookingID,
      BookingMaster.pax,
      BookingDetails,
      transaction
    )
    transaction.commit()
    res.status(StatusCodes.OK).json({
      status: 'success',
      result: {
        BookingID: BookingID,
        BookingMaster: BookingMasterData,
        BookingDetails: BookingDetailsData
      }
    })
  } catch (error) {
    await transaction.rollback();
    logger.error('Error in upsertBooking controller:', error)
    next(error)
  }
}

export const bookingController = {
  getModuleItemsByType,
  getCoursesByDate,
  upsertBooking
}