// FlightTable.jsx
import React, { useMemo } from 'react'
import FlightTableHeader from './FlightTableHeader/FlightTableHeader'
import FlightTableRow from './FlightTableRow/FlightTableRow'
import { selectSelectedBookings } from '~/redux/socket/socketSlice'
import { selectSelectedDate, selectSelectedCourse } from '~/redux/booking/bookingSlice'
import { useSelector } from 'react-redux'
const FlightTable = ({ title, schedule }) => {
  console.log('FlightTable render')
  const selectedBookings = useSelector(selectSelectedBookings)
  const selectedDate = useSelector(selectSelectedDate)
  const selectedCourse = useSelector(selectSelectedCourse)

  // Memoize blocked flights to prevent unnecessary recalculations
  const blockedFlightInfo = useMemo(() => {
    if (!selectedBookings) return new Map()

    const bookingsArray = Array.isArray(selectedBookings) ? selectedBookings : [selectedBookings]
    return new Map(
      bookingsArray
        .filter(booking =>
          booking?.data?.flight &&
          booking?.data?.teeTime &&
          booking?.data?.TeeBox &&
          booking.data.selectedDate === selectedDate &&
          booking.data.selectedCourse === selectedCourse
        )
        .map(booking => [
          `${booking.data.flight}-${booking.data.teeTime}-${booking.data.TeeBox}`,
          booking.userId
        ])
    )
  }, [selectedBookings, selectedDate, selectedCourse])

  return (
    <>
      <div className="bg-golf-green-50 p-4 rounded-lg shadow-golf overflow-x-auto animation-show">
        <h3 className="font-semibold text-golf-green-700 text-lg mb-4">{title}</h3>
        <table className="min-w-full">
          <FlightTableHeader />
          <tbody className="divide-y divide-yellow-400">
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