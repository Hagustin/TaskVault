import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Add auth routes
router.use('/auth', authRoutes);

// Protect API routes
router.use('/api', authenticateToken, apiRoutes);

export default router;

