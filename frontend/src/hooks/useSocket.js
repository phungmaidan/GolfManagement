import { useRef, useCallback } from 'react'
import io from 'socket.io-client'
import { API_ROOT } from '~/utils/constants'

export const useSocket = (accessToken) => {
  const socketRef = useRef()

  const initSocket = useCallback(() => {
    if (!socketRef.current) {
      socketRef.current = io(API_ROOT, {
        withCredentials: true,
        extraHeaders: {
          token: `${accessToken}`
        }
      })
    }
    return socketRef.current
  }, [accessToken])

  const updateSelectedRow = useCallback((booking) => {
    if (socketRef.current && socketRef.current.connected) {
      if (booking === null) {
        socketRef.current.emit('sendDataClient', null)
        return
      }
      const flightData = {
        flight: booking.Flight,
        TeeBox: booking.TeeBox,
        teeTime: booking.TeeTime
      }
      socketRef.current.emit('sendDataClient', flightData)
    }
  }, [])

  return {
    socket: socketRef.current,
    initSocket,
    updateSelectedRow
  }
}