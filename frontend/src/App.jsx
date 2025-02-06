// frontend/src/App.jsx
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import NotFound from './pages/404/NotFound'
import DashBoards from './pages/DashBoards/DashBoards'
import Auth from './pages/Auth/Auth'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />
}

function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      {/* Redirect Route */}
      <Route path='/' element={
        // Ở đây cần replace giá trị true để nó thay thế route /, có thể hiểu là route / sẽ không còn nằm trong history của Browser.
        // Thực hành dễ hiểu hơn bằng cách nhấn Go Home từ trang 404 sau đó thử quay lại bằng nút Back của trình duyệt giữa 2 trường hợp có replace hoặc không có.
        <Navigate to="/dashboards" replace={true} />
      } />



      {/* Protected Routes (Hiểu đơn giản trong dự án là những route chỉ cho truy cập sau khi đã login) */}
      <Route element={<ProtectedRoute user={currentUser} />}>
        {/* <Outlet /> của react-router-dom sẽ chạy vào các child-route trong này */}
        {/* Dashboard */}
        <Route path='/dashboards' element={<DashBoards />} />

        {/* User Settings */}
      </Route>



      { /* Authentication */}
      <Route path='/login' element={<Auth />} />



      {/* 404 not found page */}
      <Route path='*' element={<NotFound />} />
    </Routes>

  )
}

export default App