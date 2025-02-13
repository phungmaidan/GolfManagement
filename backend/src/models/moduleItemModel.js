import { queryBuilder, execProcedure } from '~/utils/dbUtils';
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
const fetchBookings = async (courseId, bookingDate) => {
  return queryBuilder(
    'FreBookingMaster',
    ['*'],
    'CourseID = @CourseID AND BookingDate = @BookingDate AND (RecordStatus IS NULL OR RecordStatus = @RecordStatus)',
    {
      CourseID: courseId,
      BookingDate: bookingDate,
      RecordStatus: RECORD_STATUS.REGISTERED
    }
  );
};

const fetchBookingDetails = async (bookingIds) => {
  if (!bookingIds?.length) return [];
  return queryBuilder(
    'FreBookingDetails',
    ['*'],
    `BookingID IN (${bookingIds.map(id => `'${id}'`).join(',')})`,
    {}
  );
};

const fetchTeeTimeMaster = async (courseId, txnDate, templateId) => {
  return queryBuilder(
    'FreTeeTimeMaster',
    ['*'],
    'CourseID = @CourseID AND TxnDate = @TxnDate AND (TemplateID = @TemplateID OR TemplateID IS NULL)',
    {
      CourseID: courseId,
      TxnDate: txnDate,
      TemplateID: templateId
    }
  );
};

const fetchTeeTimeDetails = async (courseId, txnDate) => {
  return queryBuilder(
    'FreTeeTimeDetails',
    ['TeeTime', 'Session', 'Flight'],
    'CourseID = @CourseID AND TxnDate = @TxnDate',
    {
      CourseID: courseId,
      TxnDate: txnDate
    }
  );
};

const fetchTemplateOfDay = async (courseId) => {
  const result = await queryBuilder(
    'FreTemplateofDay',
    ['*'],
    'CourseID = @CourseID',
    { CourseID: courseId }
  );

  if (!result?.length) {
    throw new Error('Template not found in FreTemplateofDay');
  }

  return result[0];
};

const fetchTemplateMaster = async (templateId) => {
  return queryBuilder(
    'FreTemplateMaster',
    ['*'],
    'TemplateID = @TemplateID',
    { TemplateID: templateId }
  );
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
  await execProcedure(
    'sp_FreReleaseTeeTime',
    {
      CourseID: courseId,
      TxnDate: txnDate,
      TemplateID: templateId
    },
    { returnRecordset: false }
  );
};

const checkAndReleaseTeeTime = async (courseId, txnDate, templateId) => {
  const [teeTimeMasterResult, teeTimeDetails] = await Promise.all([
    fetchTeeTimeMaster(courseId, txnDate, templateId),
    fetchTeeTimeDetails(courseId, txnDate)
  ]);

  if (!teeTimeMasterResult.length) {
    await releaseTeeTime(courseId, txnDate, templateId);
  }

  const groupedTeeTimeDetails = groupTeeTimesBySection(teeTimeDetails);

  return {
    teeTimeMaster: teeTimeMasterResult,
    teeTimeDetails: groupedTeeTimeDetails
  };
};

const getTeeTimeTemplate = async (courseId, selectedDate) => {
  const dayOfWeek = getDayOfWeek(selectedDate);
  const template = await fetchTemplateOfDay(courseId);
  const templateId = template[dayOfWeek];

  if (!templateId) {
    throw new Error(`No template found for course ${courseId} on ${dayOfWeek}`);
  }

  const [teeTimeInfo, templateMasterResult, guestInfoResult] = await Promise.all([
    checkAndReleaseTeeTime(courseId, selectedDate, templateId),
    fetchTemplateMaster(templateId),
    getGuestInfoTable(courseId, selectedDate)
  ]);

  return {
    teeTimeInfo,
    templateMaster: templateMasterResult,
    guestInfo: guestInfoResult.guestInfo
  };
};

export const moduleItemModel = {
  getTeeTimeTemplate
}
