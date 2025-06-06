// src/redux/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

// Khởi tạo giá trị của một cái Slice trong Redux
const initialState = {
  currentUser: null,
  isActive: false,
  isStaff: false,
  userDetails: null,
  accessToken: null,
  userModule: []
}

// Các hành động gọi api (bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncThunk đi kèm với extraReducers
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
    // Lưu ý axios sẽ trả kết quả về qua property của nó là data
    return response.data
  }
)

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/update`, data)
    return response.status
  }
)

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (showSuccessMessage = true) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
    if (showSuccessMessage) {
      toast.success('Logged out successfully!')
    }
    return response.data
  }
)

export const loginGuestAPI = createAsyncThunk(
  'guest/loginGuestAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/guests/login`, data)
    // Lưu ý axios sẽ trả kết quả về qua property của nó là data
    return response.data
  }
)

// Khởi tạo một cái Slice trong kho lưu trữ - Redux Store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // Reducers: Nơi xử lý dữ liệu đồng bộ
  reducers: {},
  // ExtraReducers: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      // action.payload ở đây chính là response.data trả về ở trên
      state.currentUser = action.payload?.ID
      state.accessToken = action.payload?.accessToken
      state.isActive = action.payload?.Active
      state.isStaff = true
      state.userDetails = action.payload
      state.userModule = action.payload?.userModule
    })
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      /**
             * API logout sau khi gọi thành công thì sẽ clear thông tin currentUser về null ở đây
             * Kết hợp ProtectedRoute đã làm ở App.js => code sẽ điều hướng chuẩn về trang Login
             */
      state.accessToken = null
      state.userModule = []
      state.isActive = false
      state.isStaff = false
      state.userDetails = null
      state.currentUser = null
    })
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      const user = action.payload
      state.userModule = user.accessToken
      state.accessToken = user.accessToken
      state.isActive = true
      state.isStaff = true
      state.userDetails = user.user
      state.currentUser = user
    })
    builder.addCase(loginGuestAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload?.GuestID
      state.accessToken = action.payload?.accessToken
      state.isActive = action.payload?.AccountStatus
      state.userDetails = {
        GuestInfo: action.payload?.guestDetail,
        DisplayName: action.payload?.DisplayName,
        Username: action.payload?.username
      }
    })
  }
})


// Actions: Nơi dành cho các components bên dưới gọi bằng dispatch() tới nó để cập nhật lại dữ liệu thông qua reducer (chạy đồng bộ)
// Để ý ở trên thì không thấy properties actions đâu cả, bởi vì các actions này được redux tạo tự động theo tên của reducer
// export const {} = userSlice.actions

// Selectors: Là nơi dành cho các components bên dưới gọi bằng hook useSelector() để lấy dữ liệu từ trong kho redux store ra sử dụng
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}
export const selectUserModule = (state) => {
  return state.user.userModule
}
export const selectUserDetails = (state) => {
  return state.user.userDetails
}
export const selectIsActiveAccount = (state) => {
  return state.user.isActive
}
export const selectIsStaff = (state) => {
  return state.user.isStaff
}
export const selectAccessToken = (state) => {
  return state.user.accessToken
}

export const userReducer = userSlice.reducer