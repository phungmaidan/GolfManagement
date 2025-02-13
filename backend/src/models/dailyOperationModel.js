import { queryBuilder } from '~/utils/dbUtils'

// Query lấy khóa học theo ngày
const getCourseByDate = async (date) => {
  const fields = ['CourseID', 'Name']
  const where = `
    (HomeCourse = 1 AND CourseID NOT IN 
      (SELECT CourseID FROM ComCourseMaintenance 
       WHERE CONVERT(VARCHAR(10), TxnDate, 111) = @TxnDate AND ISNULL(Active, 0) = 0)) 
    OR 
    (HomeCourse = 0 AND CourseID IN 
      (SELECT CourseID FROM ComCourseMaintenance 
       WHERE CONVERT(VARCHAR(10), TxnDate, 111) = @TxnDate AND ISNULL(Active, 0) = 1))
  `
  const params = { TxnDate: date }

  try {
    return await queryBuilder('ComCourseMaster', fields, where, params)
  } catch (error) {
    throw new Error('Database query ComCourseMaster by date failed: ' + error.message)
  }
}

// Query lấy FreFlightStatus
const getFreFlightStatus = async () => {
  const fields = ['*']
  const where = ''  // No filter condition for all records
  const params = {}

  try {
    return await queryBuilder('FreFlightStatus', fields, where, params)
  } catch (error) {
    throw new Error('Database query FreFlightStatus failed: ' + error.message)
  }
}

// Query lấy loại khách
const getComGuestType = async () => {
  const fields = ['*']
  const where = ''  // No filter condition for all records
  const params = {}

  try {
    return await queryBuilder('ComGuestType', fields, where, params)
  } catch (error) {
    throw new Error('Database query ComGuestType failed: ' + error.message)
  }
}

export const dailyOperationModel = {
  getCourseByDate,
  getFreFlightStatus,
  getComGuestType
}
