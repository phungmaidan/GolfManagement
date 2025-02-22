import React from 'react'
import { useSelector } from 'react-redux'
import { selectTodayDate } from '~/redux/booking/bookingSlice'
import { selectBookingFlight } from '~/redux/bookingFlight/bookingFlightSlice'

const BookingInfo = () => {
  const flightInfo = useSelector(selectBookingFlight)
  const bookingDate = useSelector(selectTodayDate)
  // Tạo một đối tượng placeholder khi không có dữ liệu
  const bookingData = flightInfo?.bookMap?.[0] || {
    BookingID: '-'
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-golf-green-600 mb-2">Basic Info</h3>
      <div className="space-y-2 animation-show">
        <div>
          <label className="block text-xs text-gray-600">Booking ID</label>
          <div className="w-full p-1 text-sm text-center cursor-default border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400">
            {bookingData.BookingID}
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-600">Booking Date</label>
          <div className="w-full p-1 text-sm text-center cursor-default border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400">
            {bookingDate}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingInfo