import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import io from 'socket.io-client'
import { API_ROOT } from '~/utils/constants'
import { openBookingPopup } from '~/redux/bookingFlight/bookingFlightSlice'
import { selectSelectedDate, selectSelectedCourse } from '~/redux/booking/bookingSlice'

const initialState = {
  isConnected: false,
  roomData: [],
  error: null,
  loading: false,
  currentRoom: null
}

let socket = null

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

        // Rejoin room if there was one
        const state = getState()
        const selectedDate = selectSelectedDate(state)
        const selectedCourse = selectSelectedCourse(state)

        if (selectedDate && selectedCourse) {
          dispatch(joinRoom({ date: selectedDate, courseId: selectedCourse }))
        }
      })

      socket.on('disconnect', () => {
        dispatch(setConnectionStatus(false))
      })

      socket.on('roomData', (data) => {
        console.log('roomData', data)
        dispatch(setRoomData(data))
      })

      socket.on('error', (error) => {
        dispatch(setError(error))
      })
    }
    return true
  }
)

export const joinRoom = createAsyncThunk(
  'socket/joinRoom',
  async ({ date, courseId }, { dispatch }) => {
    if (!socket?.connected) return null

    socket.emit('joinRoom', { date, courseId })
    return { date, courseId }
  }
)

export const updateBookingData = createAsyncThunk(
  'socket/updateBooking',
  async (booking, { dispatch, getState }) => {
    if (!socket?.connected) return null

    const state = getState()
    const selectedDate = selectSelectedDate(state)
    const selectedCourse = selectSelectedCourse(state)

    const bookingData = {
      date: selectedDate,
      courseId: selectedCourse,
      data: booking || null
    }
    if (booking) {
      dispatch(openBookingPopup(booking))
    }
    socket.emit('updateBooking', bookingData)
    return bookingData
  }
)

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload
    },
    setRoomData: (state, action) => {
      state.roomData = action.payload
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
        state.loading = false
        state.isConnected = true
      })
      .addCase(initializeSocket.rejected, (state, action) => {
        state.loading = false
        state.error = action.error
      })
      .addCase(joinRoom.fulfilled, (state, action) => {
        if (action.payload) {
          state.currentRoom = `${action.payload.date}-${action.payload.courseId}`
        }
      })
      .addCase(updateBookingData.fulfilled, (state, action) => {
        // Room updates will come through the roomData socket event
      })
  }
})

export const {
  setConnectionStatus,
  setRoomData,
  setError,
  resetSocket
} = socketSlice.actions

export const selectRoomData = (state) => state.socket.roomData
export const selectConnectionStatus = (state) => state.socket.isConnected
export const selectCurrentRoom = (state) => state.socket.currentRoom

export const socketReducer = socketSlice.reducer