import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '~/redux/user/userSlice';
import Login from './Login';

function Auth() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const currentUser = useSelector(selectCurrentUser);

  if (currentUser) {
    return <Navigate to='/' replace={true} />;
  }

  return (
    <div className="min-h-screen bg-gradient-luxury flex items-center justify-center px-4">
      {isLogin && <Login />}
    </div>
  );
}

export default Auth;
