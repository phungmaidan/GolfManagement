import { sqlQueryUtils } from '~/utils/sqlQueryUtils'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
const RECORD_STATUS = {
  REGISTERED: 'Registered'
}

// Database query functions
const getBookingInfo = async ({ CourseID, bookingDate, Session, fields = ['*'], execute = true }) => {
  return await sqlQueryUtils.queryBuilder({
    tableName: 'FreBookingMaster',
    fields: fields,
    where: 'CourseID = @CourseID AND BookingDate = @BookingDate AND Session = @Session AND (RecordStatus IS NULL OR RecordStatus = @RecordStatus) Order By Session, TeeBox, TeeTime, BookingID',
    params: {
      CourseID: CourseID,
      BookingDate: bookingDate,
      Session: Session,
      RecordStatus: RECORD_STATUS.REGISTERED
    },
    execute: execute
  })
}

const fetchBookingDetails = async ({ bookingIDs, fields = ['*'], execute = true }) => {
  if (!bookingIDs?.length) return []
  return await sqlQueryUtils.queryBuilder({
    tableName: 'FreBookingDetails',
    fields: fields,
    where: `BookingID IN (${bookingIDs.map(id => `'${id}'`).join(',')}) Order By BookingID, Counter`,
    params: {},
    execute: execute
  })
}

const fetchTeeTimeMaster = async ({ CourseID, txnDate, TemplateID, fields = ['*'], execute = true }) => {
  const teeTimeMasterResult = await sqlQueryUtils.queryBuilder({
    tableName: 'FreTeeTimeMaster',
    fields: fields,
    where: 'CourseID = @CourseID AND TxnDate = @TxnDate AND (TemplateID = @TemplateID OR TemplateID IS NULL)',
    params: {
      CourseID: CourseID,
      TxnDate: txnDate,
      TemplateID: TemplateID
    },
    execute: execute
  })

  if (!Object.keys(teeTimeMasterResult).length) {
    return await releaseTeeTime({
      CourseID: CourseID,
      txnDate: txnDate,
      TemplateID: TemplateID,
      execute: execute
    })
  }
  return teeTimeMasterResult
}

const fetchTeeTimeDetails = async ({ CourseID, txnDate, Session, fields = ['*'], execute = true }) => {
  return await sqlQueryUtils.queryBuilder({
    tableName: 'FreTeeTimeDetails',
    fields: fields,
    where: 'CourseID = @CourseID AND TxnDate = @TxnDate AND Session = @Session Order By Len(TeeBox), TeeBox, TeeTime',
    params: {
      CourseID: CourseID,
      TxnDate: txnDate,
      Session: Session
    },
    execute: execute
  })
}

const fetchTemplateOfDay = async ({ CourseID, fields = ['Top 1 *'], execute = true }) => {
  const result = await sqlQueryUtils.queryBuilder({
    tableName: 'FreTemplateofDay',
    fields: fields,
    where: 'CourseID = @CourseID',
    params: { CourseID: CourseID },
    execute: execute
  })

  if (!result?.length) {
    throw new Error('Template not found in FreTemplateofDay')
  }

  return result[0]
}

const fetchTemplateMaster = async ({ TemplateID, fields = ['*'], execute = true }) => {
  return await sqlQueryUtils.queryBuilder({
    tableName: 'FreTemplateMaster',
    fields: fields,
    where: 'TemplateID = @TemplateID',
    params: { TemplateID: TemplateID },
    execute: execute
  })
}

const releaseTeeTime = async ({ CourseID, txnDate, TemplateID, execute = true }) => {
  return sqlQueryUtils.execProcedure({
    procedureName: 'sp_FreReleaseTeeTime',
    params: {
      CourseID: CourseID,
      TxnDate: txnDate,
      TemplateID: TemplateID
    },
    options: { returnRecordset: true },
    execute: execute
  })
}


const getFreBlockBooking = async ({ date, CourseID, Session, fields = ['*'], execute = true }) => {
  try {
    return await sqlQueryUtils.queryBuilder({
      tableName: 'FreBlockBooking',
      fields: fields,
      where: 'TransactionDate = @TransactionDate AND Session = @Session AND CourseID = @CourseID AND RecordStatus IS NULL',
      params: { TransactionDate: date, Session: Session, CourseID: CourseID },
      execute: execute
    })
  } catch (error) {
    throw new Error('Database query FreBlockBooking by date failed: ' + error.message)
  }
}

const getCourseByDate = async ({ date, fields = ['CourseID', 'Name'], execute = true }) => {
  try {
    return await sqlQueryUtils.queryBuilder({
      tableName: 'ComCourseMaster',
      fields: fields,
      where: `
        (HomeCourse = 1 AND CourseID NOT IN 
          (SELECT CourseID FROM ComCourseMaintenance 
           WHERE CONVERT(VARCHAR(10), TxnDate, 111) = @TxnDate AND ISNULL(Active, 0) = 0)) 
        OR 
        (HomeCourse = 0 AND CourseID IN 
          (SELECT CourseID FROM ComCourseMaintenance 
           WHERE CONVERT(VARCHAR(10), TxnDate, 111) = @TxnDate AND ISNULL(Active, 0) = 1))
      `,
      params: { TxnDate: date },
      execute: execute
    })
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Database query ComCourseMaster by date failed: ' + error.message)
  }
}

const getCountTotalInfoCourse = async ({ bookingDate, courseId, execute = true }) => {
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
      },
      execute: execute
    })
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Database query getCountTotalInfoCourse failed: ' + error.message)
  }
}

const getComGuestType = async ({ fields = ['*'], execute = true }) => {
  try {
    return await sqlQueryUtils.queryBuilder({
      tableName: 'ComGuestType',
      fields: fields,
      execute: execute
      // where and params are optional, omitted for all records
    })
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Database query ComGuestType failed: ' + error.message)
  }
}

const getFreFlightStatus = async ({ fields = ['*'], execute = true }) => {
  try {
    return await sqlQueryUtils.queryBuilder({
      tableName: 'FreFlightStatus',
      fields: fields,
      execute: execute
      // where and params are optional, omitted for all records
    })
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Database query FreFlightStatus failed: ' + error.message)
  }
}

const getHoleDescriptions = async ({ fields = ['Description'], execute = true }) => {
  try {
    return await sqlQueryUtils.queryBuilder({
      tableName: 'mrmCommonCode',
      fields: fields,
      where: 'ID = \'Hole\' Order By Convert(int, Description)',
      params: {},
      execute: execute
    })
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Database query mrmCommonCode by ID failed: ' + error.message)
  }
}

export const itemModel = {
  getCourseByDate,
  fetchTemplateOfDay,
  fetchTeeTimeMaster,
  fetchTeeTimeDetails,
  fetchTemplateMaster,
  getBookingInfo,
  getFreBlockBooking,
  fetchBookingDetails,
  getCountTotalInfoCourse,
  getComGuestType,
  getFreFlightStatus,
  getHoleDescriptions
}
