import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { itemModel } from '~/models/itemModel'
import { getDayOfWeek, TeeTimeUtils } from '~/utils/formatters'
import { processBookingInfo, mergeBookingData } from '~/utils/itemService-bookingUtils'
import { sqlQueryUtils } from '~/utils/sqlQueryUtils'
import { SESSION, BOOKING_ITEM_FIELDS } from '~/utils/constants'

// Helper functions {
const prepareQueries = async (CourseID, date, sessions) => {
  const queries = []

  // Prepare queries for all sessions
  for (const session of sessions) {
    queries.push(
      ...[
        await itemModel.fetchTeeTimeDetailsBySession({
          CourseID,
          txnDate: date,
          Session: session,
          fields: BOOKING_ITEM_FIELDS.TEE_TIME_DETAILS,
          execute: false
        }),
        await itemModel.getBookingInfo({
          CourseID,
          bookingDate: date,
          Session: session,
          fields: BOOKING_ITEM_FIELDS.BOOKING_INFO,
          execute: false
        }),
        await itemModel.getFreBlockBooking({
          date,
          CourseID,
          Session: session,
          fields: BOOKING_ITEM_FIELDS.BLOCK_BOOKING,
          execute: false
        })
      ].map(sql => ({ sql }))
    )
  }
  return queries
}

const processResults = (results, sessions) => {
  const sessionData = {}
  let index = 0
  for (const session of sessions) {
    // Extract results for current session (3 queries per session)
    const [teeTimeDetails, bookingInfo, blockBooking] = results.slice(index, index + 3)

    sessionData[session] = {
      teeTimeDetails: TeeTimeUtils.formatTeeTimes(teeTimeDetails),
      bookingInfo: TeeTimeUtils.formatTeeTimes(bookingInfo),
      blockBooking: TeeTimeUtils.formatTeeTimes(blockBooking)
    }

    index += 3
  }

  return sessionData
}

const processAllSessions = async (CourseID, date, sessions) => {
  // Prepare all queries for batch execution
  const queries = await prepareQueries(CourseID, date, sessions)
  // Execute all queries in one batch
  const results = await sqlQueryUtils.executeBatch(queries)

  // Process results for each session
  const sessionData = processResults(results, sessions)

  // Process booking info and merge data for each session
  const processedSessionResults = await Promise.all(
    Object.entries(sessionData).map(async ([session, data]) => {
      const processedBooking = await processBookingInfo({
        bookingInfo: data.bookingInfo,
        itemModel,
        fields: BOOKING_ITEM_FIELDS.PROCESSED_BOOKING
      })

      return {
        sessionKey: `${session}Detail`,
        data: mergeBookingData(data.teeTimeDetails, processedBooking, data.blockBooking)
      }
    })
  )

  return processedSessionResults
}
// } Helper functions

const getSchedule = async (CourseID, date) => {
  try {
    const dayOfWeek = getDayOfWeek(date)
    let TemplateID
    if (CourseID !== 'TOUR')
    {
      const fetchTemplate = await itemModel.fetchTemplateOfDay({
        CourseID: CourseID,
        fields: [dayOfWeek],
        execute: true
      })
      TemplateID = fetchTemplate[dayOfWeek]
    }
    else {
      TemplateID = 'TEE TIME 15'
    }
    if (!TemplateID) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `No template found for course ${CourseID} on ${dayOfWeek}`
      )
    }

    // First call to create/fetch tee time data
    let TeeTimeInfo = await itemModel.fetchTeeTimeMaster({
      CourseID: CourseID,
      txnDate: date,
      TemplateID: TemplateID,
      execute: true
    })

    // Add retry logic with delay to ensure data is created
    let retryCount = 0
    const maxRetries = 3
    const delayMs = 1000 // 1 second delay

    while ((!TeeTimeInfo || TeeTimeInfo.length === 0) && retryCount < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, delayMs))

      TeeTimeInfo = await itemModel.fetchTeeTimeMaster({
        CourseID: CourseID,
        txnDate: date,
        TemplateID: TemplateID,
        execute: true
      })

      retryCount++
    }

    if (!TeeTimeInfo || TeeTimeInfo.length === 0) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `No tee time information found for course ${CourseID} on ${date} after ${maxRetries} attempts`
      )
    }

    const sessionResults = await processAllSessions(CourseID, date, Object.values(SESSION))

    const mergedSessionData = sessionResults.reduce((acc, { sessionKey, data }) => {
      acc[sessionKey] = data
      return acc
    }, {})

    const HoleDescriptions = await itemModel.getHoleDescriptions({
      fields: ['Description'],
      execute: true
    })
    const holeDescriptionsArray = HoleDescriptions.map(hole => hole.Description)

    return {
      TeeTimeInfo: TeeTimeInfo,
      HoleDescriptions: holeDescriptionsArray,
      ...mergedSessionData
    }
  } catch (error) {
    throw new ApiError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || 'Internal server error'
    )
  }
}

