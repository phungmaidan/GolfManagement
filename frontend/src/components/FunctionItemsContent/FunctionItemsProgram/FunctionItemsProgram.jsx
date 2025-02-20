import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAccessToken } from '~/redux/user/userSlice'
import { initializeSocket, selectConnectionStatus } from '~/redux/socket/socketSlice'
import DailyOperation from './DailyOperation/DailyOperation'

const FunctionItemsProgram = () => {
  const dispatch = useDispatch()
  const accessToken = useSelector(selectAccessToken)
  const isConnected = useSelector(selectConnectionStatus)

  useEffect(() => {
    dispatch(initializeSocket(accessToken))
  }, [dispatch, accessToken])

  return (
    <div className="ml-10 mb-10 mr-10 glass shadow-golf backdrop-blur-lg rounded-lg p-4 overflow-hidden">
      {isConnected && (
        <div className="text-sm text-green-500 mb-2">Connected to server: Now you can book a flight real-time</div>
      )}
      <DailyOperation/>
    </div>
  )
}

export default FunctionItemsProgram