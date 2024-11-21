import { TicketData } from '../interfaces/TicketData';
import { ApiMessage } from '../interfaces/ApiMessage';
import Auth from '../utils/auth';

// Retrieve all tickets
const retrieveTickets = async () => {
  try {
    const token = Auth.getToken();  // Get the raw token
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch('/api/tickets/', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  // Send the token as a Bearer token
      },
    });

    if (!response.ok) {
      throw new Error('Invalid API response');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return [];
  }
};

// Retrieve a specific ticket by ID
const retrieveTicket = async (id: number | null): Promise<TicketData> => {
  try {
    const token = Auth.getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`/api/tickets/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  // Send the token as a Bearer token
      },
    });

    if (!response.ok) {
      throw new Error('Invalid API response');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return Promise.reject('Could not fetch singular ticket');
  }
};

// Create a new ticket
const createTicket = async (body: TicketData) => {
  try {
    const token = Auth.getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch('/api/tickets/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  // Send the token as a Bearer token
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Invalid API response');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error from Ticket Creation: ', err);
    return Promise.reject('Could not create ticket');
  }
};

// Update an existing ticket
const updateTicket = async (ticketId: number, body: TicketData): Promise<TicketData> => {
  try {
    const token = Auth.getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`/api/tickets/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  // Send the token as a Bearer token
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Invalid API response');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Update did not work', err);
    return Promise.reject('Update did not work');
  }
};

// Delete a ticket
const deleteTicket = async (ticketId: number): Promise<ApiMessage> => {
  try {
    const token = Auth.getToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`/api/tickets/${ticketId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  // Send the token as a Bearer token
      },
    });

    if (!response.ok) {
      throw new Error('Invalid API response');
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error in deleting ticket', err);
    return Promise.reject('Could not delete ticket');
  }
};

export { createTicket, deleteTicket, retrieveTickets, retrieveTicket, updateTicket };
