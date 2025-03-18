import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  currentBooking: null,
  selectedCourse: null,
  selectedDate: null,
  selectedTimeSlot: null,
  MorningDetail: null,
  AfternoonDetail: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
}
export const getScheduleAPI = createAsyncThunk(
  'guest/getScheduleAPI',
  async ({ date, course }, thunkAPI) => {
    try {
      if (!date || !course) {
        throw new Error('Missing required parameters')
      }
      const params = {
        CourseID: course,
        date: date
      }
      const response = await authorizedAxiosInstance.get(
        `${API_ROOT}/v1/guests/get-schedule`,
        { params }
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch schedule')
    }
  }
)
// Async thunk for saving a booking
export const saveBookingAPI = createAsyncThunk(
  'guest/saveBookingAPI',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user, guest } = getState()
      const guestInfo = user.userDetails
      const { selectedCourse, selectedDate, selectedTimeSlot } = guest

      const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/guests/save-booking`, {
        guestInfo,
        bookingDetails: {
          courseId: selectedCourse?.id,
          courseName: selectedCourse?.name,
          bookingDate: selectedDate,
          timeSlot: selectedTimeSlot
        }
      })

      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to save booking')
    }
  }
)

const guestSlice = createSlice({
  name: 'guest',
  initialState,
  reducers: {
    resetBookingStatus: (state) => {
      state.status = 'idle'
      state.error = null
    },
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload
    },
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload
    },
    setSelectedTimeSlot: (state, action) => {
      state.selectedTimeSlot = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveBookingAPI.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(saveBookingAPI.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.currentBooking = action.payload
      })
      .addCase(saveBookingAPI.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(getScheduleAPI.pending, (state) => {
        state.status = 'loading'
        state.MorningDetail = null
        state.AfternoonDetail = null
        state.error = null
      })
      .addCase(getScheduleAPI.fulfilled, (state, action) => {
        state.status = 'succeeded'
        console.log(action.payload)
        state.MorningDetail = action.payload.MorningDetail
        state.AfternoonDetail = action.payload.AfternoonDetail
      })
      .addCase(getScheduleAPI.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

// Export actions
export const {
  setCurrentBooking,
  setSelectedCourse,
  setSelectedDate,
  setSelectedTimeSlot
} = guestSlice.actions

// Export selectors
export const selectCurrentBooking = (state) => state.guest.currentBooking
export const selectBookingStatus = (state) => state.guest.status
export const selectBookingError = (state) => state.guest.error
export const selectSelectedCourse = (state) => state.guest.selectedCourse
export const selectSelectedDate = (state) => state.guest.selectedDate
export const selectSelectedTimeSlot = (state) => state.guest.selectedTimeSlot
export const selectMorningDetail = (state) => state.guest.MorningDetail
export const selectAfternoonDetail = (state) => state.guest.AfternoonDetail

export const guestReducer = guestSlice.reducer
