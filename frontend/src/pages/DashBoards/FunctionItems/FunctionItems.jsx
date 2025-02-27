import React, { useEffect, useMemo } from 'react'
import FunctionItemsProgram from '~/components/FunctionItemsContent/FunctionItemsProgram/FunctionItemsProgram'
import FunctionItemsTitle from '~/components/FunctionItemsContent/FunctionItemsTitle/FunctionItemsTitle'
import { useDispatch, useSelector } from 'react-redux'
import BookingPortal from '~/components/BookingPortal/BookingPortal'
import { initializeSocket, selectConnectionStatus } from '~/redux/socket/socketSlice'

const FunctionItems = () => {
  // Use connection status selector directly from socketSlice
  const isConnected = useSelector(selectConnectionStatus)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeSocket())
  }, [dispatch]) // Remove accessToken from dependencies

  const connectionMessage = useMemo(() => {
    if (isConnected) {
      return (
        <div className="mt-2 text-xl text-center text-shimmer-gold mb-2">
          Connected to server: Now you can book a flight real-time
        </div>
      )
    }
    return null
  }, [isConnected])

  return (
    <>
      {connectionMessage}
      <div className="flex gap-5 min-h-150 flex-col justify-center">
        <FunctionItemsTitle />
        <FunctionItemsProgram />
      </div>
      <BookingPortal />
    </>
  )
}

export default React.memo(FunctionItems)
