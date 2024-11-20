import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../controllers/user-controller.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = express.Router();

// Public route: Get all users (Example: if public directory is needed)
router.get('/', authenticateToken, getAllUsers);

// Secure the rest with authentication
router.get('/:id', authenticateToken, getUserById);
router.post('/', authenticateToken, createUser);
router.put('/:id', authenticateToken, updateUser);
router.delete('/:id', authenticateToken, deleteUser);

export { router as userRouter };

