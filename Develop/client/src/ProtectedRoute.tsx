import { Outlet, useNavigate } from 'react-router-dom';
import AuthService from './utils/auth';

const ProtectedRoute: React.FC = () => {
  const navigate = useNavigate();

  // Define the handleExpiredSession function here
  const handleExpiredSession = (navigate: ReturnType<typeof useNavigate>) => {
    navigate('/login', { state: { sessionExpired: true } });
  };

  const token = AuthService.getToken();

  // Check if the user is logged in or if the token is expired
  if (!AuthService.loggedIn() || (token && AuthService.isTokenExpired(token))) {
    AuthService.logout();
    handleExpiredSession(navigate); // Redirect with sessionExpired state
    return null; // Prevent rendering of protected content
  }

  return <Outlet />;
};

export default ProtectedRoute;
