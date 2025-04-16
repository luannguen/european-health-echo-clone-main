/**
 * Password Reset Routes
 * RESTful API routes for password reset functionality
 */

import express from 'express';
import passwordResetController from './password-reset.controller.js';
import { authenticate, authorize } from '../../middleware/auth.js';

const router = express.Router();

// Register password reset routes
router.use('/auth/reset-password', passwordResetController);

export default router;