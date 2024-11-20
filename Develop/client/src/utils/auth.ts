import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
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

  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        const currentTime = Date.now() / 1000; // Current time in seconds
        return decoded.exp < currentTime;
      }
      return false; // If `exp` is not defined, assume it's not expired
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true; // If token is invalid, consider it expired
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  login(idToken: string): void {
    localStorage.setItem('token', idToken);
    window.location.assign('/'); // Redirect to home page
  }

  logout(): void {
    localStorage.removeItem('token');
    window.location.assign('/login'); // Redirect to login page
  }
}

export default new AuthService();
