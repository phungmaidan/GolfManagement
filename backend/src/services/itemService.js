import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';
import { itemModel } from '~/models/itemModel';
import { getDayOfWeek, TeeTimeUtils } from '~/utils/formatters';
import { SECTIONS, processBookingInfo } from '~/utils/itemService-bookingUtils';
import { sqlQueryUtils } from '~/utils/sqlQueryUtils';
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
      throw new Error(`No template found for course ${CourseID} on ${dayOfWeek}`);
    }
    const AFTERNOONTeeTimeInfo = await itemModel.fetchTeeTimeMaster({
      CourseID: CourseID,
      txnDate: date,
      TemplateID: TemplateID,
      execute: true
    })
    // Get SQL queries without executing them
    const queries = [
      await itemModel.fetchTeeTimeDetails({
        CourseID: CourseID,
        txnDate: date,
        Session: SECTIONS.AFTERNOON,
        fields: ['TeeBox', 'TeeTime', 'Flight', 'Status'],
        execute: false
      }),
      await itemModel.getBookingInfo({
        CourseID: CourseID,
        bookingDate: date,
        Session: SECTIONS.AFTERNOON,
        fields: ['BookingID', 'TeeBox', 'Flight', 'TeeTime', 'GuestType', 'Name'],
        execute: false
      }),
      await itemModel.getFreBlockBooking({ 
        date: date,
        CourseID: CourseID,
        Session: SECTIONS.AFTERNOON,
        fields: ['TeeTime', 'Remark', 'Color'],
        execute: false 
      })
    ].map(sql => ({ sql })); // Convert each SQL string to required format for executeBatch

    // Execute all queries in batch
    const [ 
      AFTERNOONTeeTimeDetails, 
      AFTERNOONBookingInfo, 
      AFTERNOONBlockBooking
    ] = await sqlQueryUtils.executeBatch(queries);

    const teeTimeDetails = TeeTimeUtils.formatTeeTimes(AFTERNOONTeeTimeDetails);
    const bookingInfo = TeeTimeUtils.formatTeeTimes(AFTERNOONBookingInfo);
    const blockBooking = TeeTimeUtils.formatTeeTimes(AFTERNOONBlockBooking);
    const processedBooking = await processBookingInfo({
      bookingInfo: bookingInfo,
      itemModel: itemModel,
      fields: ['BookingID','Counter', 'GuestType', 'MemberNo', 'Name']
    });

    const mergedData = teeTimeDetails.map(detail => {
      // Tìm các booking có cùng TeeTime và loại bỏ thuộc tính TeeTime ở các đối tượng con
      const relatedBookings = processedBooking
        .filter(item => item.TeeTime === detail.TeeTime)
        .map(({ TeeTime, TeeBox, Flight, ...rest }) => rest);

      // Tìm các block booking có cùng TeeTime và loại bỏ thuộc tính TeeTime ở các đối tượng con
      const relatedBlocks = blockBooking
        .filter(item => item.TeeTime === detail.TeeTime)
        .map(({ TeeTime, ...rest }) => rest);

      return {
        ...detail,
        children: [
          ...relatedBlocks,
          ...relatedBookings
        ]
      };
    });



    return {
      AFTERNOONTeeTimeInfo: AFTERNOONTeeTimeInfo,
      TeeTimeDetail: mergedData
    };

  } catch (error) {
    throw new ApiError(
      error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      error.message || 'Internal server error'
    );
  }
};

export const itemService = {
  getCourse,
  getSchedule
}