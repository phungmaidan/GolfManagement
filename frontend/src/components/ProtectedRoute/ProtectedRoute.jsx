import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
//import Footer from '~/components/Footer/Footer';
//import Header from '~/components/Header/Header';
const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />

  return (
  // Sử dụng div thay cho Container của MUI, áp dụng các lớp Tailwind CSS
    <div className="h-screen flex flex-col bg-blue-50">
      {/* Nội dung chính chiếm toàn bộ không gian còn lại */}
      <div className="flex-1 overflow-auto">
        {/* <Header logo="https://songbegolf.com.vn/template/images/logo.svg" /> */}
        <Outlet />
        {/* <Footer logo="https://songbegolf.com.vn/template/images/logo.svg" /> */}
      </div>
    </div>
  )
}

export default ProtectedRoute