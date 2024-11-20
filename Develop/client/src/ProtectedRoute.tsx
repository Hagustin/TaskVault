import { Navigate, Outlet } from 'react-router-dom';
import AuthService from './utils/auth';

const ProtectedRoute: React.FC = () => {
  const token = AuthService.getToken();
  if (!AuthService.loggedIn() || (token && AuthService.isTokenExpired(token))) {
    AuthService.logout();
    window.alert('Your session has expired. Please log in again.');
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
