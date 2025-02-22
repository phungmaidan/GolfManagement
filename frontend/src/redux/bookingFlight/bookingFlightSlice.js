// frontend/src/redux/bookingFlight/bookingFlightSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isPopupOpen: false,
  selectedBooking: {
    flight: null,
    TeeBox: '',
    teeTime: '',
    bookMap: [],
    bookingIndex: -1
  }
}

const bookingFlightSlice = createSlice({
  name: 'bookingFlight',
  initialState,
  reducers: {
    openBookingPopup: (state, action) => {
      state.isPopupOpen = true
      state.selectedBooking = action.payload
    },
    closeBookingPopup: (state, action) => {
      state.isPopupOpen = false
      state.selectedBooking = {
        flight: null,
        TeeBox: '',
        teeTime: '',
        bookMap: [],
        bookingIndex: -1
      }
    }
  }
})

export const { openBookingPopup, closeBookingPopup } = bookingFlightSlice.actions

export const selectBookingFlight = (state) => state.bookingFlight
export const selectIsPopBookingOpen = (state) => state.bookingFlight.isPopupOpen
export const selectSelectedBooking = (state) => state.bookingFlight.selectedBooking

export const bookingFlightReducer = bookingFlightSlice.reducer
