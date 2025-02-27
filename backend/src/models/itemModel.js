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

const searchGuests = async ({ searchTerm, limit = 5 }) => {
  try {
    const sql = `
      SELECT TOP ${limit} A.GuestID,
        A.FullName,
        A.Salutation,
        A.CardNumber,
        A.CompanyName,
        A.BirthDate,
        A.IdentityCard,
        A.Passport,
        A.Nationality,
        A.Gender,
        A.Contact1,
        A.Contact2,
        A.Email1,
        A.Email2,
        A.CreditCardNumber,
        A.CardExpiry,
        A.GuestType, B.AccountStatus, B.ClassType 
      FROM ComGuest A 
      LEFT JOIN mrmPersonalInfo B ON B.ID = A.CardNumber 
      WHERE A.FullName LIKE @search 
      OR A.CardNumber LIKE @search 
      OR A.Contact1 LIKE @search 
      OR A.GuestID LIKE @search 
      ORDER BY A.CardNumber, A.FullName
    `
    return await sqlQueryUtils.executeQuery(sql, {
      search: `%${searchTerm}%`
    }, 'Search guests failed')
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Database query ComGuest search failed: ' + error.message)
  }
}

const saveBooking = async ({ bookingId, masterData, detailsData, execute = true }) => {
  try {
    const queries = []

    if (bookingId) {
      // Update existing booking
      const updateSql = await sqlQueryUtils.updateRecord({
        tableName: 'FreBookingMaster',
        updateFields: masterData,
        where: 'BookingID = @BookingID',
        params: { BookingID: bookingId },
        execute: false
      })
      queries.push({ sql: updateSql })
      // Delete existing details to replace with new ones
      queries.push({
        sql: `DELETE FROM FreBookingDetails WHERE BookingID = '${bookingId}'`
      })
    } else {
      // Insert new booking
      const insertSql = await sqlQueryUtils.insertRecord({
        tableName: 'FreBookingMaster',
        data: masterData,
        execute: false
      })
      queries.push({ sql: insertSql })
    }

    // Insert booking details - Use Promise.all to await all insert operations
    const detailsQueries = await Promise.all(detailsData.map(async (detail) => {
      const detailSql = await sqlQueryUtils.insertRecord({
        tableName: 'FreBookingDetails',
        data: detail,
        execute: false
      })
      return { sql: detailSql }
    }))

    // Add the resolved detail queries to the main queries array
    queries.push(...detailsQueries)

    if (!execute) return queries

    return await sqlQueryUtils.executeTransaction(queries)
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, error.message)
  }
}

const generateBookingId = async ({ playDate }) => {
  try {
    // Format date as DDMMYY for BookingID
    const bookingDate = new Date(playDate)
    const day = bookingDate.getDate().toString().padStart(2, '0')
    const month = (bookingDate.getMonth() + 1).toString().padStart(2, '0')
    const year = bookingDate.getFullYear().toString().slice(2, 4)
    const dateFormatted = `${day}${month}${year}`

    // Format date as YYYY-MM-DD for SQL compatibility
    const dateStr = bookingDate.toISOString().split('T')[0]

    // Transaction to handle booking number
    const queries = [
      {
        sql: 'SELECT Counter FROM FreBookingNumber WHERE ID = @dateStr',
        params: { dateStr: dateStr }
      }
    ]

    const results = await sqlQueryUtils.executeTransaction(queries)
    let counter
    let counterToUpdate

    if (results[0]?.length > 0) {
      // Get existing counter
      counter = (parseInt(results[0][0].Counter)).toString().padStart(3, '0')
      counterToUpdate = (parseInt(counter) + 1).toString()

      // Update existing counter
      const updateQuery = {
        sql: 'UPDATE FreBookingNumber SET Counter = @counter WHERE ID = @dateStr',
        params: { counter: counterToUpdate, dateStr: dateStr }
      }

      // Execute the update query
      await sqlQueryUtils.executeTransaction([updateQuery])
    } else {
      // Insert new counter
      counter = '001'
      const insertQuery = {
        sql: 'INSERT INTO FreBookingNumber (ID, Counter) VALUES (@dateStr, @counter)',
        params: { dateStr: dateStr, counter: '1' }
      }

      // Execute the insert query
      await sqlQueryUtils.executeTransaction([insertQuery])
    }

    // Generate booking ID in format DDMMYY-NNN
    return `${dateFormatted}-${counter}`
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, `Error generating booking ID: ${error.message}`)
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
  getHoleDescriptions,
  searchGuests,
  saveBooking,
  generateBookingId // Add the new function to the export
}