const getCourse = async (date) => {
  try {
    const result = await itemModel.getCourseByDate({
      date: date,
      fields: ['CourseID', 'Name'],
      execute: true
    })
    return result
  } catch (error) {
    throw new ApiError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || 'Internal server error'
    )
  }
}

const searchGuests = async (searchTerm, limit = 5) => {
  try {
    const result = await itemModel.searchGuests({
      searchTerm,
      limit,
      execute: true
    })
    return result
  } catch (error) {
    throw new ApiError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || 'Internal server error'
    )
  }
}

const saveBooking = async (bookingData) => {
  try {
    const {
      BookingInfo,
      CourseInfo,
      IDInfo,
      GuestList,
      OtherInfo
    } = bookingData

    let bookingId = BookingInfo.bookingId

    // Generate new BookingID if not provided
    if (!bookingId) {
      bookingId = await itemModel.generateBookingId({ playDate: CourseInfo.playDate })
    }

    // Fix: Format date string for SQL Server
    const formatSqlDate = (dateString) => {
      if (!dateString) return null
      const date = new Date(dateString)
      return date.toISOString().split('T')[0]
    }

    // Prepare master booking data
    const masterData = {
      BookingID: bookingId,
      EntryDate: new Date().toISOString().split('T')[0], // Fix: Format date
      BookingDate: formatSqlDate(CourseInfo.playDate),
      CourseID: CourseInfo.courseId,
      Session: CourseInfo.Session,
      TeeBox: CourseInfo.teeBox,
      Hole: CourseInfo.hole,
      Flight: CourseInfo.group,
      TeeTime: CourseInfo.teeTime,
      GuestType: GuestList[0]?.GuestType || '',
      MemberNo: GuestList[0]?.MemberNo || '',
      Name: GuestList[0]?.Name || '',
      ContactNo: OtherInfo.ContactNo,
      Pax: GuestList.filter(g => g.Name).length,
      Remark: OtherInfo.Remark,
      UserID: IDInfo.userId,
      ContactPerson: OtherInfo.ContactPerson,
      Fax: OtherInfo.Fax,
      CreditCardNumber: OtherInfo.CreditCardNumber,
      CreditCardExpiry: OtherInfo.CreditCardExpiry,
      Email: OtherInfo.Email,
      SalesPerson: OtherInfo.SalesPerson,
      ReferenceID: OtherInfo.ReferenceID
    }

    // Prepare details data
    const detailsData = GuestList.filter(guest => guest.Name).map((guest, index) => ({
      BookingID: bookingId,
      Counter: index + 1,
      GuestType: guest.GuestType,
      MemberNo: guest.MemberNo,
      Name: guest.Name,
      ContactNo: OtherInfo.ContactNo,
      GuestID: guest.GuestID,
      BagTag: guest.DailyNo || '',
      CaddyNo: guest.Caddy || IDInfo.caddy,
      FolioID: '',
      LockerNo: guest.LockerNo,
      BuggyNo: guest.BuggyNo || IDInfo.buggy
    }))

    const result = await itemModel.saveBooking({
      bookingId: BookingInfo.bookingId,
      masterData,
      detailsData,
      execute: true
    })

    return {
      success: true,
      bookingId,
      message: `Booking ${BookingInfo.bookingId ? 'updated' : 'created'} successfully`
    }

  } catch (error) {
    throw new ApiError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || 'Error saving booking'
    )
  }
}

export const itemService = {
  getSchedule,
  getCourse,
  searchGuests,
  saveBooking
}