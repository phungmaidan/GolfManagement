import React, { useMemo } from 'react'
import FlightTableHeader from './FlightTableHeader/FlightTableHeader'
import FlightTableRow from './FlightTableRow/FlightTableRow'
import { selectRoomData } from '~/redux/socket/socketSlice'
import { useSelector } from 'react-redux'

const FlightTable = ({ title, schedule, Session }) => {
  const roomData = useSelector(selectRoomData)
  // Memoize blocked flights to prevent unnecessary recalculations
  const blockedFlightInfo = useMemo(() => {
    if (!roomData) return new Map()

    return new Map(
      roomData
        .filter(booking => booking?.data)
        .map(booking => [
          `${booking.data.flight}-${booking.data.teeTime}-${booking.data.TeeBox}`,
          booking.userId
        ])
    )
  }, [roomData])

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
                  Session={Session}
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