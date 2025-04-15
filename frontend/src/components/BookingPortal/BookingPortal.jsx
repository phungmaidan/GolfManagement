import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsPopBookingOpen } from '~/redux/bookingFlight/bookingFlightSlice'
import BookingPopup from './BookingPopup/BookingPopup'

const BookingPortal = React.memo(() => {
  const isPopupOpen = useSelector(selectIsPopBookingOpen)
  if (!isPopupOpen) return null
  return <BookingPopup />
})

BookingPortal.displayName = 'BookingPortal'

export default BookingPortal