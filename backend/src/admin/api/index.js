/**
 * API Routes Index
 * Main file for API configuration and route registration
 */

import express from 'express';
import userRoutes from './user.routes.js';
import roleRoutes from './role.routes.js';
import passwordResetRoutes from './password-reset.routes.js';
import authRoutes from './auth.routes.js';
// Import other route files here as needed

const router = express.Router();

// API version & documentation info
router.get('/', (req, res) => {
  res.json({
    success: true,
    name: 'VRC Admin API',
    version: '1.0.0',
    description: 'RESTful API for VRC admin panel',
    documentation: '/api/docs' // If you add API documentation later
  });
});

// Register all API routes
router.use('/', userRoutes);
router.use('/', roleRoutes);
router.use('/', passwordResetRoutes);
router.use('/', authRoutes);
// Add other routes here

export default router;