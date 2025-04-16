/**
 * User Routes
 * RESTful API routes for user resource
 */

import express from 'express';
import userController from './user.controller.js';
import { authenticate, authorize } from '../../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/auth/login', userController.login);

// Protected routes (requires authentication)
router.get('/users', authenticate, authorize(['admin']), userController.getUsers);
router.get('/users/roles', authenticate, userController.getValidRoles);
router.get('/users/:id', authenticate, userController.getUserById);
router.get('/users/:id/has-role/:role', authenticate, userController.checkUserRole);
router.post('/users', authenticate, authorize(['admin']), userController.createUser);
router.put('/users/:id', authenticate, userController.updateUser);
router.delete('/users/:id', authenticate, authorize(['admin']), userController.deleteUser);
router.post('/users/:id/change-password', authenticate, userController.changePassword);

export default router;