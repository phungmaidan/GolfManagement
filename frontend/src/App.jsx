// frontend/src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFound from './pages/404/NotFound'
import DashBoards from './pages/DashBoards/DashBoards'
import Auth from './pages/Auth/Auth'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import FunctionItems from './pages/DashBoards/FunctionItems/FunctionItems'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Layout from './components/Layout/Layout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <>
      <Routes>
        {/* Redirect Route */}
        <Route 
          path='/' 
          element={<Navigate to="/dashboards" replace={true} />} 
        />

        {/* Protected Routes with Layout */}
        <Route element={<ProtectedRoute user={currentUser} />}>
          <Route element={<Layout />}>
            <Route path='/dashboards' element={<DashBoards />} />
            <Route path='/dashboards/:slug' element={<FunctionItems />} />
          </Route>
        </Route>

        {/* Authentication - No Layout */}
        <Route element={<Layout />}>
          <Route path='/login' element={<Auth />} />
        </Route>
        {/* 404 Not Found - No Layout */}
        <Route path='*' element={<NotFound />} />
      </Routes>
      <ToastContainer 
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
