import React, { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { BookingPopupProps } from './BookingPopupProps'
import { updateBookingData } from '~/redux/socket/socketSlice'
import { useSelector, useDispatch } from 'react-redux'
import { selectIsPopBookingOpen, closeBookingPopup, selectBookingFlight } from '~/redux/bookingFlight/bookingFlightSlice'

// Tách Portal Content thành component riêng để tránh re-render không cần thiết
const PortalContent = React.memo(({ flightInfo, onClose, onSave }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
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
        {/* BookingPopupProps components go here */}
      </div>

      <div className="fixed bottom-14 left-8/9 transform -translate-x-1/2 flex gap-2">
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
  const dispatch = useDispatch()
  console.log('test')
  // Sử dụng selector function để tránh re-render không cần thiết
  const flightInfo = useSelector(selectBookingFlight)
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
      flightInfo={flightInfo}
      onClose={handlePopupClose}
      onSave={handleSave}
    />,
    document.body
  )
}

export default React.memo(BookingPopup)