// frontend/src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client' // Chú ý là import từ 'react-dom/client'
import App from './App'

import "./index.css"; // Import Tailwind CSS
//import { ToastContainer } from 'react-toastify'
//import 'react-toastify/dist/ReactToastify.css'

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
                    {/* Thay thế MUI GlobalStyles bằng CSS của Tailwind trong index.css */}
                    <App />
                    {/* <ToastContainer position="bottom-left" theme="colored" /> */}
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
)
