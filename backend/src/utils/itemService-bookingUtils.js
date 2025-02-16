// Helper functions
const groupBy = (key) => (array) =>
  array.reduce((acc, item) => {
    const groupKey = item[key];
    acc[groupKey] = acc[groupKey] || [];
    acc[groupKey].push(item);
    return acc;
  }, {});

const groupByTeeTime = groupBy('TeeTime');
/**
 * Xử lý thông tin booking: Lấy các chi tiết booking dựa trên bookingInfo và ghép nhóm.
 *
 * @param {Object} params
 * @param {Array} params.bookingInfo - Mảng thông tin booking.
 * @param {Object} params.itemModel - Model để truy vấn dữ liệu.
 * @param {Array} params.fields - Danh sách các trường cần lấy (mặc định là tất cả).
 * @returns {Array} Mảng bookingInfo đã được bổ sung chi tiết.
 */
export const processBookingInfo = async ({ bookingInfo, itemModel, fields = ['*'] }) => {
  if (!bookingInfo?.length) return [];
  const bookingDetails = await itemModel.fetchBookingDetails({
    bookingIDs: bookingInfo.map(({ BookingID }) => BookingID),
    fields: fields,
    execute: true,
  });
  const groupedDetails = groupBy('BookingID')(bookingDetails);
  return bookingInfo.map(booking => ({
    ...booking,
    details: (groupedDetails[booking.BookingID] || []).map(({ BookingID, ...rest }) => rest)
  }));
};

/**
 * Hợp nhất thông tin teeTime với các booking và block booking tương ứng.
 * Tối ưu: Group các booking theo TeeTime để tránh lặp lại filter trong mỗi lần duyệt teeTimeDetails.
 *
 * @param {Array} teeTimeDetails - Mảng các chi tiết tee time.
 * @param {Array} processedBooking - Mảng booking đã được xử lý.
 * @param {Array} blockBooking - Mảng block booking.
 * @returns {Array} Mảng dữ liệu đã được hợp nhất.
 */
export const mergeBookingData = (teeTimeDetails, processedBooking, blockBooking) => {
  const processedMap = groupByTeeTime(processedBooking);
  const blockMap = groupByTeeTime(blockBooking);

  return teeTimeDetails.map(({ TeeTime, ...detail }) => ({
    ...detail,
    TeeTime,
    children: {
      blockMap: (blockMap[TeeTime] || []).map(({ TeeTime, ...rest }) => rest),
      bookMap: (processedMap[TeeTime] || []).map(({ TeeTime, TeeBox, Flight, ...rest }) => rest)
    }
  }));
};
