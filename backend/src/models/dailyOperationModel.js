import { sqlQueryUtils } from '~/utils/sqlQueryUtils'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const getCourseByDate = async (date) => {
  try {
    return await sqlQueryUtils.queryBuilder({
      tableName: 'ComCourseMaster',
      fields: ['CourseID', 'Name'],
      where: `
        (HomeCourse = 1 AND CourseID NOT IN 
          (SELECT CourseID FROM ComCourseMaintenance 
           WHERE CONVERT(VARCHAR(10), TxnDate, 111) = @TxnDate AND ISNULL(Active, 0) = 0)) 
        OR 
        (HomeCourse = 0 AND CourseID IN 
          (SELECT CourseID FROM ComCourseMaintenance 
           WHERE CONVERT(VARCHAR(10), TxnDate, 111) = @TxnDate AND ISNULL(Active, 0) = 1))
      `,
      params: { TxnDate: date }
    })
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Database query ComCourseMaster by date failed: ' + error.message)
  }
}

const getFreFlightStatus = async () => {
  try {
    return await sqlQueryUtils.queryBuilder({
      tableName: 'FreFlightStatus',
      fields: ['*']
      // where and params are optional, omitted for all records
    })
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Database query FreFlightStatus failed: ' + error.message)
  }
}

const getComGuestType = async () => {
  try {
    return await sqlQueryUtils.queryBuilder({
      tableName: 'ComGuestType',
      fields: ['*']
      // where and params are optional, omitted for all records
    })
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Database query ComGuestType failed: ' + error.message)
  }
}

const getCountTotalInfoCourse = async (bookingDate, courseId) => {
  try {
    return await sqlQueryUtils.queryBuilder({
      tableName: 'BookingTable',
      fields: ['ISNULL(COUNT(DISTINCT TeeTime), 0) AS TotalCount'],
      where: `
        BookingDate = @BookingDate
        AND CourseID = @CourseID
        AND (RecordStatus IS NULL OR RecordStatus = 'Registered')
        AND Session IN ('Morning', 'Afternoon')
      `,
      params: { 
        BookingDate: bookingDate, 
        CourseID: courseId 
      }
    })
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Database query getCountTotalInfoCourse failed: ' + error.message)
  }
}

export const dailyOperationModel = {
  getCourseByDate,
  getFreFlightStatus,
  getComGuestType,
  getCountTotalInfoCourse
}
