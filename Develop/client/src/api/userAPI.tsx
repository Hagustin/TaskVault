import Auth from '../utils/auth';

const retrieveUsers = async () => {
  try {
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Invalid user API response, check network tab!');
    }

    console.log('Fetched Users:', data); // Debug log
    return data;
  } catch (err) {
    console.error('Error from data retrieval:', err);
    return [];
  }
};

export { retrieveUsers };
