// FlightTable.jsx
import React, { useMemo } from 'react'
import FlightTableHeader from './FlightTableHeader/FlightTableHeader'
import FlightTableRow from './FlightTableRow/FlightTableRow'
import { selectSelectedBookings } from '~/redux/socket/socketSlice'
import { useSelector } from 'react-redux'
const FlightTable = ({ title, schedule }) => {
  console.log('FlightTable render')
  const selectedBookings = useSelector(selectSelectedBookings)

  // Memoize blocked flights to prevent unnecessary recalculations
  const blockedFlightInfo = useMemo(() => {
    if (!selectedBookings) return new Map()

    const bookingsArray = Array.isArray(selectedBookings) ? selectedBookings : [selectedBookings]
    return new Map(
      bookingsArray
        .filter(booking => booking?.data?.flight && booking?.data?.teeTime && booking?.data?.TeeBox)
        .map(booking => [
          `${booking.data.flight}-${booking.data.teeTime}-${booking.data.TeeBox}`,
          booking.userId
        ])
    )
  }, [selectedBookings])

  return (
    <>
      <div className="bg-golf-green-50 p-4 rounded-lg shadow-golf overflow-x-auto animation-show">
        <h3 className="font-semibold text-golf-green-700 text-lg mb-4">{title}</h3>
        <table className="min-w-full border">
          <FlightTableHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            {schedule.map((item) => {
              const flightKey = `${item.Flight}-${item.TeeTime}-${item.TeeBox}`
              const userId = blockedFlightInfo.get(flightKey)
              const isBlock = Boolean(userId)
              return (
                <FlightTableRow
                  key={flightKey}
                  item={item}
                  isBlock={isBlock}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default React.memo(FlightTable)