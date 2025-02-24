import React, { useMemo } from 'react'
import DailyOperation from './DailyOperation/DailyOperation'
import FlightInfo from './DailyOperation/FlightInfo/FlightInfo'

const FunctionItemsProgram = () => {
  const dailyOperation = useMemo(() => {
    return <DailyOperation />
  }, [])

  return (
    <div className="ml-10 mb-10 mr-10 glass shadow-golf backdrop-blur-lg rounded-lg p-4 overflow-hidden">
      <FlightInfo />
      {dailyOperation}
    </div>
  )
}

export default React.memo(FunctionItemsProgram)