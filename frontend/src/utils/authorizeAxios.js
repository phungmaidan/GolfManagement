// src/utils/authorizeAxios.js
import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatter'
import { refreshTokenAPI } from '~/apis'
import { logoutUserAPI } from '~/redux/user/userSlice'

/**
   * Không thể import { store } từ '~/redux/store' theo cách thông thường ở đây
   * Giải pháp: Inject store: là kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi component như file authorizeAxios hiện tại
   * Hiểu đơn giản: khi ứng dụng bắt đầu chạy lên, code sẽ chạy vào main.jsx đầu tiên, từ bên đó chúng ta gọi hàm injectStore ngay lập tức để gán biến mainStore vào biến axiosReduxStore cục bộ trong file này.
   * https://redux.js.org/faq/code-structure#how-can-i-use-the-redux-store-in-non-component-files
 */
let axiosReduxStore
export const injectStore = mainStore => { axiosReduxStore = mainStore }

// Khởi tạo một đối tượng Axios (authorizedAxiosInstance) mục đích để custom và cấu hình chung cho dự án.
let authorizedAxiosInstance = axios.create()

// Thời gian chờ tối đa của 1 request: để 10 phút
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

// withCredentials: Sẽ cho phép axios tự động gửi cookie trong mỗi request lên BE (phục vụ cho việc lưu JWT tokens (refresh & acess) vào trong httpOnly Cookie của trình duyệt)
//authorizedAxiosInstance.defaults.withCredentials = true

// 👉 Hàm lấy accessToken từ Redux store
const getAccessToken = () => axiosReduxStore.getState().user.accessToken


/**
 * Cấu hình Interceptors (Bộ đánh chặn vào giữa mọi Request & Response)
 */
// Interceptor Request: Can thiệp vào giữa những request API
authorizedAxiosInstance.interceptors.request.use((config) => {
  // Do something before request is sent
  // Kỹ thuật chăn spam click
  interceptorLoadingElements(true)
  const token = getAccessToken()
  if (token) config.headers.Authorization = `Bearer ${token}` // Gắn accessToken vào header
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// Khởi tạo một cái promise cho việc gọi api refresh_token
// Mục đích tạo Promise này để khi nào gọi api refresh_token xong xuôi thì mới retry lại nhiều api bị lỗi trước đó.
// https://www.thedutchlab.com/en/insights/using-axios-interceptors-for-refreshing-your-api-token
let refreshTokenPromise = null

// Interceptor Response: Can thiệp vào giữa những response nhận về
authorizedAxiosInstance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // Kỹ thuật chăn spam click
  interceptorLoadingElements(false)

  return response
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  // Mọi mã http status code nằm ngoài khoảng 200 - 299 sẽ là error và rơi vào đây

  // Kỹ thuật chặn spam click
  interceptorLoadingElements(false)

  /** Quan trọng: Xử lý Refresh Token tự động */
  // Trường hợp 1: Nếu như nhận mã 401 từ BE, thì gọi api đăng xuất luôn
  if (error.response?.status === 401) {
    axiosReduxStore.dispatch(logoutUserAPI(false))
  }

  // Trường hợp 2: Nếu như nhận mã 410 từ BE, thì sẽ gọi api refresh token để làm mới lại accessToken
  // Đầu tiên lấy được các request API đang bị lỗi thông qua error.config
  const originalRequests = error.config

  // Không cần dùng _retry cũng được vì refreshTokenPromise để check là đủ
  if (error.response?.status === 410 && !originalRequests._retry) {
    // Gán thêm một giá trị _retry luôn = true trong khoảng thời gian chờ, đảm bảo việc request token này chỉ luôn gọi 1 lần tại 1 thời điểm (nhìn lại điều kiện if ngay phía trên)
    originalRequests._retry = true

    // Kiểm tra xem nếu chưa có refreshTokenPromise thì thực hiện gán việc gọi api refresh_token đồng thời gán vào cho refreshTokenPromise
    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokenAPI()
        .then(data => {
          const newAccessToken = data?.accessToken
          if (newAccessToken) {
            // 🎯 Lưu token mới vào Redux store
            axiosReduxStore.dispatch({ type: 'user/updateAccessToken', payload: newAccessToken })
            return newAccessToken
          }
          throw new Error('Không lấy được accessToken mới!')
        })
        .catch((_error) => {
          // Nếu nhận bất kỳ lỗi nào từ api refresh token thì logout luôn
          axiosReduxStore.dispatch(logoutUserAPI(false))

          // return để tránh một lỗi bị gọi 2 lần API logout nếu như rơi vào trường hợp API RefreshToken trả về lỗi
          return Promise.reject(_error)
        })
        .finally(() => {
          // Dù API có thành công hay lỗi thì vẫn luôn gán lại refreshTokenPromise về null như ban đầu
          refreshTokenPromise = null
        })
    }

    // Cần return trường hợp refreshTokenPromise chạy thành công và xử lý thêm ở đây:
    return refreshTokenPromise.then(newAccessToken => {
      /**
      * Bước 1: Đối với Trường hợp nếu dự án cần lưu accessToken vào localstorage hoặc đâu đó thì sẽ viết thêm code xử lý ở đây.
      * Ví dụ: axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken
      * Hiện tại ở đây không cần bước 1 này vì chúng ta đã đưa accessToken vào cookie (xử lý từ phía BE) sau khi api refreshToken được gọi thành công.
      */

      // Bước 2: Bước Quan trọng: Return lại axios instance của chúng ta kết hợp các originalRequests để gọi lại những api ban đầu bị lỗi
      originalRequests.headers.Authorization = `Bearer ${newAccessToken}`
      return authorizedAxiosInstance(originalRequests) // Gọi lại request ban đầu
    })
  }

  // Xử lý tập trung phần hiển thị thông báo lỗi trả về từ mọi API ở đây (Viết code một lần: Clean Code)
  let errorMessage = error?.message
  if (error.response?.data?.message) {
    errorMessage = error.response?.data?.message
  }

  // Dùng toastify để hiển thị bất kể mọi mã lỗi lên màn hình - Ngoại trừ mã 410 - GONE phục vụ việc tự động refresh lại token.
  if (error.response?.statuss !== 410) {
    toast.error(errorMessage)
  }

  return Promise.reject(error)
})


export default authorizedAxiosInstance
