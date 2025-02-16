export const SECTIONS = {
  MORNING: 'Morning',
  AFTERNOON: 'Afternoon'
};

export const groupBookingDetails = (details) => {
  return details.reduce((grouped, detail) => {
    if (!grouped[detail.BookingID]) {
      grouped[detail.BookingID] = [];
    }
    grouped[detail.BookingID].push(detail);
    return grouped;
  }, {});
};

export const processBookingInfo = async ({ bookingInfo, itemModel, fields = ['*'] }) => {
  if (!bookingInfo?.length) return [];
  
  const bookingIDs = bookingInfo.map(booking => booking.BookingID);
  const bookingDetails = await itemModel.fetchBookingDetails({
    bookingIDs: bookingIDs,
    fields: fields,
    execute: true
  });
  
  const groupedDetails = groupBookingDetails(bookingDetails);
  return bookingInfo.map(booking => ({
    ...booking,
    details: groupedDetails[booking.BookingID]?.map(({ BookingID, ...rest }) => rest) || []
  }));
};