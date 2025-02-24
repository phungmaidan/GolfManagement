import React from 'react'
import { useSelector } from 'react-redux'
import { selectTodayDate } from '~/redux/booking/bookingSlice'
import { selectSelectedBooking, saveBookingPopup } from '~/redux/bookingFlight/bookingFlightSlice'
import { useDispatch } from 'react-redux'

const BookingInfo = () => {
  const dispatch = useDispatch()
  const bookingFlight = useSelector(selectSelectedBooking)
  const bookingDate = useSelector(selectTodayDate)
  // Tạo một đối tượng placeholder khi không có dữ liệu
  const bookingData = bookingFlight?.bookingIndex !== null && bookingFlight?.bookingIndex !== undefined
    ? bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.BookingID
    : ''
  console.log('BookingInfo render')
  return (
    <div>
      <h3 className="text-sm font-semibold text-golf-green-600 mb-2">Basic Info</h3>
      <div className="space-y-2 animation-show">
        <div>
          <label className="block text-center text-xs text-gray-600">Booking ID</label>
          <input
            type="text"
            className="w-full p-1 text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
            defaultValue={bookingData}
          />
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