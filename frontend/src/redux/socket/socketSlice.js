import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import io from 'socket.io-client'
import { API_ROOT } from '~/utils/constants'

// Tạo socket instance
let socket = null

// Thunk action để khởi tạo socket connection
export const initializeSocket = createAsyncThunk(
  'socket/initialize',
  async (accessToken, { dispatch }) => {
    if (!socket) {
      socket = io(API_ROOT, {
        extraHeaders: {
          token: accessToken
        }
      })

      socket.on('connect', () => {
        dispatch(setConnectionStatus(true))
      })

      socket.on('disconnect', () => {
        dispatch(setConnectionStatus(false))
      })

      socket.on('sendDataServer', (data) => {
        dispatch(setSelectedBookings(data))
      })

      socket.on('error', (error) => {
        dispatch(setError(error))
      })
    }
    return true
  }
)

// Thunk action để gửi data
export const updateBookingData = createAsyncThunk(
  'socket/updateBooking',
  async (booking) => {
    if (!socket?.connected) return null

    if (booking === null) {
      socket.emit('sendDataClient', null)
      return null
    }
    const flightData = {
      flight: booking.flight,
      TeeBox: booking.TeeBox,
      teeTime: booking.teeTime
    }
    socket.emit('sendDataClient', flightData)
    return flightData
  }
)

const initialState = {
  isConnected: false,
  selectedBookings: null,
  error: null,
  loading: false
}

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload
    },
    setSelectedBookings: (state, action) => {
      state.selectedBookings = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    resetSocket: (state) => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeSocket.pending, (state) => {
        state.loading = true
      })
      .addCase(initializeSocket.fulfilled, (state) => {
        state.selectedBookings = null
        state.loading = false
        state.isConnected = true
      })
      .addCase(initializeSocket.rejected, (state, action) => {
        state.loading = false
        state.selectedBookings = null
        state.error = action.error
      })
      .addCase(updateBookingData.fulfilled, (state, action) => {
        state.selectedBookings = action.payload
      })
  }
})

export const {
  setConnectionStatus,
  setSelectedBookings,
  setError,
  resetSocket
} = socketSlice.actions
export const selectSelectedBookings = (state) => state.socket.selectedBookings
export const selectConnectionStatus = (state) => state.socket.isConnected
export const socketReducer = socketSlice.reducer