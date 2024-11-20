import { UserLogin } from "../interfaces/UserLogin";

interface LoginResponse {
  token: string; // Define the structure of the login response
}

const login = async (userInfo: UserLogin): Promise<LoginResponse> => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed. Check credentials.');
    }

    return data; // This should return an object with the token property
  } catch (err) {
    console.error('Error in login:', err);
    return Promise.reject('Failed to login. Please try again.');
  }
};

export { login };

