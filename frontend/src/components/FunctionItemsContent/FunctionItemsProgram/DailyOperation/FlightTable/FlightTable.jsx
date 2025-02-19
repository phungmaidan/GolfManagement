// FlightTable.jsx
import React from 'react'
import FlightTableHeader from './FlightTableHeader/FlightTableHeader'
import FlightTableRow from './FlightTableRow/FlightTableRow'

const FlightTable = ({ title, schedule, updateSelectedRow, highlightedFlights }) => {
  return (
    <div className="bg-golf-green-50 p-4 rounded-lg shadow-golf overflow-x-auto animation-show">
      <h3 className="font-semibold text-golf-green-700 text-lg mb-4">{title}</h3>
      <table className="min-w-full border">
        <FlightTableHeader />
        <tbody className="bg-white divide-y divide-gray-200">
          {schedule.map((item) => {
            let isBlock = false
            // Convert Map entries to array and check each entry
            Array.from(highlightedFlights.values()).forEach((flight) => {
              if (
                flight.TeeBox === item.TeeBox && 
                flight.teeTime === item.TeeTime && 
                flight.flight === item.Flight
              ) {
                isBlock = true
              }
            })
            return <FlightTableRow
              key={`${item.Flight}-${item.TeeTime}-${item.TeeBox}`}
              item={item}
              updateSelectedRow={updateSelectedRow}
              isBlock={isBlock}
            />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default FlightTable