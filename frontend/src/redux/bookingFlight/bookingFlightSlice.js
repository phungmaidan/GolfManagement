// frontend/src/redux/bookingFlight/bookingFlightSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  flightInfo: {
    flight: null,
    TeeBox: '',
    teeTime: '',
    bookMap: []
  },
  playerName: '',
  selectedPlayerIndex: -1
}

const bookingFlightSlice = createSlice({
  name: 'bookingFlight',
  initialState,
  reducers: {
    openFlight: (state, action) => {
      state.isOpen = true
      state.flightInfo = action.payload.flightInfo
      state.playerName = action.payload.playerName
      state.selectedPlayerIndex = action.payload.playerIndex
    },
    closeFlight: (state) => {
      state.isOpen = false
      state.flightInfo = initialState.flightInfo
      state.playerName = ''
      state.selectedPlayerIndex = -1
    },
    updateFlightInfo: (state, action) => {
      state.flightInfo = {
        ...state.flightInfo,
        ...action.payload
      }
    },
    updateGuestInfo: (state, action) => {
      const { guestIndex, field, value } = action.payload
      if (state.flightInfo.bookMap[0]?.details) {
        state.flightInfo.bookMap[0].details[guestIndex] = {
          ...state.flightInfo.bookMap[0].details[guestIndex],
          [field]: value
        }
      }
    }
  }
})

export const { openFlight, closeFlight, updateFlightInfo, updateGuestInfo } = bookingFlightSlice.actions

export const selectBookingFlight = (state) => state.bookingFlight
export const selectIsFlightOpen = (state) => state.bookingFlight.isOpen
export const selectFlightInfo = (state) => state.bookingFlight.flightInfo
export const selectPlayerName = (state) => state.bookingFlight.playerName


export const bookingFlightReducer = bookingFlightSlice.reducer
