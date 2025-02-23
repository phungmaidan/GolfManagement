/* eslint-disable no-console */
// FlightTableRow.jsx
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DropdownMenu from './DropdownMenu/DropdownMenu'
import PlayerCell from './PlayerCell/PlayerCell'
import TeeTimeCell from './TeeTimeCell/TeeTimeCell'
import { processItemUtils } from '~/utils/processItemUtils'
import { updateBookingData } from '~/redux/socket/socketSlice'

const FlightTableRow = React.memo(({ item, isBlock }) => {
  // Use useMemo for expensive calculations
  console.log('FlightTableRow render')
  const processedItem = processItemUtils.processItem(item)
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
    </>
  )
})

export default FlightTableRow