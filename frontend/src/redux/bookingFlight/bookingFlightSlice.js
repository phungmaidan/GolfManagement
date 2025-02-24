// frontend/src/redux/bookingFlight/bookingFlightSlice.js
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  isPopupOpen: false,
  BookingInfo: null,
  CourseInfo: null,
  IDInfo: null,
  GuestList: null,
  OtherInfo: null,
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
    updateBookingInfo: (state, action) => {
      state.BookingInfo = action.payload
    },
    updateCourseInfo: (state, action) => {
      state.CourseInfo = action.payload
    },
    updateIDInfo: (state, action) => {
      state.IDInfo = action.payload
    },
    updateGuestList: (state, action) => {
      state.GuestList = action.payload
    },
    updateOtherInfo: (state, action) => {
      state.OtherInfo = action.payload
    },
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
    },
    saveBookingPopup: (state, action) => {
      const { BookingInfo, CourseInfo, IDInfo, GuestList, OtherInfo } = action.payload
      state.BookingInfo = BookingInfo
      state.CourseInfo = CourseInfo
      state.IDInfo = IDInfo
      state.GuestList = GuestList
      state.OtherInfo = OtherInfo
    }
  }
})

export const {
  openBookingPopup,
  closeBookingPopup,
  saveBookingPopup
} = bookingFlightSlice.actions

export const selectIsPopBookingOpen = (state) => state.bookingFlight.isPopupOpen
export const selectSelectedBooking = (state) => state.bookingFlight.selectedBooking

export const bookingFlightReducer = bookingFlightSlice.reducer
