import { Router } from 'express';
import * as authController from '../controllers/auth.controllers.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/me', authenticateJWT, authController.me);

export default router;
