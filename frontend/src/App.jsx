// frontend/src/App.jsx
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import NotFound from './pages/404/NotFound'
import DashBoards from './pages/DashBoards/DashBoards'
import Auth from './pages/Auth/Auth'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
//import FunctionItems from './pages/DashBoards/FunctionItems/FunctionItems'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'



function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Routes>
      {/* Redirect Route */}
      <Route 
        path='/' 
        element={<Navigate to="/dashboards" replace={true} />} 
      />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute user={currentUser} />}>
        <Route path='/dashboards' element={<DashBoards />} />
        {/* <Route path='/dashboards/:slug' element={<FunctionItems />} /> */}
      </Route>

      {/* Authentication */}
      <Route path='/login' element={<Auth />} />

      {/* 404 Not Found */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
