import React, { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { BookingPopupProps } from './BookingPopupProps'
import { updateBookingData } from '~/redux/socket/socketSlice'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsPopBookingOpen, closeBookingPopup } from '~/redux/bookingFlight/bookingFlightSlice'

// Tách Portal Content thành component riêng để tránh re-render không cần thiết
const PortalContent = React.memo(({ flightInfo, onClose, onSave }) => (
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

      <div className="p-4">
        {/* Container chuyển từ grid sang flex trên mobile */}
        <div className="flex flex-col md:grid md:grid-cols-7 md:grid-rows-7 gap-4 h-full">
          {/* Block 1 - Booking Info */}
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

          {/* Block 5 - Charge Info */}
          <div className="w-full md:row-start-4 md:row-end-6 md:col-start-1 md:col-end-4 bg-golf-green-50 border border-golf-green-200 rounded-lg p-3 shadow-golf hover:bg-golf-green-50 transition-colors">
            <BookingPopupProps.ChargeInfo />
          </div>

          {/* Block 6 - Total Info */}
          <div className="w-full md:row-start-4 md:row-end-6 md:col-start-4 md:col-end-6 bg-golf-green-50 border border-golf-green-200 rounded-lg p-3 shadow-golf hover:bg-golf-green-50 transition-colors">
            <BookingPopupProps.TotalInfo />
          </div>

          {/* Block 7 - Other Info */}
          <div className="w-full md:row-start-2 md:row-end-6 md:col-start-6 md:col-end-8 bg-golf-green-50 border border-golf-green-200 rounded-lg p-3 shadow-golf hover:bg-golf-green-50 transition-colors">
            <BookingPopupProps.OtherInfo />
          </div>

          {/* Block 8 - Action Buttons */}
          <div className="w-full md:row-start-6 md:row-end-8 md:col-start-1 md:col-end-8 bg-golf-green-50 border border-golf-green-200 rounded-lg p-3 shadow-golf">
            {/* Để trống cho các nút chức năng sau này */}
          </div>
        </div>
      </div>

      {/* Buttons container */}
      <div className="fixed md:bottom-14 md:left-8/9 bottom-5 left-2/9 transform -translate-x-1/2 flex gap-2">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
        >
          Hủy
        </button>
        <button
          onClick={() => onSave(flightInfo)}
          className="px-4 py-2 text-white rounded bg-golf-green-500 hover:bg-golf-green-600 transition-colors shadow-golf"
        >
          Lưu
        </button>
      </div>
    </div>
  </div>
))

PortalContent.displayName = 'PortalContent'

// Custom hook để quản lý body scroll
const useBodyScroll = (isLocked) => {
  useEffect(() => {
    document.body.style.overflow = isLocked ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isLocked])
}

const BookingPopup = () => {
  console.log('test')
  const dispatch = useDispatch()
  const isPopupOpen = useSelector(selectIsPopBookingOpen)

  useBodyScroll(isPopupOpen)

  const handlePopupClose = useCallback(() => {
    dispatch(updateBookingData(null))
    dispatch(closeBookingPopup())
  }, [dispatch])

  const handleSave = useCallback((info) => {
    console.log(info)
    dispatch(closeBookingPopup())
  }, [dispatch])

  if (!isPopupOpen) return null

  return createPortal(
    <PortalContent
      onClose={handlePopupClose}
      onSave={handleSave}
    />,
    document.body
  )
}

export default React.memo(BookingPopup)