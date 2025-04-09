// frontend/src/redux/bookingFlight/bookingFlightSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

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

export const saveBookingAPI = createAsyncThunk(
  'bookingFlight/saveBookingAPI',
  async (bookingData, thunkAPI) => {
    try {
      const response = await authorizedAxiosInstance.post(
        `${API_ROOT}/api/v1/bookings`,
        bookingData
      )

      // Show success message
      toast.success('Booking saved successfully!')

      return response.data
    } catch (error) {
      // Show error message
      toast.error(error.response?.data?.message || 'Failed to save booking')
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveBookingAPI.pending, (state) => {
        // Optional: Handle loading state
      })
      .addCase(saveBookingAPI.fulfilled, (state, action) => {
        // Handle successful save
        state.isPopupOpen = false // Close popup after successful save
      })
      .addCase(saveBookingAPI.rejected, (state, action) => {
        // Handle failed save
      })
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
