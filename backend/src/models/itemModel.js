import { sqlQueryUtils } from '~/utils/sqlQueryUtils';
import moment from 'moment';

// Constants
const DATE_FORMAT = 'YYYY-MM-DD';
const RECORD_STATUS = {
  REGISTERED: 'Registered'
};

const SECTIONS = {
  MORNING: 'Morning',
  AFTERNOON: 'Afternoon'
};

// Helper functions
const formatDate = (date) => moment(date, DATE_FORMAT);
const getDayOfWeek = (date) => formatDate(date).format('dddd');

// Database query functions
const fetchBookings = async (courseId, bookingDate, fields = ['*']) => {
  return sqlQueryUtils.queryBuilder({
    tableName: 'FreBookingMaster',
    fields: fields,
    where: 'CourseID = @CourseID AND BookingDate = @BookingDate AND (RecordStatus IS NULL OR RecordStatus = @RecordStatus) Order By Session, TeeBox, TeeTime, BookingID',
    params: {
      CourseID: courseId,
      BookingDate: bookingDate,
      RecordStatus: RECORD_STATUS.REGISTERED
    }
  });
};

const fetchBookingDetails = async (bookingIds, fields = ['*']) => {
  if (!bookingIds?.length) return [];
  return sqlQueryUtils.queryBuilder({
    tableName: 'FreBookingDetails',
    fields: fields,
    where: `BookingID IN (${bookingIds.map(id => `'${id}'`).join(',')})`,
    params: {}
  });
};

const fetchTeeTimeMaster = async (courseId, txnDate, templateId, fields = ['*']) => {
  return sqlQueryUtils.queryBuilder({
    tableName: 'FreTeeTimeMaster',
    fields: fields,
    where: 'CourseID = @CourseID AND TxnDate = @TxnDate AND (TemplateID = @TemplateID OR TemplateID IS NULL)',
    params: {
      CourseID: courseId,
      TxnDate: txnDate,
      TemplateID: templateId
    }
  });
};

const fetchTeeTimeDetails = async (courseId, txnDate, fields = ['*']) => {
  return sqlQueryUtils.queryBuilder({
    tableName: 'FreTeeTimeDetails',
    fields: fields,
    where: 'CourseID = @CourseID AND TxnDate = @TxnDate Order By Len(TeeBox), TeeBox, TeeTime',
    params: {
      CourseID: courseId,
      TxnDate: txnDate
    }
  });
};

const fetchTemplateOfDay = async (courseId) => {
  const result = await sqlQueryUtils.queryBuilder({
    tableName: 'FreTemplateofDay',
    fields: ['Top 1 *'],
    where: 'CourseID = @CourseID',
    params: { CourseID: courseId }
  });

  if (!result?.length) {
    throw new Error('Template not found in FreTemplateofDay');
  }

  return result[0];
};

const fetchTemplateMaster = async (templateId, fields = ['*']) => {
  return sqlQueryUtils.queryBuilder({
    tableName: 'FreTemplateMaster',
    fields: fields,
    where: 'TemplateID = @TemplateID',
    params: { TemplateID: templateId }
  });
};

const groupTeeTimesBySection = (teeTimeDetails) => {
  if (!teeTimeDetails?.length) {
    return {
      [SECTIONS.MORNING]: [],
      [SECTIONS.AFTERNOON]: []
    };
  }

  return teeTimeDetails.reduce((grouped, teeTime) => {
    const section = teeTime.Session?.toLowerCase() === 'morning'
      ? SECTIONS.MORNING
      : SECTIONS.AFTERNOON;

    if (!grouped[section]) {
      grouped[section] = [];
    }

    grouped[section].push(teeTime);
    return grouped;
  }, {
    [SECTIONS.MORNING]: [],
    [SECTIONS.AFTERNOON]: []
  });
};

const groupBookingDetails = (details) => {
  return details.reduce((grouped, detail) => {
    if (!grouped[detail.BookingID]) {
      grouped[detail.BookingID] = [];
    }
    grouped[detail.BookingID].push(detail);
    return grouped;
  }, {});
};

// Main business logic functions
const getGuestInfoTable = async (courseId, bookingDate) => {
  const bookings = await fetchBookings(courseId, bookingDate);

  if (!bookings?.length) {
    return {
      bookings: [],
      bookingDetails: [],
      guestInfo: []
    };
  }

  const bookingIds = bookings.map(booking => booking.BookingID);
  const bookingDetails = await fetchBookingDetails(bookingIds);
  const groupedDetails = groupBookingDetails(bookingDetails);

  const guestInfo = bookings.map(booking => ({
    ...booking,
    details: groupedDetails[booking.BookingID] || []
  }));

  return { bookings, bookingDetails, guestInfo };
};

const releaseTeeTime = async (courseId, txnDate, templateId) => {
  return sqlQueryUtils.execProcedure({
    procedureName: 'sp_FreReleaseTeeTime',
    params: {
      CourseID: courseId,
      TxnDate: txnDate,
      TemplateID: templateId
    },
    options: { returnRecordset: true }
  });
};

const checkAndReleaseTeeTime = async (courseId, txnDate, templateId) => {
  const teeTimeMasterResult = await fetchTeeTimeMaster(courseId, txnDate, templateId)

  if (!teeTimeMasterResult.length) {
    await releaseTeeTime(courseId, txnDate, templateId);
  }

  const teeTimeDetails = await fetchTeeTimeDetails(courseId, txnDate)

  const groupedTeeTimeDetails = groupTeeTimesBySection(teeTimeDetails);

  return {
    teeTimeMaster: teeTimeMasterResult,
    teeTimeDetails: groupedTeeTimeDetails
  };
};

const getFreBlockBookingByDate = async (date, fields = ['*']) => {
  try {
    return await sqlQueryUtils.queryBuilder({
      tableName: 'FreBlockBooking',
      fields: fields,
      where: 'TransactionDate = @TransactionDate AND RecordStatus IS NULL',
      params: { TransactionDate: date }
    });
  } catch (error) {
    throw new Error('Database query FreBlockBooking by date failed: ' + error.message);
  }
}

const getTeeTimeTemplate = async (courseId, selectedDate) => {
  const dayOfWeek = getDayOfWeek(selectedDate);
  const template = await fetchTemplateOfDay(courseId);
  const templateId = template[dayOfWeek];

  if (!templateId) {
    throw new Error(`No template found for course ${courseId} on ${dayOfWeek}`);
  }

  const [teeTimeInfo, templateMasterResult, guestInfoResult, blockBooking] = await Promise.all([
    checkAndReleaseTeeTime(courseId, selectedDate, templateId),
    fetchTemplateMaster(templateId),
    getGuestInfoTable(courseId, selectedDate),
    getFreBlockBookingByDate(selectedDate)
  ]);

  return {
    teeTimeInfo,
    templateMaster: templateMasterResult,
    guestInfo: guestInfoResult.guestInfo,
    blockBooking: blockBooking
  };
};

const getCourseByDate = async (date, fields = ['CourseID', 'Name']) => {
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
      params: { TxnDate: date }
    })
  } catch (error) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Database query ComCourseMaster by date failed: ' + error.message)
  }
}


export const itemModel = {
  getTeeTimeTemplate,
  getCourseByDate
}
