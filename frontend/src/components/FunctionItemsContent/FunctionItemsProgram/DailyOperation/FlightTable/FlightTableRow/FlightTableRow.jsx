// FlightTableRow.jsx
import React, { useState } from 'react'
import BookingPopup from './BookingPopup'
import DropdownMenu from './DropdownMenu/DropdownMenu'
import PlayerCell from './PlayerCell/PlayerCell'
import TeeTimeCell from './TeeTimeCell/TeeTimeCell'
import { processItemUtils } from '~/utils/processItemUtils'


const FlightTableRow = ({ item }) => {
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const processedItem = processItemUtils.processItem(item)
  const handlePlayerClick = (booking, bookingIndex) => {
    setSelectedBooking({
      flight: booking.Flight,
      TeeBox: booking.TeeBox,
      teeTime: booking.TeeTime,
      bookMap: booking.children.bookMap,
      bookingIndex: bookingIndex
    })
    setIsPopupOpen(true)
  }

  return (
    <>
      <tr className={`hover:bg-gray-50 ${isPopupOpen ? 'outline-2 outline-blue-500' : ''}`}>
        <TeeTimeCell teeTime={processedItem.TeeTime} />
        {processedItem.players.map((player, i) => (
          <PlayerCell
            key={i}
            player={player}
            isBlockRow={processedItem.isBlockRow}
            bookingIndex={processedItem.bookingIndices[i]}
            onClick={() => handlePlayerClick(processedItem, processedItem.bookingIndices[i])}
          />
        ))}
        <td className="border px-4 py-2 text-center text-sm">
          <DropdownMenu
            onAction={(action) => console.log(action, processedItem)}
          />
        </td>
      </tr>
      <BookingPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        flightInfo={{
          flight: selectedBooking?.flight,
          TeeBox: selectedBooking?.TeeBox,
          bookMap: selectedBooking?.bookMap || '',
          teeTime: selectedBooking?.teeTime || '',
          bookingIndex: selectedBooking?.bookingIndex || '0'
        }}
      />
    </>
  )
}

export default FlightTableRow