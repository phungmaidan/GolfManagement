import { StatusCodes } from 'http-status-codes'
import { bookingService } from '../services/booking/index.js'
import logger from '../config/logger.config.js'
import db from '../models/index.js'
import { getDayOfWeek } from '../utils/formatter.utils.js'
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
    const dayOfWeek = getDayOfWeek(date).toLowerCase()
    // Chạy song song và lọc những course có giá trị ngày phù hợp
    const filteredCourses = await Promise.all(
      courses.map(async (course) => {
        const courseList = await bookingService.FreTemplateOfDayService.getTemplateOfDayByCourseId(course.CourseID)
        const value = courseList?.[dayOfWeek]

        const hasValue = value && value !== 'NULL' && value.trim() !== ''

        if (hasValue) {
          return {
            ...course,
            TemplateID: value // có thể đính kèm giá trị nếu muốn
          }
        }

        return null // loại bỏ
      })
    )

    // Lọc bỏ các phần tử null
    const validCourses = filteredCourses.filter(course => course !== null)

    return res.status(StatusCodes.OK).json({
      status: 'success',
      courses: validCourses
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

const getSchedules = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const { courseId, date, templateId, session } = req
    const dayOfWeek = getDayOfWeek(date).toLowerCase()
    const templateOfDay = await bookingService.FreTemplateOfDayService.getTemplateOfDayByCourseId(courseId)
    const value = templateOfDay?.[dayOfWeek]
    if ( value != templateId ) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: `No template: '${templateId}' found for the given date: '${date}' and course: '${courseId}'.`
      })
    }

    const template = await bookingService.FreTeeTimeMasterService.getTeeTimeMasterByDateCoureTemplateID(date, courseId, templateId)
    if (!template) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'No schedule found for the given course and date.'
      })
    }
    const teeTimes = await bookingService.FreTeeTimeDetailsService.getDetailsByDateCourseSession(date, courseId, session, transaction)
    const bookings = await bookingService.FreBookingMasterService.getBookingMasterByDateCourseSession(date, courseId, session, transaction)
    const blockings = await bookingService.FreBlockBookingService.getBlockBookingByDateCourseSession(date, courseId, session, transaction)

    const schedules = teeTimes.map((teeTime) => {
      const teeTimeStr = teeTime.TeeTime
      const teeBox = teeTime.TeeBox
      const bookingsPerTeeTime = bookings.filter(b => b.TeeTime === teeTimeStr && b.TeeBox === teeBox);
      const blocking = blockings.find(b => b.TeeTime === teeTimeStr && b.TeeBox === teeBox);

      let status = "available";
      if (bookingsPerTeeTime && blocking) status = "booked_blocked";
      else if (bookingsPerTeeTime) status = "booked";
      else if (blocking) status = "blocked";

      return {
        TeeTime: new Date(teeTimeStr).toISOString().slice(11, 16), // format "HH:mm"
        Flight: teeTime.Flight,
        TeeBox: teeTime.TeeBox,
        status,
        bookings: bookingsPerTeeTime.map(b => ({
          bookingID: b.BookingID,
          name: b.Name,
          guestType: b.GuestType,
          memberNo: b.MemberNo,
          pax: b.Pax
        })),
        blocking: blocking ? {
          Remark: blocking.Remark,
          Color: blocking.Color
        } : null
      };
    })
    transaction.commit()
    res.status(StatusCodes.OK).json({
      status: 'success',
      teeTimes: schedules
    })
  } catch (error) {
    await transaction.rollback();
    logger.error('Error in getSchedules controller:', error)
    next(error)
  }
}

export const bookingController = {
  getModuleItemsByType,
  getCoursesByDate,
  upsertBooking,
  getSchedules
}