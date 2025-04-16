/**
 * Auth Controller
 * RESTful API controller for authentication operations
 */

import { Router } from 'express';
import authService from '../../core/services/auth.service.js';
import BaseController from './base.controller.js';
import { authenticate } from '../../middleware/auth.js';

class AuthController extends BaseController {
  constructor() {
    super();
    this.router = Router();
    this._registerRoutes();
  }
  _registerRoutes() {
    // Refresh token endpoint
    this.router.post('/refresh-token', this.refreshToken);
    
    // Logout endpoints
    this.router.post('/logout', authenticate, this.logout);
    this.router.post('/logout-all', authenticate, this.logoutAllDevices);
    
    // Get current user info
    this.router.get('/me', authenticate, this.getCurrentUser);
  }

  /**
   * Refresh access token using a refresh token
   * @route POST /api/auth/refresh-token
   */
  refreshToken = async (req, res) => {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return this.sendBadRequest(res, 'Refresh token is required');
      }
        try {
        // Sử dụng authService để refresh token
        const result = await authService.refreshToken(refreshToken);
        
        return this.sendSuccess(res, {
          accessToken: result.accessToken,
          expiresIn: result.expiresIn
        });
      } catch (authError) {
        return this.sendUnauthorized(res, authError.message || 'Invalid refresh token');
      }
    } catch (error) {
      return this.sendError(res, error.message);
    }
  };

  /**
   * Logout a user (revoke current token)
   * @route POST /api/auth/logout
   */
  logout = async (req, res) => {
    try {
      const token = req.token; // Set by authenticate middleware
      const { refreshToken } = req.body;
      
      const success = await authService.logout(token, refreshToken);
      
      if (success) {
        return this.sendSuccess(res, { message: 'Logged out successfully' });
      } else {
        return this.sendBadRequest(res, 'Logout failed');
      }
    } catch (error) {
      return this.sendError(res, error.message);
    }
  };
  /**
   * Logout from all devices (revoke all refresh tokens)
   * @route POST /api/auth/logout-all
   */
  logoutAllDevices = async (req, res) => {
    try {
      const userId = req.user.id; // Set by authenticate middleware
      
      const success = await authService.logoutAllDevices(userId);
      
      if (success) {
        return this.sendSuccess(res, { 
          message: 'Logged out from all devices successfully' 
        });
      } else {
        return this.sendBadRequest(res, 'Logout from all devices failed');
      }
    } catch (error) {
      return this.sendError(res, error.message);
    }
  };

  /**
   * Get current authenticated user information
   * @route GET /api/auth/me
   */
  getCurrentUser = async (req, res) => {
    try {
      // req.user is set by authenticate middleware
      if (!req.user || !req.user.id) {
        return this.sendUnauthorized(res, 'User not authenticated');
      }

      // Return the user data that was attached by authenticate middleware
      return this.sendSuccess(res, req.user);
    } catch (error) {
      return this.sendError(res, error.message);
    }
  };
}

// Create and export a singleton instance
const authController = new AuthController();
export default authController.router;
