import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // Retrieves the user profile by decoding the JWT token
  getProfile(): JwtPayload | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode<JwtPayload>(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  // Checks if the user is logged in by verifying that the token exists and is not expired
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Checks if the token is expired based on the `exp` field in the JWT payload
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        const currentTime = Date.now() / 1000; // Current time in seconds
        return decoded.exp < currentTime; // If expired, return true
      }
      return false; // If `exp` is not defined, assume it's not expired
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true; // If token is invalid, consider it expired
    }
  }

  // Retrieves the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Saves the token in localStorage and redirects to home
  login(idToken: string): void {
    localStorage.setItem('token', idToken);
    window.location.replace('/'); // Redirect to home page
  }

  // Clears the token from localStorage and redirects to login page
  logout(): void {
    localStorage.removeItem('token');
    window.location.replace('/login'); // Redirect to login page
  }
}

export default new AuthService();
