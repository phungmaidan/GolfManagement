import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import io from 'socket.io-client'
import { API_ROOT } from '~/utils/constants'
import { openBookingPopup } from '~/redux/bookingFlight/bookingFlightSlice'
import { selectSelectedDate, selectSelectedCourse } from '~/redux/booking/bookingSlice'

const initialState = {
  isConnected: false,
  selectedBookings: null,
  error: null,
  loading: false
}
// Tạo socket instance
let socket = null

// Thunk action để khởi tạo socket connection
export const initializeSocket = createAsyncThunk(
  'socket/initialize',
  async (accessToken, { dispatch, getState }) => {
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
        // const state = getState()
        // const selectedDate = selectSelectedDate(state)
        // const selectedCourse = selectSelectedCourse(state)

        // if (selectedDate && selectedCourse) {
        //   const filteredData = data.filter(booking =>
        //     booking?.data?.selectedDate === selectedDate &&
        //     booking?.data?.selectedCourse === selectedCourse
        //   )
        //   console.log('filteredData', filteredData)
        //   if (filteredData.length > 0) {
        //     dispatch(setSelectedBookings(filteredData))
        //   }
        // }
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
  async (booking, { dispatch, getState }) => {
    if (!socket?.connected) return null

    const state = getState()
    const selectedDate = selectSelectedDate(state)
    const selectedCourse = selectSelectedCourse(state)

    if (booking === null) {
      socket.emit('sendDataClient', null)
      return null
    }
    const flightData = {
      flight: booking.flight,
      TeeBox: booking.TeeBox,
      teeTime: booking.teeTime,
      selectedDate,
      selectedCourse
    }

    // Dispatch action từ bookingFlightSlice trước khi emit
    dispatch(openBookingPopup(booking))

    socket.emit('sendDataClient', flightData)
    return flightData
  }
)

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