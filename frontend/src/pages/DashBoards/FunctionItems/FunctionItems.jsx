import React, { useEffect, useMemo } from 'react'
import FunctionItemsProgram from '~/components/FunctionItemsContent/FunctionItemsProgram/FunctionItemsProgram'
import FunctionItemsTitle from '~/components/FunctionItemsContent/FunctionItemsTitle/FunctionItemsTitle'
import { useDispatch, useSelector } from 'react-redux'
import BookingPortal from '~/components/BookingPortal/BookingPortal'
import { initializeSocket } from '~/redux/socket/socketSlice'
import { selectFunctionItemsState } from '~/redux/selectors/functionItemsSelectors'

const FunctionItems = () => {
  // Use memoized selector
  const { accessToken, isConnected } = useSelector(selectFunctionItemsState)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeSocket(accessToken))
  }, [dispatch, accessToken])

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
