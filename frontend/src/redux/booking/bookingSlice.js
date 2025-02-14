// src/redux/slices/bookingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { add } from 'lodash';
import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { slugify } from "~/utils/formatter";

const initialState = {
    selectedDate: new Date().toISOString().split('T')[0],
    courseList: [],
    selectedCourse: 'L - D',
    selectedFreTemplateofDay: null,
    selectedFreTemplateMaster: null,
    status: 'idle',
    error: null,
    guestInfo: null,
    teeTimeInfo: null,
    blockBooking: null,
    templateMaster: null,
    freFlightStatus: null,
    comGuestType: null
};

export const getCouseAPI = createAsyncThunk(
    'booking/getCouseAPI',
    async (_, thunkAPI) => {
        const { booking } = thunkAPI.getState();
        const { selectedDate } = booking;
        try {
            const params = { date: selectedDate };
            console.log('params', params);
            const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/items/get-course`, { params });
            return response.data;
        } catch (error) {
            toast.error('Lỗi khi lấy dữ liệu course');
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

export const getBookingListAPI = createAsyncThunk(
    'booking/getBookingListAPI',
    async (_, thunkAPI) => {
        const { booking, module } = thunkAPI.getState();
        const { selectedItem } = module;

        try {
            const params = {
                CourseID: booking.selectedCourse,
                selectedDate: booking.selectedDate
            };

            const response = await authorizedAxiosInstance.get(
                `${API_ROOT}/v1/items/${slugify(selectedItem.ItemName)}`,
                { params }
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
        setSelectedFreTemplateofDay: (state, { payload }) => {
            state.selectedFreTemplateofDay = payload;
        },
        setSelectedFreTemplateMaster: (state, { payload }) => {
            state.selectedFreTemplateMaster = payload;
        },
        setStatus: (state, { payload }) => {
            state.status = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBookingListAPI.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getBookingListAPI.fulfilled, (state, { payload }) => {
                state.status = 'succeeded';
                state.error = null;

                state.selectedFreTemplateofDay = payload?.FreTemplateofDay ?? null;
                state.selectedFreTemplateMaster = payload?.FreTemplateMaster ?? null;
                state.guestInfo = payload?.guestInfo ?? null;
                state.teeTimeInfo = payload?.teeTimeInfo ?? null;
                state.blockBooking = payload?.blockBooking ?? null;
                state.templateMaster = payload?.templateMaster ?? null;
                state.freFlightStatus = payload?.FreFlightStatus ?? null;
                state.comGuestType = payload?.ComGuestType ?? null;
            })
            .addCase(getBookingListAPI.rejected, (state, { payload }) => {
                state.status = 'failed';
                state.error = payload;

                // Reset các biến về null nếu fetch API lỗi
                state.selectedFreTemplateofDay = null;
                state.selectedFreTemplateMaster = null;
                state.guestInfo = null;
                state.teeTimeInfo = null;
                state.blockBooking = null;
                state.templateMaster = null;
                state.freFlightStatus = null;
                state.comGuestType = null;
            })
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

                // Reset các biến về null nếu fetch API lỗi
                state.selectedFreTemplateofDay = null;
                state.selectedFreTemplateMaster = null;
                state.guestInfo = null;
                state.teeTimeInfo = null;
                state.blockBooking = null;
                state.templateMaster = null;
                state.freFlightStatus = null;
                state.comGuestType = null;
                state.courseList = [];
                state.selectedCourse = null;

            });
    }
});

export const {
    setSelectedDate,
    setSelectedCourse,
    setSelectedFreTemplateofDay,
    setSelectedFreTemplateMaster,
    setStatus
} = bookingSlice.actions;

export const selectBookingStatus = (state) => state.booking.status;
export const selectBookingError = (state) => state.booking.error;
export const selectSelectedDate = (state) => state.booking.selectedDate;
export const selectGuestInfo = (state) => state.booking.guestInfo;
export const selectSelectedCourse = (state) => state.booking.selectedCourse;
export const selectTeeTimeInfo = (state) => state.booking.teeTimeInfo;
export const selectTemplateMaster = (state) => state.booking.templateMaster;
export const selectBlockBooking = (state) => state.booking.blockBooking;
export const selectSelectedFreTemplateofDay = (state) => state.booking.selectedFreTemplateofDay;
export const selectCourseList = (state) => state.booking.courseList;
export const selectFreFlightStatus = (state) => state.booking.freFlightStatus;
export const selectComGuestType = (state) => state.booking.comGuestType;

export const bookingReducer = bookingSlice.reducer;
