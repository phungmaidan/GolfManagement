import { GET_DB } from '~/config/sqldb'
import moment from 'moment'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

// Constants
const DATE_FORMAT = 'YYYY-MM-DD'
const RECORD_STATUS = {
  REGISTERED: 'Registered'
}

const SECTIONS = {
  MORNING: 'Morning',
  AFTERNOON: 'Afternoon'
}

// Utility functions
const formatDate = (date) => moment(date, DATE_FORMAT)

const getDayOfWeek = (date) => formatDate(date).format('dddd')

const formatBookingIds = (bookingIds) => bookingIds.map(id => `'${id}'`).join(',')

// Function to group tee times by section
const groupTeeTimesBySection = (teeTimeDetails) => {
  if (!teeTimeDetails || teeTimeDetails.length === 0) {
    return {
      [SECTIONS.MORNING]: [],
      [SECTIONS.AFTERNOON]: []
    }
  }

  return teeTimeDetails.reduce((grouped, teeTime) => {
    const section = teeTime.Session?.toLowerCase() === 'morning'
      ? SECTIONS.MORNING
      : SECTIONS.AFTERNOON

    if (!grouped[section]) {
      grouped[section] = []
    }

    grouped[section].push(teeTime)
    return grouped
  }, {
    [SECTIONS.MORNING]: [],
    [SECTIONS.AFTERNOON]: []
  })
}

// Database query functions
const fetchBookings = async (pool, courseId, bookingDate) => {
  const result = await pool.request()
    .input('CourseID', courseId)
    .input('BookingDate', bookingDate)
    .input('RecordStatus', RECORD_STATUS.REGISTERED)
    .query(`
      SELECT *
      FROM FreBookingMaster
      WHERE CourseID = @CourseID
        AND BookingDate = @BookingDate
        AND (RecordStatus IS NULL OR RecordStatus = @RecordStatus)
      ORDER BY Session, TeeBox, TeeTime, BookingID
    `)

  return result.recordset
}

const fetchBookingDetails = async (pool, bookingIds) => {
  if (!bookingIds || bookingIds.length === 0) {
    return []
  }

  const formattedIds = formatBookingIds(bookingIds)
  const result = await pool.request()
    .query(`
      SELECT *
      FROM FreBookingDetails
      WHERE BookingID IN (${formattedIds})
    `)

  return result.recordset
}

const groupBookingDetails = (details) => {
  return details.reduce((grouped, detail) => {
    if (!grouped[detail.BookingID]) {
      grouped[detail.BookingID] = []
    }
    grouped[detail.BookingID].push(detail)
    return grouped
  }, {})
}

const getGuestInfoTable = async (pool, courseId, bookingDate) => {
  try {
    const bookings = await fetchBookings(pool, courseId, bookingDate)

    if (!bookings || bookings.length === 0) {
      return {
        bookings: [],
        bookingDetails: [],
        guestInfo: []
      }
    }

    const bookingIds = bookings.map(booking => booking.BookingID)
    const bookingDetails = await fetchBookingDetails(pool, bookingIds)
    const groupedDetails = groupBookingDetails(bookingDetails)

    const guestInfo = bookings.map(booking => ({
      ...booking,
      details: groupedDetails[booking.BookingID] || []
    }))

    return {
      bookings,
      bookingDetails,
      guestInfo
    }
  } catch (error) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Error fetching guest information: ${error.message}`
    )
  }
}

const fetchTeeTimeMaster = async (pool, courseId, txnDate, templateId) => {
  return pool.request()
    .input('CourseID', courseId)
    .input('TxnDate', txnDate)
    .input('TemplateID', templateId)
    .query(`
      SELECT * 
      FROM FreTeeTimeMaster 
      WHERE CourseID = @CourseID 
        AND TxnDate = @TxnDate 
        AND (TemplateID = @TemplateID OR TemplateID IS NULL)
    `)
}

const fetchTeeTimeDetails = async (pool, courseId, txnDate) => {
  const result = await pool.request()
    .input('CourseID', courseId)
    .input('TxnDate', txnDate)
    .query(`
      SELECT TeeTime, Session, Flight 
      FROM FreTeeTimeDetails 
      WHERE CourseID = @CourseID 
        AND TxnDate = @TxnDate 
      ORDER BY Session, TeeTime
    `)

  return result.recordset
}

const releaseTeeTime = async (pool, courseId, txnDate, templateId) => {
  try {
    await pool.request()
      .input('CourseID', courseId)
      .input('TxnDate', txnDate)
      .input('TemplateID', templateId)
      .execute('sp_FreReleaseTeeTime')
  } catch (error) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Error releasing tee time: ${error.message}`
    )
  }
}

const checkAndReleaseTeeTime = async (pool, courseId, txnDate, templateId) => {
  try {
    const teeTimeMasterResult = await fetchTeeTimeMaster(pool, courseId, txnDate, templateId)

    if (teeTimeMasterResult.recordset.length === 0) {
      await releaseTeeTime(pool, courseId, txnDate, templateId)
    }

    const teeTimeDetails = await fetchTeeTimeDetails(pool, courseId, txnDate)
    const groupedTeeTimeDetails = groupTeeTimesBySection(teeTimeDetails)

    return {
      teeTimeMaster: teeTimeMasterResult.recordset,
      teeTimeDetails: groupedTeeTimeDetails  // Now returns grouped by section
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Error checking tee time: ${error.message}`
    )
  }
}

const fetchTemplateOfDay = async (pool, courseId) => {
  try {
    const result = await pool.request()
      .input('CourseID', courseId)
      .query('SELECT TOP 1 * FROM FreTemplateofDay WHERE CourseID=@CourseID')

    if (!result.recordset || result.recordset.length === 0) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        'Template not found in FreTemplateofDay'
      )
    }

    return result.recordset[0]
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Error fetching template: ${error.message}`
    )
  }
}

const fetchTemplateMaster = async (pool, templateId) => {
  try {
    const result = await pool.request()
      .input('TemplateID', templateId)
      .query('SELECT * FROM FreTemplateMaster WHERE TemplateID = @TemplateID')

    return result
  } catch (error) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Error fetching template master: ${error.message}`
    )
  }
}

const getTeeTimeTemplate = async (courseId, selectedDate) => {
  const pool = GET_DB()

  try {
    const dayOfWeek = getDayOfWeek(selectedDate)
    const template = await fetchTemplateOfDay(pool, courseId)
    const templateId = template[dayOfWeek]

    if (!templateId) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `No template found for course ${courseId} on ${dayOfWeek}`
      )
    }

    const [teeTimeInfo, templateMasterResult, guestInfoResult] = await Promise.all([
      checkAndReleaseTeeTime(pool, courseId, selectedDate, templateId),
      fetchTemplateMaster(pool, templateId),
      getGuestInfoTable(pool, courseId, selectedDate)
    ])

    return {
      teeTimeInfo,  // Now includes teeTimeDetails grouped by section
      templateMaster: templateMasterResult.recordset,
      guestInfo: guestInfoResult.guestInfo
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `Error getting tee time template: ${error.message}`
    )
  }
}

export const moduleItemModel = {
  getTeeTimeTemplate
}