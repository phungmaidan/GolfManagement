import { GET_DB } from '~/config/sqldb'
import moment from 'moment'

const findModuleOptionType = async (moduleId, userId, optionType) => {
  try {
    const pool = GET_DB()
    const result = await pool.request()
      .input('ModuleID', moduleId)
      .input('ID', userId)
      .input('OptionType', optionType)
      .query('SELECT ItemID, ItemName, OptionType, ModuleID FROM sysOnUserMenuView WHERE ModuleID = @ModuleID AND OptionType = @OptionType AND ID = @ID AND PrimaryItemID IS NULL AND Active = 1 ORDER BY ItemSequence')
    return result.recordset
  } catch (error) {
    throw new Error('Database query failed')
  }
}

const findDailyOperationData = async () => {
  try {
    const pool = GET_DB()
    const today = moment().format('YYYY/MM/DD')
    const flightStatusResult = await pool.request().query('SELECT * FROM FreFlightStatus')
    const guestTypeResult = await pool.request().query('SELECT * FROM ComGuestType')
    const courseMasterResult = await pool.request()
      .input('today', today)
      .query(`
        SELECT CourseID, Name, BlueSlopeRate, RedSlopeRate, WhiteSlopeRate, HomeCourse, DefaultValue, MaleSlopeRate, FemaleSlopeRate, OpenCourse FROM ComCourseMaster
        WHERE (HomeCourse = 1 AND CourseID NOT IN (
          SELECT CourseID FROM ComCourseMaintenance
          WHERE CONVERT(VARCHAR(10), TxnDate, 111) = @today AND ISNULL(Active, 0) = 0
        ) OR HomeCourse = 0 AND CourseID IN (
          SELECT CourseID FROM ComCourseMaintenance
          WHERE CONVERT(VARCHAR(10), TxnDate, 111) = @today AND ISNULL(Active, 0) = 1
        ))
      `)
    return {
      flightStatuses: flightStatusResult.recordset,
      guestTypes: guestTypeResult.recordset,
      courseMasters: courseMasterResult.recordset
    }
  } catch (error) {
    throw new Error('Database query failed')
  }
}

export const moduleModel = {
  findModuleOptionType,
  findDailyOperationData
}
