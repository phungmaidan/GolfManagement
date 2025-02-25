import React, { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { BookingPopupProps } from './BookingPopupProps'
import { updateBookingData } from '~/redux/socket/socketSlice'
import { useSelector, useDispatch } from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import { useBodyScroll } from '~/hooks/useBodyScroll'
import {
  selectIsPopBookingOpen,
  closeBookingPopup,
  saveBookingPopup,
  selectSelectedBooking
} from '~/redux/bookingFlight/bookingFlightSlice'
import { selectSelectedCourse, selectSelectedDate } from '~/redux/booking/bookingSlice'
import { selectCurrentUser } from '~/redux/user/userSlice'

const BookingPopup = () => {
  const dispatch = useDispatch()
  const isPopupOpen = useSelector(selectIsPopBookingOpen)
  const bookingFlight = useSelector(selectSelectedBooking)
  const selectedCourse = useSelector(selectSelectedCourse)
  const selectedDate = useSelector(selectSelectedDate)
  const currentUser = useSelector(selectCurrentUser)
  // Initialize form with default values
  const methods = useForm({
    defaultValues: {
      BookingInfo: {
        bookingId: bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.BookingID || '',
        bookingDate: new Date().toISOString().split('T')[0]
      },
      CourseInfo: {
        courseId: selectedCourse || '',
        teeBox: bookingFlight?.TeeBox || '',
        teeTime: bookingFlight?.teeTime || '',
        playDate: selectedDate || '',
        group: bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.GroupName || '',
        hole: bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.Hole || ''
      },
      IDInfo: {
        userId: bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.UserID || currentUser,
        caddy: bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.CaddyNo || '90',
        buggy: bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.BuggyNo || '100'
      },
      GuestList: bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.details?.map(guest => ({
        Name: guest?.Name || '',
        MemberNo: guest?.MemberNo || '',
        GuestType: guest?.GuestType || '',
        DailyNo: guest?.BagTag || '',
        Caddy: guest?.CaddyNo || '',
        BuggyNo: guest?.BuggyNo || '',
        LockerNo: guest?.LockerNo || '',
        Rnd: guest?.Rnd || '',
        isSelected: false
      })) || Array(4).fill({
        Name: '',
        MemberNo: '',
        GuestType: '',
        DailyNo: '',
        Caddy: '',
        BuggyNo: '',
        LockerNo: '',
        Rnd: '',
        isSelected: false
      }),
      OtherInfo: {
        ContactPerson: bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.ContactPerson || '',
        Email: bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.Email || '',
        ContactNo: bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.ContactNo || '',
        Fax: bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.Fax || '',
        CreditCardNumber: bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.CreditCardNumber || '',
        CreditCardExpiry: bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.CreditCardExpiry || '',
        SalesPerson: bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.SalesPerson || '',
        ReferenceID: bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.ReferenceID || '',
        Remark: bookingFlight?.bookMap?.[bookingFlight?.bookingIndex]?.Remark || ''
      }
    }
  })

  useBodyScroll(isPopupOpen)

  const handlePopupClose = useCallback(() => {
    dispatch(updateBookingData(null))
    dispatch(closeBookingPopup())
  }, [dispatch])

  const onSubmit = useCallback((data) => {
    console.log('Form data:', data)
    dispatch(saveBookingPopup(data))
    dispatch(updateBookingData(null))
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

// Modify PortalContent to not include FormProvider
const PortalContent = React.memo(({ onClose, onSubmit, methods }) => (
  <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/30">
    <div className="relative p-6 bg-white shadow-golf w-[95vw] h-[90vh] overflow-auto">
      <button
        onClick={onClose}
        className="fixed cursor-pointer text-golf-green-300 top-16 right-14 hover:text-golf-green-600 shadow-golf bg-gray-50 hover:bg-gray-200 rounded-lg p-2 transition-colors"
      >
        ✕
      </button>

      <h2 className="mb-4 text-lg font-semibold text-golf-green-700">
        Booking Information
      </h2>

      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="p-4">
          <div className="flex flex-col md:grid md:grid-cols-7 md:grid-rows-7 gap-4 h-full">
            <div className="w-full md:row-start-1 md:row-end-2 md:col-start-1 md:col-end-2 bg-golf-green-50 border border-golf-green-200 rounded-lg p-3 shadow-golf hover:bg-golf-green-50 transition-colors">
              <BookingPopupProps.BookingInfo />
            </div>
            {/* Block 2 - Course Info */}
            <div className="w-full md:row-start-1 md:row-end-2 md:col-start-2 md:col-end-6 bg-golf-green-50 border border-golf-green-200 rounded-lg p-3 shadow-golf hover:bg-golf-green-50 transition-colors">
              <BookingPopupProps.CourseInfo />
            </div>
            {/* Block 3 - ID Info */}
            <div className="w-full md:row-start-1 md:row-end-2 md:col-start-6 md:col-end-8 bg-golf-green-50 border border-golf-green-200 rounded-lg p-3 shadow-golf hover:bg-golf-green-50 transition-colors">
              <BookingPopupProps.IDInfo />
            </div>
            {/* Block 4 - Guest List */}
            <div className="w-full md:row-start-2 md:row-end-4 md:col-start-1 md:col-end-6 bg-golf-green-50 border border-golf-green-200 rounded-lg p-3 shadow-golf hover:bg-golf-green-50 transition-colors overflow-auto">
              <BookingPopupProps.GuestList />
            </div>
            <div className="w-full md:row-start-4 md:row-end-7 md:col-start-1 md:col-end-8 bg-golf-green-50 border border-golf-green-200 rounded-lg p-3 shadow-golf hover:bg-golf-green-50 transition-colors">
              <BookingPopupProps.OtherInfo />
            </div>
          </div>
        </div>

        <div className="fixed md:bottom-14 md:left-8/9 bottom-5 left-2/9 transform -translate-x-1/2 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white rounded bg-golf-green-500 hover:bg-golf-green-600 transition-colors shadow-golf"
          >
            Lưu
          </button>
        </div>
      </form>
    </div>
  </div>
))

export default React.memo(BookingPopup)