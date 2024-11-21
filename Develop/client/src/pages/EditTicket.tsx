import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { retrieveTicket, updateTicket } from '../api/ticketAPI';
import { TicketData } from '../interfaces/TicketData';

const EditTicket = () => {
  const [ticket, setTicket] = useState<TicketData | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { state } = useLocation() as { state: TicketData | null }; // Explicitly type state

  const fetchTicket = async (ticketId: number) => {
    try {
      const data = await retrieveTicket(ticketId);
      setTicket(data);
    } catch (err) {
      console.error('Failed to retrieve ticket:', err);
      setError('Failed to retrieve ticket. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (state?.id) {
      fetchTicket(state.id);
    } else {
      setError('No ticket data provided. Unable to fetch ticket.');
      setIsLoading(false);
    }
  }, [state]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (ticket && ticket.id !== null) {
      try {
        await updateTicket(ticket.id, ticket);
        navigate('/'); // Navigate back to the main page
      } catch (err) {
        console.error('Failed to update ticket:', err);
        setError('Failed to update ticket. Please try again.');
      }
    } else {
      console.error('Ticket data is undefined.');
      setError('Ticket data is undefined.');
    }
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTicket((prev) => (prev ? { ...prev, [name]: value } : undefined));
  };

  return (
    <div className="container">
      {isLoading ? (
        <div>Loading ticket...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : ticket ? (
        <form className="form" onSubmit={handleSubmit}>
          <h1>Edit Ticket</h1>
          <label htmlFor="tName">Ticket Name</label>
          <textarea
            id="tName"
            name="name"
            value={ticket.name || ''}
            onChange={handleTextAreaChange}
            placeholder="Enter ticket name"
          />
          <label htmlFor="tStatus">Ticket Status</label>
          <select
            name="status"
            id="tStatus"
            value={ticket.status || ''}
            onChange={handleChange}
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <label htmlFor="tDescription">Ticket Description</label>
          <textarea
            id="tDescription"
            name="description"
            value={ticket.description || ''}
            onChange={handleTextAreaChange}
            placeholder="Enter ticket description"
          />
          <button type="submit">Submit Form</button>
        </form>
      ) : (
        <div>No ticket found.</div>
      )}
    </div>
  );
};

export default EditTicket;

