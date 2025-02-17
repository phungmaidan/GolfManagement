import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import { itemModel } from '~/models/itemModel';
import { getDayOfWeek, TeeTimeUtils } from '~/utils/formatters';
import { processBookingInfo, mergeBookingData } from '~/utils/itemService-bookingUtils';
import { sqlQueryUtils } from '~/utils/sqlQueryUtils';
import { SESSION, BOOKING_ITEM_FIELDS } from '~/utils/constants';

// Helper functions {
const prepareQueries = async (CourseID, date, sessions) => {
  const queries = [];

  // Prepare queries for all sessions
  for (const session of sessions) {
    queries.push(
      ...[
        await itemModel.fetchTeeTimeDetails({
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
    );
  }

  return queries;
};

const processResults = (results, sessions) => {
  const sessionData = {};
  let index = 0;
  for (const session of sessions) {
    // Extract results for current session (3 queries per session)
    const [teeTimeDetails, bookingInfo, blockBooking] = results.slice(index, index + 3);

    sessionData[session] = {
      teeTimeDetails: TeeTimeUtils.formatTeeTimes(teeTimeDetails),
      bookingInfo: TeeTimeUtils.formatTeeTimes(bookingInfo),
      blockBooking: TeeTimeUtils.formatTeeTimes(blockBooking)
    };

    index += 3;
  }

  return sessionData;
};

const processAllSessions = async (CourseID, date, sessions) => {
  // Prepare all queries for batch execution
  const queries = await prepareQueries(CourseID, date, sessions);
  // Execute all queries in one batch
  const results = await sqlQueryUtils.executeBatch(queries);

  // Process results for each session
  const sessionData = processResults(results, sessions);
  
  // Process booking info and merge data for each session
  const processedSessionResults = await Promise.all(
    Object.entries(sessionData).map(async ([session, data]) => {
      const processedBooking = await processBookingInfo({
        bookingInfo: data.bookingInfo,
        itemModel,
        fields: BOOKING_ITEM_FIELDS.PROCESSED_BOOKING
      });

      return {
        sessionKey: `${session}Detail`,
        data: mergeBookingData(data.teeTimeDetails, processedBooking, data.blockBooking)
      };
    })
  );

  return processedSessionResults;
};
// } Helper functions

const getSchedule = async (CourseID, date) => {
  try {
    const dayOfWeek = getDayOfWeek(date);
    const fetchTemplate = await itemModel.fetchTemplateOfDay({ 
      CourseID: CourseID,
      fields: [dayOfWeek],
      execute: true 
    });
    const TemplateID = fetchTemplate[dayOfWeek];
    if (!TemplateID) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `No template found for course ${CourseID} on ${dayOfWeek}`
      );
    }

    // First call to create/fetch tee time data
    let TeeTimeInfo = await itemModel.fetchTeeTimeMaster({
      CourseID: CourseID,
      txnDate: date,
      TemplateID: TemplateID,
      execute: true
    });

    // Add retry logic with delay to ensure data is created
    let retryCount = 0;
    const maxRetries = 3;
    const delayMs = 1000; // 1 second delay

    while ((!TeeTimeInfo || TeeTimeInfo.length === 0) && retryCount < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
      
      TeeTimeInfo = await itemModel.fetchTeeTimeMaster({
        CourseID: CourseID,
        txnDate: date,
        TemplateID: TemplateID,
        execute: true
      });
      
      retryCount++;
    }

    if (!TeeTimeInfo || TeeTimeInfo.length === 0) {
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        `No tee time information found for course ${CourseID} on ${date} after ${maxRetries} attempts`
      );
    }

    const sessionResults = await processAllSessions(CourseID, date, Object.values(SESSION));

    const mergedSessionData = sessionResults.reduce((acc, { sessionKey, data }) => {
      acc[sessionKey] = data;
      return acc;
    }, {});
    
    const HoleDescriptions = await itemModel.getHoleDescriptions({
      fields: ['Description'],
      execute: true
    });
    const holeDescriptionsArray = HoleDescriptions.map(hole => hole.Description);

    return {
      TeeTimeInfo: TeeTimeInfo,
      HoleDescriptions: holeDescriptionsArray,
      ...mergedSessionData
    };
  } catch (error) {
    throw new ApiError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || 'Internal server error'
    );
  }
};

const getCourse = async (date) => {
  try {
    const result = await itemModel.getCourseByDate({
      date: date,
      fields: ['CourseID', 'Name'],
      execute: true
    });
    return result;
  } catch (error) {
    throw new ApiError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || 'Internal server error'
    );
  }
};

export const itemService = {
  getSchedule,
  getCourse,
}