import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded;
    }
    return null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    if (!token) {
      return false;
    }

    return !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded: JwtPayload = jwtDecode(token);
      if (decoded.exp) {
        return Date.now() >= decoded.exp * 1000;
      }
      return false;
    } catch (error) {
      console.error('Error decoding token', error);
      return true;
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('id_token');
    window.location.assign('/login');
  }
}

export default new AuthService();
