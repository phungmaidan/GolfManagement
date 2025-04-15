// src/redux/slices/bookingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  todayDate: new Date().toISOString().split('T')[0],
  selectedDate: new Date().toISOString().split('T')[0],
  sellectedSession: 'Morning',
  courseList: [],
  selectedCourse: null,
  teeTimes: null,
  statusGetCourse: 'idle',
  errorGetCourse: null,
  statusGetSchedule: 'idle',
  errorGetSchedule: null
}

export const getCouseAPI = createAsyncThunk(
  'booking/getCouseAPI',
  async (date, thunkAPI) => {
    try {
      const params = { date: date }
      const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/v1/bookings/courses`, { params })
      // Trả về cả date và response.data
      return { data: response.data, date }
    } catch (error) {
      toast.error('Lỗi khi lấy dữ liệu course')
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const getScheduleAPI = createAsyncThunk(
  'booking/getScheduleAPI',
  async ({ date, course, templateId, session }, thunkAPI) => {
    try {
      // Kiểm tra tham số trước khi gọi API
      if (!date || !course) {
        throw new Error('Missing required parameters')
      }

      const params = {
        courseId: course,
        date: date,
        templateId: templateId,
        session: session
      }


      const response = await authorizedAxiosInstance.get(
        `${API_ROOT}/api/v1/bookings/schedules`,
        { params }
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)


const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSelectedDate: (state, { payload }) => {
      state.selectedDate = payload
    },
    setSelectedCourse: (state, { payload }) => {
      state.selectedCourse = payload
    },
    setSelectedSession: (state, { payload }) => {
      state.sellectedSession = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCouseAPI.pending, (state) => {
        state.statusGetCourse = 'loading'
        state.errorGetCourse = null
      })
      .addCase(getCouseAPI.fulfilled, (state, { payload }) => {
        state.statusGetCourse = payload?.data?.status
        state.courseList = payload?.data?.courses
        state.selectedCourse = state.courseList[0]
        state.selectedDate = payload.date
      })
      .addCase(getCouseAPI.rejected, (state, { payload }) => {
        state.statusGetCourse = 'failed'
        state.errorGetCourse = payload
        state.courseList = null
        state.selectedCourse = null
      })
      .addCase(getScheduleAPI.pending, (state) => {
        state.statusGetSchedule = 'loading'
        state.errorGetSchedule = null
      })
      .addCase(getScheduleAPI.fulfilled, (state, { payload }) => {
        state.statusGetSchedule = payload?.status
        state.teeTimes = payload?.teeTimes
      })
      .addCase(getScheduleAPI.rejected, (state, { payload }) => {
        state.statusGetSchedule = 'failed'
        state.errorGetSchedule = payload
        state.teeTimes = null
      })
  }
})

export const {
  setSelectedDate,
  setSelectedCourse,
  setSelectedSession
} = bookingSlice.actions

export const selectSelectedSession = (state) => state.booking.sellectedSession
export const selectSelectedDate = (state) => state.booking.selectedDate
export const selectSelectedCourse = (state) => state.booking.selectedCourse
export const selectCourseList = (state) => state.booking.courseList
export const selectTeeTimes = (state) => state.booking.teeTimes
export const selectTodayDate = (state) => state.booking.todayDate

export const selectStatusGetCourse = (state) => state.booking.statusGetCourse
export const selectErrorGetCourse = (state) => state.booking.errorGetCourse
export const selectStatusGetSchedule = (state) => state.booking.statusGetSchedule
export const selectErrorGetSchedule = (state) => state.booking.errorGetSchedule

export const bookingReducer = bookingSlice.reducer
