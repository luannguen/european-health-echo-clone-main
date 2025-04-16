/**
 * Auth Routes
 * RESTful API routes for authentication
 */

import express from 'express';
import authController from './auth.controller.js';

const router = express.Router();

// Register auth routes
router.use('/auth', authController);

export default router;
