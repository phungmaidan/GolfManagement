// src/redux/slices/bookingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { slugify } from "~/utils/formatter";

const initialState = {
    selectedDate: new Date().toISOString().split('T')[0],
    selectedCourse: 'L - D',
    selectedFreTemplateofDay: 'null',
    selectedFreTemplateMaster: 'null',
    status: 'idle', // Thêm trạng thái cho việc tải dữ liệu (idle, loading, succeeded, failed)
    error: null,
    guestInfo: 'null',
    teeTimeInfo: 'null',
    templateMaster: 'null'
};

// Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
export const getBookingListAPI = createAsyncThunk(
    'booking/getBookingListAPI',
    async (data, thunkAPI) => {
        const stateBooking = thunkAPI.getState().booking
        const stateModule = thunkAPI.getState().module
        const { selectedItem } = stateModule
        const { selectedCourse, selectedDate } = stateBooking
        try {
            // Gọi API, lưu ý nếu API của cần query parameters, có thể truyền chúng qua option params
            const response = await authorizedAxiosInstance.get(
                `${API_ROOT}/v1/module_items/${slugify(selectedItem.ItemName)}`,
                {
                    params: {
                        CourseID: selectedCourse,
                        selectedDate: selectedDate
                    },
                }
            );
            return response.data;
        } catch (error) {
            // Xử lý lỗi, ví dụ như hiển thị toast thông báo lỗi
            toast.error('Lỗi khi lấy dữ liệu booking');
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },
        setSelectedCourse: (state, action) => {
            state.selectedCourse = action.payload;
        },
        setSelectedFreTemplateofDay: (state, action) => {
            state.selectedFreTemplateofDay = action.payload;
        },
        setSelectedFreTemplateMaster: (state, action) => {
            state.selectedFreTemplateMaster = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBookingListAPI.pending, (state) => {
                state.status = 'loading'; // Đang tải dữ liệu
            })
            .addCase(getBookingListAPI.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Đã tải dữ liệu thành công
                state.selectedFreTemplateofDay = action.payload?.FreTemplateofDay
                state.selectedFreTemplateMaster = action.payload?.FreTemplateMaster
                state.guestInfo = action.payload?.guestInfo
                state.teeTimeInfo = action.payload?.teeTimeInfo
                state.templateMaster = action.payload?.templateMaster
            })
            .addCase(getBookingListAPI.rejected, (state, action) => {
                state.status = 'failed'; // Đã gặp lỗi khi tải dữ liệu
                state.error = action.payload; // Lưu thông tin lỗi
            });
    }
});

export const {
    setSelectedDate,
    setSelectedCourse,
    setSelectedFreTemplateofDay,
    setSelectedFreTemplateMaster,
} = bookingSlice.actions;
export const selectBookingStatus = (state) => state.booking.status; // Chọn trạng thái loading
export const selectBookingError = (state) => state.booking.error; // Chọn lỗi nếu có
export const selectSelectedDate = (state) => state.bookibf.selectedDate;
export const selectGuestInfo = (state) => state.booking.guestInfo;
export const selectTeeTimeInfo = (state) => state.booking.teeTimeInfo;
export const selectTemplateMaster = (state) => state.booking.templateMaster;
export const selectSelectedFreTemplateofDay = (state) => state.booking.selectedFreTemplateofDay;
export const bookingReducer = bookingSlice.reducer;