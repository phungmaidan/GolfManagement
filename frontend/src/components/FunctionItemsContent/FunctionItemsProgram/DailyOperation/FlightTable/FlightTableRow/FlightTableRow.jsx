/* eslint-disable no-console */
// FlightTableRow.jsx
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DropdownMenu from './DropdownMenu/DropdownMenu'
import PlayerCells from './PlayerCells/PlayerCells'
import TeeTimeCell from './TeeTimeCell/TeeTimeCell'
import { updateBookingData } from '~/redux/socket/socketSlice'

const FlightTableRow = React.memo(({ item, Session }) => {
  // Mỗi booking(item) trong 1 flight có thể có 1 đến 3 group booking nên phải tách ra thành các group khác nhau để truy vấn chính xác, BookingIndices lưu vị trí của các guest thuộc cùng 1 group trong 1 flight
  const dispatch = useDispatch()
  const handlePlayerClick = (booking, bookingIndex) => {
    const bookingData = {
      flight: booking.Flight,
      Session: Session,
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
      ${item.status == 'block' ? 'border-2 border-red-500 animate-pulse' : ''}
    `}>
      <TeeTimeCell teeTime={item.TeeTime} />
      {item.status == 'booked_blocked' ? (
        <td className="border px-4 py-2 text-sm bg-red-200 text-center" colSpan={4}>
          {item?.blocking?.Remark || ''}
        </td>
      ) : (
        <PlayerCells item={item}/>
      )}
      <td className="border px-4 py-2 text-center text-sm">
        <DropdownMenu
          onAction={(action) => console.log(action)}
          flightId={item.Flight}
        />
      </td>
    </tr>
  )
})

export default FlightTableRow