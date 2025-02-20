/* eslint-disable no-console */
// FlightTableRow.jsx
import React, { useState, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { updateBookingData } from '~/redux/socket/socketSlice'
import BookingPopup from './BookingPopup'
import DropdownMenu from './DropdownMenu/DropdownMenu'
import PlayerCell from './PlayerCell/PlayerCell'
import TeeTimeCell from './TeeTimeCell/TeeTimeCell'
import { processItemUtils } from '~/utils/processItemUtils'
const FlightTableRow = ({ item, isBlock }) => {
  // Use useMemo for expensive calculations
  const processedItem = useMemo(() => processItemUtils.processItem(item), [item])
  const dispatch = useDispatch()
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const handlePlayerClick = useCallback((booking, bookingIndex) => {
    const bookingData = {
      flight: booking.Flight,
      TeeBox: booking.TeeBox,
      teeTime: booking.TeeTime,
      bookMap: booking.children?.bookMap,
      bookingIndex: bookingIndex
    }
    setSelectedBooking(bookingData)
    dispatch(updateBookingData(booking))
    setIsPopupOpen(true)
  }, [dispatch])
  const handlePopupClose = useCallback(() => {
    dispatch(updateBookingData(null))
    setIsPopupOpen(false)
  }, [dispatch])
  return (
    <>
      <tr className={`
        bg-white hover:bg-gray-50 transition duration-300 ease-in-out
        ${isBlock ? 'border-2 border-red-500 animate-pulse' : ''}
      `}>
        <TeeTimeCell teeTime={processedItem.TeeTime} />
        {processedItem.players.map((player, i) => (
          <PlayerCell
            key={i}
            player={player}
            isBlockRow={processedItem.isBlockRow}
            bookingIndex={processedItem.bookingIndices[i]}
            onClick={() => {!isBlock ? handlePlayerClick(processedItem, processedItem.bookingIndices[i]) : null}}
          />
        ))}
        <td className="border px-4 py-2 text-center text-sm">
          <DropdownMenu
            onAction={(action) => console.log(action, processedItem)}
          />
        </td>
      </tr>
      {isPopupOpen && (
        <BookingPopup
          isOpen={isPopupOpen}
          onClose={handlePopupClose}
          flightInfo={{
            flight: selectedBooking?.flight,
            TeeBox: selectedBooking?.TeeBox,
            bookMap: selectedBooking?.bookMap || '',
            teeTime: selectedBooking?.teeTime || '',
            bookingIndex: selectedBooking?.bookingIndex || '0'
          }}
        />
      )}
    </>
  )
}

export default React.memo(FlightTableRow)