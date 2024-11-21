import Auth from '../utils/auth';

// Retrieve all users
const retrieveUsers = async () => {
  try {
    const token = Auth.getToken();  // Get the raw token
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  // Send the token as a Bearer token
      },
    });

    if (!response.ok) {
      throw new Error('Invalid user API response');
    }

    const data = await response.json();
    console.log('Fetched Users:', data); // Debug log
    return data;
  } catch (err) {
    console.error('Error from data retrieval:', err);
    return [];
  }
};

export { retrieveUsers };
