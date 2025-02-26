import { StatusCodes } from 'http-status-codes'
import { itemService } from '~/services/itemService'
import { io } from '~/sockets/socketService' // Import the socket.io instance

const getCourse = async (req, res, next) => {
  try {
    const { date } = req.validatedData // Lấy giá trị từ req.query
    // Gọi service lấy dữ liệu
    const data = await itemService.getCourse(date)

    res.status(StatusCodes.OK).json(data)
  } catch (error) { next(error) }
}

const getSchedule = async (req, res, next) => {
  try {
    const { CourseID, date } = req.validatedData // Lấy giá trị từ req.query
    // Gọi service lấy dữ liệu
    const data = await itemService.getSchedule(CourseID, date)

    res.status(StatusCodes.OK).json(data)
  } catch (error) { next(error) }
}

const searchGuests = async (req, res, next) => {
  try {
    const { search, limit } = req.validatedData
    const data = await itemService.searchGuests(search, limit)
    res.status(StatusCodes.OK).json(data)
  } catch (error) { next(error) }
}

const saveBooking = async (req, res, next) => {
  try {
    const result = await itemService.saveBooking(req.validatedData)

    // Extract date and courseId from the booking data to create the room ID
    const { CourseInfo } = req.validatedData
    if (CourseInfo && CourseInfo.playDate && CourseInfo.courseId) {
      const roomId = `${CourseInfo.playDate}-${CourseInfo.courseId}`

      // Emit a 'bookingUpdated' event to notify all users in the same room
      io.to(roomId).emit('bookingUpdated', {
        date: CourseInfo.playDate,
        courseId: CourseInfo.courseId,
        booking: result
      })

      console.log(`Booking update emitted to room ${roomId}`)
    }

    res.status(StatusCodes.OK).json(result)
  } catch (error) { next(error) }
}

export const itemController = {
  getCourse,
  getSchedule,
  searchGuests,
  saveBooking
}
