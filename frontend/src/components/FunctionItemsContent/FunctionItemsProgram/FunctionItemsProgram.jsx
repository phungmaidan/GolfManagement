import React, { useState, useEffect } from 'react'
import DailyOperation from './DailyOperation/DailyOperation'
import { useSocket } from '~/hooks/useSocket'
import { selectAccessToken } from '~/redux/user/userSlice'
import { useSelector } from 'react-redux'

const FunctionItemsProgram = () => {
  const [highlightedFlights, setHighlightedFlights] = useState(new Map())
  const [id, setId] = useState()
  const accessToken = useSelector(selectAccessToken)
  const { socket, initSocket, updateSelectedRow } = useSocket(accessToken)

  useEffect(() => {
    const socket = initSocket()

    socket.on('getId', data => {
      setId(data)
    })

    socket.on('sendDataServer', dataArray => {
      console.log('Data got:', dataArray)
      setHighlightedFlights(prev => {
        const newMap = new Map()
        dataArray.forEach(({ userId, data }) => {
          if (data) {
            newMap.set(userId, {
              flight: data.flight,
              teeTime: data.teeTime,
              TeeBox: data.TeeBox
            })
          }
        })
        return newMap
      })
    })

    return () => {
      socket.disconnect()
    }
  }, [accessToken, initSocket])

  return (
    <div className="ml-10 mb-10 mr-10 glass shadow-golf backdrop-blur-lg rounded-lg p-4 overflow-hidden">
      <DailyOperation
        updateSelectedRow={updateSelectedRow}
        highlightedFlights={highlightedFlights}
      />
    </div>
  )
}

export default FunctionItemsProgram