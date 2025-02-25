import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { selectTodayDate } from '~/redux/booking/bookingSlice'
import { selectSelectedBooking } from '~/redux/bookingFlight/bookingFlightSlice'

const BookingInfo = () => {
  const { register } = useFormContext()
  const bookingFlight = useSelector(selectSelectedBooking)
  const bookingDate = useSelector(selectTodayDate)

  return (
    <div>
      <h3 className="text-sm font-semibold text-golf-green-600 mb-2">Basic Info</h3>
      <div className="space-y-2 animation-show">
        <div>
          <label className="block text-center text-xs text-gray-600">Booking ID</label>
          <input
            {...register('BookingInfo.bookingId')}
            type="text"
            placeholder='Booking ID'
            className="w-full p-1 text-center text-sm border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600">Booking Date</label>
          <input
            {...register('BookingInfo.bookingDate')}
            type="text"
            className="w-full p-1 text-sm text-center cursor-default border rounded focus:ring-golf-green-500 focus:border-golf-green-500 hover:border-golf-green-400"
            readOnly
          />
        </div>
      </div>
    </div>
  )
}

export default BookingInfo