/* eslint-disable no-console */
// FlightTableRow.jsx
import React, { useState } from 'react'
import BookingPopup from './BookingPopup'
import DropdownMenu from './DropdownMenu/DropdownMenu'
import PlayerCell from './PlayerCell/PlayerCell'
import TeeTimeCell from './TeeTimeCell/TeeTimeCell'
import { processItemUtils } from '~/utils/processItemUtils'

const FlightTableRow = ({ item, updateSelectedRow, isBlock }) => {
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const processedItem = processItemUtils.processItem(item)

  const handlePlayerClick = (booking, bookingIndex) => {
    setSelectedBooking({
      flight: booking.Flight,
      TeeBox: booking.TeeBox,
      teeTime: booking.TeeTime,
      bookMap: booking.children?.bookMap,
      bookingIndex: bookingIndex
    })
    updateSelectedRow(booking)
    setIsPopupOpen(true)
  }
  const handlePopupClose = () => {
    setIsPopupOpen(false)
    updateSelectedRow(null)
  }
  return (
    <>
      <tr className={`
        bg-white hover:bg-gray-50
        ${isBlock ? 'border-4 border-luxury-gold-500 shadow-lg' : ''}
      `}>
        <TeeTimeCell teeTime={processedItem.TeeTime} />
        {processedItem.players.map((player, i) => (
          <PlayerCell
            key={i}
            player={player}
            isBlockRow={processedItem.isBlockRow}
            bookingIndex={processedItem.bookingIndices[i]}
            onClick={() => {!isBlock?handlePlayerClick(processedItem, processedItem.bookingIndices[i]):''}}
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

export default FlightTableRow