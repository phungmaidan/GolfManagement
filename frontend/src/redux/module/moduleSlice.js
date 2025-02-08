// src/redux/slices/moduleSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

const initialState = {
    selectedModule: null,
    selectedFunction: 'Tasks',
    selectedItem: null,
    items: [], // Lưu danh sách các items từ API
};

// Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
export const getItemAPI = createAsyncThunk(
    'module/getItemAPI',
    async (data, thunkAPI) => {
        const state = thunkAPI.getState().module;
        const { selectedModule, selectedFunction } = state
        if (!selectedModule || !selectedFunction) {
            // Nếu chưa có thông tin cần thiết, có thể trả về reject hoặc xử lý theo yêu cầu
            return thunkAPI.rejectWithValue('Module hoặc Function chưa được chọn');
        }
        try {
            // Gọi API, lưu ý nếu API của cần query parameters, có thể truyền chúng qua option params
            const response = await authorizedAxiosInstance.get(
                `${API_ROOT}/v1/modules/${selectedModule.ModuleID}/${selectedFunction}`,
                data // hoặc cấu trúc data tùy theo yêu cầu của API
            );
            return response.data;
        } catch (error) {
            // Xử lý lỗi, ví dụ như hiển thị toast thông báo lỗi
            toast.error('Lỗi khi lấy dữ liệu');
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

const moduleSlice = createSlice({
    name: 'module',
    initialState,
    reducers: {
        setSelectedFunction: (state, action) => {
            state.selectedFunction = action.payload;
        },
        setSelectedModule: (state, action) => {
            state.selectedModule = action.payload;
        },
        setSelectedItem: (state, action) => {
            state.selectedItem = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getItemAPI.fulfilled, (state, action) => {
                // Cập nhật danh sách items từ API
                state.items = action.payload;

            })
            .addCase(getItemAPI.rejected, (state, action) => {
                // Xử lý lỗi nếu cần
            });
    }
});

export const { setSelectedFunction, setSelectedModule, setSelectedItem } = moduleSlice.actions;
export const selectItems = (state) => state.module.items;
export const selectSelectedItem = (state) => state.module.selectedItem;
export const moduleReducer = moduleSlice.reducer;