// src/redux/store.js
//Redux: State management tool
import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './user/userSlice'
import { moduleReducer } from './module/moduleSlice'
import { bookingReducer } from './booking/bookingSlice'
import { bookingFlightReducer } from './bookingFlight/bookingFlightSlice'
import { socketReducer } from './socket/socketSlice'
import { guestReducer } from './guest/guestSlice'
/**
 * Cấu hình redux-persist
 * https://www.npmjs.com/package/redux-persist
 * Bài viết hướng dẫn này dễ hiểu hơn:
 * https://edvins.io/how-to-use-redux-persist-with-redux-toolkit
 */

import { combineReducers } from 'redux' // lưu ý chúng ta có sẵn redux trong node_modules bởi vì khi cài @reduxjs/toolkit là đã có luôn
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // default là localstorage

// Cấu hình persist
const rootPersistConfig = {
  key: 'root', // key của persist do chúng ta chỉ định, để mặc định là root
  storage: storage, // Biến storage ở trên - lưu vào localstorage
  whitelist: ['user', 'module', 'booking', 'socket', 'guest'] // định nghĩa các slice dữ liệu ĐƯỢC PHÉP duy trì qua mỗi lần f5 trình duyệt
  // blacklist: ['user'] // định nghĩa các slice KHÔNG ĐƯỢC PHÉP duy trì qua mỗi lần f5 trình duyệt
}

// Combine các reducers trong dự án ở đây
const reducers = combineReducers({
  //activeBoard: activeBoardReducer,
  user: userReducer,
  module: moduleReducer,
  booking: bookingReducer,
  socket: socketReducer,
  bookingFlight: bookingFlightReducer,
  guest: guestReducer
})

// Thực hiện persist Reducer
const persistedReducers = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducers,
  // Fix warning error when implement redux-persist
  // https://stackoverflow.com/a/63244831/8324172
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})
