// src/redux/slices/bookingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
  todayDate: new Date().toISOString().split('T')[0],
  selectedDate: new Date().toISOString().split('T')[0],
  courseList: [],
  selectedCourse: null,
  HoleDescriptions: null,
  TeeTimeInfo: null,
  MorningDetail: null,
  AfternoonDetail: null,
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
      const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/items/get-course`, { params })
      // Trả về cả date và response.data
      return { courses: response.data, date }
    } catch (error) {
      toast.error('Lỗi khi lấy dữ liệu course')
      return thunkAPI.rejectWithValue(error.response?.data || error.message)
    }
  }
)

export const getScheduleAPI = createAsyncThunk(
  'booking/getScheduleAPI',
  async ({ date, course }, thunkAPI) => {
    try {
      // Kiểm tra tham số trước khi gọi API
      if (!date || !course) {
        throw new Error('Missing required parameters')
      }

      const params = {
        CourseID: course,
        date: date
      }


      const response = await authorizedAxiosInstance.get(
        `${API_ROOT}/v1/items/get-schedule`,
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCouseAPI.pending, (state) => {
        state.statusGetCourse = 'loading'
        state.errorGetCourse = null
      })
      .addCase(getCouseAPI.fulfilled, (state, { payload }) => {
        state.statusGetCourse = 'succeeded'
        state.courseList = payload.courses
        state.selectedCourse = state.courseList[0].CourseID
        state.selectedDate = payload.date // Cập nhật selectedDate
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
        state.statusGetSchedule = 'succeeded'
        state.TeeTimeInfo = payload?.TeeTimeInfo
        state.HoleDescriptions = payload?.HoleDescriptions
        state.MorningDetail = payload?.MorningDetail
        state.AfternoonDetail = payload?.AfternoonDetail
      })
      .addCase(getScheduleAPI.rejected, (state, { payload }) => {
        state.statusGetSchedule = 'failed'
        state.errorGetSchedule = payload
        state.TeeTimeInfo = null
        state.MorningDetail = null
        state.AfternoonDetail = null
      })
  }
})

export const {
  setSelectedDate,
  setSelectedCourse
} = bookingSlice.actions


export const selectSelectedDate = (state) => state.booking.selectedDate
export const selectSelectedCourse = (state) => state.booking.selectedCourse
export const selectCourseList = (state) => state.booking.courseList
export const selectTeeTimeInfo = (state) => state.booking.TeeTimeInfo
export const selectHoleDescriptions = (state) => state.booking.HoleDescriptions
export const selectMorningDetail = (state) => state.booking.MorningDetail
export const selectAfternoonDetail = (state) => state.booking.AfternoonDetail
export const selectTodayDate = (state) => state.booking.todayDate

export const selectStatusGetCourse = (state) => state.booking.statusGetCourse
export const selectErrorGetCourse = (state) => state.booking.errorGetCourse
export const selectStatusGetSchedule = (state) => state.booking.statusGetSchedule
export const selectErrorGetSchedule = (state) => state.booking.errorGetSchedule

export const bookingReducer = bookingSlice.reducer
