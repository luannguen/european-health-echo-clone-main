/**
 * Role Routes
 * RESTful API routes for role resource
 */

import express from 'express';
import roleController from './role.controller.js';
import { authenticate, authorize } from '../../middleware/auth.js';

const router = express.Router();

// Public routes for roles information
router.get('/roles', roleController.getAllRoles);
router.get('/roles/defaults', roleController.getDefaultRoles);

// Protected routes (requires authentication)
router.get('/roles/validate/:role', authenticate, roleController.validateRole);
router.get('/roles/:role/users', authenticate, authorize(['admin']), roleController.getUsersByRole);

export default router;