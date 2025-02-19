// frontend/src/redux/bookingPopup/bookingPopupSlice.js
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

const bookingPopupSlice = createSlice({
  name: 'bookingPopup',
  initialState,
  reducers: {
    openPopup: (state, action) => {
      state.isOpen = true
      state.flightInfo = action.payload.flightInfo
      state.playerName = action.payload.playerName
      state.selectedPlayerIndex = action.payload.playerIndex
    },
    closePopup: (state) => {
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

export const { openPopup, closePopup, updateFlightInfo, updateGuestInfo } = bookingPopupSlice.actions

export const selectBookingPopup = (state) => state.bookingPopup
export const selectIsPopupOpen = (state) => state.bookingPopup.isOpen
export const selectFlightInfo = (state) => state.bookingPopup.flightInfo
export const selectPlayerName = (state) => state.bookingPopup.playerName


export const bookingPopupReducer = bookingPopupSlice.reducer
