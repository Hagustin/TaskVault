import express from 'express';
import {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} from '../../controllers/ticket-controller.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = express.Router();

// Public route: Get all tickets
router.get('/', authenticateToken, getAllTickets);

// Secure the rest with authentication
router.get('/:id', authenticateToken, getTicketById);
router.post('/', authenticateToken, createTicket);
router.put('/:id', authenticateToken, updateTicket);
router.delete('/:id', authenticateToken, deleteTicket);

export { router as ticketRouter };

