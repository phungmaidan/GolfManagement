import { GET_DB } from '~/config/sqldb'

const getCourseByDate = async (date) => {
  try {
    const pool = GET_DB()
    const result = await pool.request()
      .input('TxnDate', date) // Truyền giá trị ngày vào
      .query(`
        SELECT CourseID, Name FROM ComCourseMaster  
        WHERE 
          (HomeCourse = 1 AND CourseID NOT IN 
            (SELECT CourseID FROM ComCourseMaintenance 
             WHERE CONVERT(VARCHAR(10), TxnDate, 111) = @TxnDate AND ISNULL(Active, 0) = 0)) 
          OR 
          (HomeCourse = 0 AND CourseID IN 
            (SELECT CourseID FROM ComCourseMaintenance 
             WHERE CONVERT(VARCHAR(10), TxnDate, 111) = @TxnDate AND ISNULL(Active, 0) = 1))
      `)
    return result.recordset
  } catch (error) {
    throw new Error('Database query course by date failed: ' + error.message)
  }
}

const getFreFlightStatus = async () => {
  try {
    const pool = GET_DB()
    return await pool.request().query(`Select * From FreFlightStatus`)
  } catch (error) {
    throw new Error('Database query Flight Status failed: ' + error.message)
  }
}

const getComGuestType = async () => {
  try {
    const pool = GET_DB()
    return await pool.request().query(`Select * From ComGuestType`)
  } catch (error) {
    throw new Error('Database query Flight Status failed: ' + error.message)
  }
}

export const dailyOperationModel = {
  getCourseByDate,
  getFreFlightStatus,
  getComGuestType
}
