import { createSelector } from '@reduxjs/toolkit'
import { selectAccessToken } from '~/redux/user/userSlice'
import { selectConnectionStatus } from '~/redux/socket/socketSlice'

export const selectFunctionItemsState = createSelector(
  [selectAccessToken, selectConnectionStatus],
  (accessToken, isConnected) => ({
    accessToken,
    isConnected
  })
)