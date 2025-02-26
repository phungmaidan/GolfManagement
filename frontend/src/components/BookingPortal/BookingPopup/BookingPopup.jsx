import React, { useCallback } from 'react'
import { createPortal } from 'react-dom'
import { updateBookingData } from '~/redux/socket/socketSlice'
import { useSelector, useDispatch } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import { useBodyScroll } from '~/hooks/useBodyScroll'
import {
  selectIsPopBookingOpen,
  closeBookingPopup,
  saveBookingAPI,
  selectSelectedBooking
} from '~/redux/bookingFlight/bookingFlightSlice'
import { selectSelectedCourse, selectSelectedDate } from '~/redux/booking/bookingSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { getDefaultFormValues } from '~/utils/formUtils'
import { convertToStrings } from '~/utils/formatter'
import PortalContent from './PortalContent'

const BookingPopup = () => {
  const dispatch = useDispatch()
  const isPopupOpen = useSelector(selectIsPopBookingOpen)
  const bookingFlight = useSelector(selectSelectedBooking)
  const selectedCourse = useSelector(selectSelectedCourse)
  const selectedDate = useSelector(selectSelectedDate)
  const currentUser = useSelector(selectCurrentUser)
  // Initialize form with default values
  const methods = useForm({
    defaultValues: getDefaultFormValues(bookingFlight, selectedCourse, selectedDate, currentUser)
  })

  useBodyScroll(isPopupOpen)

  const handlePopupClose = useCallback(() => {
    dispatch(updateBookingData(null))
    dispatch(closeBookingPopup())
  }, [dispatch])

  const onSubmit = useCallback((data) => {
    // Apply the conversion function to get a new object with string values
    const cleanedData = convertToStrings(data)
    dispatch(updateBookingData(cleanedData))
    dispatch(saveBookingAPI(cleanedData))
    dispatch(closeBookingPopup())
  }, [dispatch])

  if (!isPopupOpen) return null

  return (
    <FormProvider {...methods}>
      {createPortal(
        <PortalContent
          onClose={handlePopupClose}
          onSubmit={onSubmit}
          methods={methods}
        />,
        document.body
      )}
    </FormProvider>
  )
}

export default React.memo(BookingPopup)
