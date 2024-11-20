import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/ticketAPI';
import { TicketData } from '../interfaces/TicketData';
import { UserData } from '../interfaces/UserData';
import { retrieveUsers } from '../api/userAPI';

const CreateTicket = () => {
  const [newTicket, setNewTicket] = useState<TicketData>({
    id: null,
    name: '',
    description: '',
    status: 'Todo',
    assignedUserId: null,
    assignedUser: null,
  });

  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const data = await retrieveUsers();
      console.log('Retrieved users:', data); // Debug log
      setUsers(data);
  
      // Set the first user as the default assigned user
      if (data.length > 0) {
        setNewTicket((prev) => ({ ...prev, assignedUserId: data[0].id }));
      }
    } catch (err) {
      console.error('Failed to retrieve user info:', err);
      setError('Failed to load users. Please try again.');
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (newTicket) {
      try {
        const data = await createTicket(newTicket);
        console.log('Ticket created:', data);
        navigate('/');
      } catch (err) {
        console.error('Failed to create ticket:', err);
        setError('Failed to create ticket. Please try again.');
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create Ticket</h1>
        {error && <div className="error-message">{error}</div>}
        <label htmlFor="tName">Ticket Name</label>
        <textarea
          id="tName"
          name="name"
          value={newTicket.name || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="tStatus">Ticket Status</label>
        <select
          name="status"
          id="tStatus"
          value={newTicket.status || ''}
          onChange={handleInputChange}
        >
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <label htmlFor="tDescription">Ticket Description</label>
        <textarea
          id="tDescription"
          name="description"
          value={newTicket.description || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="tUserId">Assign User</label>
        <select
        name="assignedUserId"
        value={newTicket?.assignedUserId || ''}
        onChange={(e) =>
          setNewTicket((prev) => ({ ...prev, assignedUserId: Number(e.target.value) }))
        }
      >
        {users?.length > 0 ? (
          users.map((user) => (
            <option key={user.id} value={user.id || ''}>
              {user.username}
            </option>
          ))
        ) : (
          <option value="">No users available</option>
        )}
      </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateTicket;
