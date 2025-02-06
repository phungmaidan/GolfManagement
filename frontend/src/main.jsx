// frontend/src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client' // Chú ý là import từ 'react-dom/client'
import App from './App'
import { ThemeProvider } from '@mui/material/styles'

// Chuẩn hóa và reset các kiểu CSS mặc định của trình duyệt
import CssBaseline from '@mui/material/CssBaseline'

// Định nghĩa các quy tắc CSS toàn cục mà không cần chỉnh sửa từng thành phần riêng lẻ
import GlobalStyles from '@mui/material/GlobalStyles'
import theme from '~/theme'

// Cấu hình react-toastify thông báo đẩy
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Cấu hình MUI Dialog
import { ConfirmProvider } from 'material-ui-confirm'

// Cấu hình Redux Store
import { Provider } from "react-redux"
import { store } from "./redux/store"

// Cấu hình Redux-Persist
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist'
const persistor = persistStore(store)

// Kỹ thuật Inject Store: Là kỹ thuật khi cần sử dụng biến redux store ở các file ngoài phạm vi component
import { injectStore } from './utils/authorizeAxios'
injectStore(store)

// Cấu hình react-router-dom với BrowserRouter
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <BrowserRouter basename='/'>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <ThemeProvider theme={theme}>
                        <ConfirmProvider defaultOptions={{
                            allowClose: false,
                            dialogProps: { maxWidth: 'xs' },
                            cancellationButtonProps: { color: 'inherit' },
                            confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
                            //confirmationKeyword: 'CONFIRM',
                            buttonOrder: ['confirm', 'cancel']
                        }}>
                            <GlobalStyles styles={{ a: { textDecoration: 'none' } }} />
                            <CssBaseline />
                            <App />
                            <ToastContainer position="bottom-left" theme="colored" />
                        </ConfirmProvider>
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
)
