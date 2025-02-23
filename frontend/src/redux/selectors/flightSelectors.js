// redux/selectors/flightSelectors.js
import { createSelector } from '@reduxjs/toolkit'
import { selectSelectedBookings } from '~/redux/socket/socketSlice'
import { selectSelectedDate, selectSelectedCourse } from '~/redux/booking/bookingSlice'

export const selectFlightData = createSelector(
  [selectSelectedBookings, selectSelectedDate, selectSelectedCourse],
  (bookings, date, course) => ({
    bookings,
    date,
    course
  })
)