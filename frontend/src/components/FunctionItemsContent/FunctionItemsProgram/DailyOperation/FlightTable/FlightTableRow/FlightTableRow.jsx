/* eslint-disable no-console */
// FlightTableRow.jsx
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DropdownMenu from './DropdownMenu/DropdownMenu'
import PlayerCell from './PlayerCell/PlayerCell'
import TeeTimeCell from './TeeTimeCell/TeeTimeCell'
import { processItemUtils } from '~/utils/processItemUtils'
import { updateBookingData } from '~/redux/socket/socketSlice'

const FlightTableRow = React.memo(({ item, isBlock }) => {
  // Mỗi booking(item) trong 1 flight có thể có 1 đến 3 group booking nên phải tách ra thành các group khác nhau để truy vấn chính xác, BookingIndices lưu vị trí của các guest thuộc cùng 1 group trong 1 flight
  const processedItem = processItemUtils.processItemFlightTable(item)
  const dispatch = useDispatch()

  const handlePlayerClick = (booking, bookingIndex) => {
    const bookingData = {
      flight: booking.Flight,
      TeeBox: booking.TeeBox,
      teeTime: booking.TeeTime,
      bookMap: booking.children?.bookMap,
      bookingIndex: bookingIndex
    }
    dispatch(updateBookingData(bookingData))
  }

  return (
    <tr className={`
      hover:bg-gray-50 transition duration-300 ease-in-out
      ${isBlock ? 'border-2 border-red-500 animate-pulse' : ''}
    `}>
      <TeeTimeCell teeTime={processedItem.TeeTime} />
      {processedItem.players.map((player, i) => (
        <PlayerCell
          key={i}
          player={player}
          isBlockRow={processedItem.isBlockRow}
          bookingIndex={processedItem.bookingIndices[i]}
          onClick={() => !isBlock && handlePlayerClick(processedItem, processedItem.bookingIndices[i])}
        />
      ))}
      <td className="border px-4 py-2 text-center text-sm">
        <DropdownMenu
          onAction={(action) => console.log(action, processedItem)}
        />
      </td>
    </tr>
  )
})

export default FlightTableRow