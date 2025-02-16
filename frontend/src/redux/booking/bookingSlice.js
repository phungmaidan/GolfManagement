// src/redux/slices/bookingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
    selectedDate: new Date().toISOString().split('T')[0],
    courseList: [],
    selectedCourse: null,
    TeeTimeInfo: null,
    MorningDetail: null,
    AfternoonDetail: null,
    status: 'idle',
    error: null,
};

export const getCouseAPI = createAsyncThunk(
    'booking/getCouseAPI',
    async (_, thunkAPI) => {
        const { booking } = thunkAPI.getState();
        const { selectedDate } = booking;
        try {
            const params = { date: selectedDate };
            const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/items/get-course`, { params });
            return response.data;
        } catch (error) {
            toast.error('Lỗi khi lấy dữ liệu course');
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const getScheduleAPI = createAsyncThunk(
    'booking/getScheduleAPI',
    async ({ selectedCourse, selectedDate }, thunkAPI) => {
        try {
            const params = {
                CourseID: selectedCourse,
                date: selectedDate
            };
            console.log(params);
            const response = await authorizedAxiosInstance.get(
                `${API_ROOT}/v1/items/get-schedule`,
                { params }  // Pass params as axios config object
            );
            return response.data;
        } catch (error) {
            toast.error('Lỗi khi lấy dữ liệu booking');
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setSelectedDate: (state, { payload }) => {
            state.selectedDate = payload;
        },
        setSelectedCourse: (state, { payload }) => {
            state.selectedCourse = payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getCouseAPI.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getCouseAPI.fulfilled, (state, { payload }) => {
            state.status = 'succeeded';
            state.courseList = payload;
            state.selectedCourse = state.courseList[0].CourseID;
            state.error = null;
        })
        .addCase(getCouseAPI.rejected, (state, { payload }) => {
            state.status = 'failed';
            state.error = payload;
            state.courseList = [];
            state.selectedCourse = null;
        })
        .addCase(getScheduleAPI.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(getScheduleAPI.fulfilled, (state, { payload }) => {
            state.status = 'succeeded';
            state.error = null;
            state.TeeTimeInfo = payload?.TeeTimeInfo;
            state.MorningDetail = payload?.MorningDetail;
            state.AfternoonDetail = payload?.AfternoonDetail;
        })
        .addCase(getScheduleAPI.rejected, (state, { payload }) => {
            state.status = 'failed';
            state.error = payload;
            state.TeeTimeInfo = null;
            state.MorningDetail = null;
            state.AfternoonDetail = null;
        })
    }
});

export const {
    setSelectedDate,
    setSelectedCourse,
} = bookingSlice.actions;


export const selectSelectedDate = (state) => state.booking.selectedDate;
export const selectSelectedCourse = (state) => state.booking.selectedCourse;
export const selectCourseList = (state) => state.booking.courseList;
export const selectTeeTimeInfo = (state) => state.booking.TeeTimeInfo;
export const selectMorningDetail = (state) => state.booking.MorningDetail;
export const selectAfternoonDetail = (state) => state.booking.AfternoonDetail;

export const selectBookingStatus = (state) => state.booking.status;
export const selectBookingError = (state) => state.booking.error;

export const bookingReducer = bookingSlice.reducer;
