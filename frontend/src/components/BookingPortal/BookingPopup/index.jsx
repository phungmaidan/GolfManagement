import React, { useCallback, useState } from 'react'
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
  saveBookingAPI,
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
  const bookingIndex = bookingFlight?.bookingIndex || 0
  // Initialize form with default values
  const methods = useForm({
    defaultValues: {
      BookingInfo: {
        bookingId: bookingFlight?.bookMap?.[bookingIndex]?.BookingID || '',
        bookingDate: new Date().toISOString().split('T')[0]
      },
      CourseInfo: {
        courseId: selectedCourse || '',
        teeBox: bookingFlight?.TeeBox || '',
        teeTime: bookingFlight?.teeTime || '',
        playDate: selectedDate || '',
        group: bookingFlight?.bookMap?.[bookingIndex]?.GroupName || '',
        hole: bookingFlight?.bookMap?.[bookingIndex]?.Hole || ''
      },
      IDInfo: {
        userId: bookingFlight?.bookMap?.[bookingIndex]?.UserID || currentUser,
      },
      GuestList: bookingFlight?.bookMap?.[bookingIndex]?.details?.map(guest => ({
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
        ContactPerson: bookingFlight?.bookMap?.[bookingIndex]?.ContactPerson || '',
        Email: bookingFlight?.bookMap?.[bookingIndex]?.Email || '',
        ContactNo: bookingFlight?.bookMap?.[bookingIndex]?.ContactNo || '',
        Fax: bookingFlight?.bookMap?.[bookingIndex]?.Fax || '',
        CreditCardNumber: bookingFlight?.bookMap?.[bookingIndex]?.CreditCardNumber || '',
        CreditCardExpiry: bookingFlight?.bookMap?.[bookingIndex]?.CreditCardExpiry || '',
        SalesPerson: bookingFlight?.bookMap?.[bookingIndex]?.SalesPerson || '',
        ReferenceID: bookingFlight?.bookMap?.[bookingIndex]?.ReferenceID || '',
        Remark: bookingFlight?.bookMap?.[bookingIndex]?.Remark || ''
      },
      activeTab: 0 // Add this line to track the active tab
    }
  })

  useBodyScroll(isPopupOpen)

  const handlePopupClose = useCallback(() => {
    dispatch(updateBookingData(null))
    dispatch(closeBookingPopup())
  }, [dispatch])

  const onSubmit = useCallback((data) => {
    // Create a clean copy of the data without unwanted properties
    const cleanedData = {
      ...data,
      // Remove isSelected from each guest in GuestList
      GuestList: data.GuestList.map(guest => {
        const { isSelected, ...cleanGuest } = guest
        return cleanGuest
      })
    }

    // Remove activeTab from the root object
    delete cleanedData.activeTab

    console.log('Clean form data:', cleanedData)
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

// Modify PortalContent to not include FormProvider
const PortalContent = React.memo(({ onClose, onSubmit, methods }) => {
  // Add local state to track active tab
  const [activeTab, setActiveTab] = useState(methods.getValues('activeTab') || 0)

  // Tab change handler that updates both form value and local state
  const handleTabChange = (index) => {
    setActiveTab(index)
    methods.setValue('activeTab', index)
  }

  return (
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
          <div className="space-y-6">
            {/* Contact Information Header - Prominent display */}
            <div className="bg-golf-green-50 rounded-xl p-5 shadow-md border border-golf-green-200">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-medium text-golf-green-700">
                  Thông tin người đặt
                </h3>
                <span className="bg-golf-green-100 text-golf-green-800 text-xs font-medium px-2.5 py-1 rounded">
                  Mã đặt: {methods.watch('BookingInfo.bookingId')}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <p className="font-medium text-golf-green-800">{methods.watch('OtherInfo.ContactPerson') || 'Chưa có thông tin'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <p className="text-sm text-gray-700">{methods.watch('OtherInfo.Email') || 'Chưa có email'}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <p className="text-sm text-gray-700">{methods.watch('OtherInfo.ContactNo') || 'Chưa có số điện thoại'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <p className="text-sm text-gray-700">{methods.watch('CourseInfo.playDate') || 'Chưa có ngày chơi'}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <p className="text-sm text-gray-700">Tee Time: {methods.watch('CourseInfo.teeTime') || 'Chưa có'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <p className="text-sm text-gray-700">{methods.watch('CourseInfo.courseId') || 'Chưa chọn sân'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabbed Content */}
            <div className="mt-4">
              {/* Tab Navigation - Enhanced with better visual indicators */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {['Booking Info', 'Guest List', 'Other Info'].map((tab, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleTabChange(index)}
                      className={`cursor-pointer relative transition-all duration-200 whitespace-nowrap py-3 px-3 border-b-2 font-medium text-sm
                        ${activeTab === index
                      ? 'border-golf-green-500 text-golf-green-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1 after:bg-golf-green-500'
                      : 'border-transparent text-gray-500 hover:text-golf-green-500 hover:border-golf-green-300'
                    }`}
                    >
                      <div className="flex items-center gap-2">
                        {/* Add icons for each tab */}
                        {index === 0 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        )}
                        {index === 1 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        )}
                        {index === 2 && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {tab}
                      </div>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content - with smooth transitions */}
              <div className="mt-6 transition-all duration-300">
                {/* Tab 1: Booking Information */}
                {activeTab === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 animate-fadeIn">
                    <div className="md:col-span-6 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-golf-green-100">
                      <h4 className="font-medium text-golf-green-600 mb-3 border-b pb-2">Thông tin đặt chỗ</h4>
                      <BookingPopupProps.BookingInfo />
                    </div>

                    <div className="md:col-span-6 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-golf-green-100">
                      <h4 className="font-medium text-golf-green-600 mb-3 border-b pb-2">Thông tin sân</h4>
                      <BookingPopupProps.CourseInfo />
                    </div>
                  </div>
                )}

                {/* Tab 2: Guest List */}
                {activeTab === 1 && (
                  <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-golf-green-100 animate-fadeIn">
                    <h4 className="font-medium text-golf-green-600">Danh sách khách</h4>
                    <div className="max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                      <BookingPopupProps.GuestList />
                    </div>
                  </div>
                )}

                {/* Tab 3: Additional Details */}
                {activeTab === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 animate-fadeIn">
                    <div className="md:col-span-4 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-golf-green-100">
                      <h4 className="font-medium text-golf-green-600 mb-3 border-b pb-2">Thông tin ID</h4>
                      <BookingPopupProps.IDInfo />
                    </div>

                    <div className="md:col-span-8 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all border border-golf-green-100">
                      <h4 className="font-medium text-golf-green-600 mb-3 border-b pb-2">Thông tin liên hệ chi tiết</h4>
                      <BookingPopupProps.OtherInfo />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Floating action buttons */}
          <div className="fixed bottom-6 right-10 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors shadow-sm text-gray-700 font-medium"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-white rounded-lg bg-golf-green-600 hover:bg-golf-green-700 cursor-pointer transition-colors shadow-lg font-medium flex items-center gap-2"
            >
              <span>Lưu thay đổi</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
})

export default React.memo(BookingPopup)
