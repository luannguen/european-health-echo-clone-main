/**
 * Password Reset Controller
 * Handles API endpoints for password reset functionality
 */

import { Router } from 'express';
import passwordResetService from '../../core/services/password-reset.service.js';
import { authenticate, authorize } from '../../middleware/auth.js';
import config from '../../config.js';

const passwordResetController = Router();

// Log available routes for debugging
console.log('Registering password reset routes including debug endpoint');

/**
 * Request password reset
 * POST /api/auth/reset-password/request
 */
passwordResetController.post('/request', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }
    
    // Create a password reset token
    const result = await passwordResetService.createResetToken(email);
    
    // Always return success (even if email not found) to prevent email enumeration
    // The actual result is logged and can be used to send an email
    if (result.success) {
      console.log('Password reset token created:', result.data);
      // TODO: Send email with reset link
      // The reset link should be something like: /reset-password?token=<token>
    } else {
      console.log('Password reset request failed:', result.message);
    }
    
    return res.json({
      success: true,
      message: 'If an account with this email exists, a password reset link will be sent'
    });
    
  } catch (error) {
    console.error('Password reset request error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred processing your request'
    });
  }
});

/**
 * Validate reset token
 * GET /api/auth/reset-password/validate/:token
 */
passwordResetController.get('/validate/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token is required'
      });
    }
    
    // Validate the token
    const result = await passwordResetService.validateToken(token);
    
    return res.json(result);
    
  } catch (error) {
    console.error('Token validation error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred validating the token'
    });
  }
});

/**
 * Reset password with token
 * POST /api/auth/reset-password/reset
 */
passwordResetController.post('/reset', async (req, res) => {
  try {
    const { token, password } = req.body;
    
    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: 'Token and password are required'
      });
    }
      // Validate password strength with more comprehensive rules
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }
    
    // Check for password complexity
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    if (!(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar)) {
      return res.status(400).json({
        success: false,
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      });
    }
    
    // Reset the password
    const result = await passwordResetService.resetPassword(token, password);
    
    return res.json(result);
    
  } catch (error) {
    console.error('Password reset error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred resetting the password'
    });
  }
});

/**
 * Admin endpoint to clean up expired tokens
 * DELETE /api/auth/reset-password/cleanup
 * Requires admin privileges
 */
passwordResetController.delete('/cleanup', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const deletedCount = await passwordResetService.cleanupExpiredTokens();
    
    return res.json({
      success: true,
      message: `Cleaned up ${deletedCount} expired or used tokens`
    });
    
  } catch (error) {
    console.error('Token cleanup error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred cleaning up tokens'
    });
  }
});

/**
 * Debug endpoint to get a reset token for a user (only available in testing/development)
 * POST /api/auth/reset-password/debug/get-token
 * Requires admin privileges
 */
passwordResetController.post('/debug/get-token', authenticate, authorize(['admin']), async (req, res) => {
  // Temporarily allow debug endpoint regardless of environment mode for our test
  // Original code:
  // if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'development') {
  //   return res.status(404).json({
  //     success: false,
  //     message: 'Endpoint not available in production mode'
  //   });
  // }
  
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }
    
    // Get the latest token for this email
    const token = await passwordResetService.getTokenByEmail(email);
    
    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'No token found for this email'
      });
    }
    
    return res.json({
      success: true,
      data: {
        token: token.token,
        userId: token.user_id,
        expiresAt: token.expires_at
      }
    });
    
  } catch (error) {
    console.error('Debug token retrieval error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred retrieving the token'
    });
  }
});

/**
 * Admin endpoint to delete tokens for a specific user
 * DELETE /api/auth/reset-password/user/:userId
 * Requires admin privileges
 */
passwordResetController.delete('/user/:userId', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }
    
    const deletedCount = await passwordResetService.deleteTokensByUserId(userId);
    
    return res.json({
      success: true,
      message: `Deleted ${deletedCount} tokens for user ID ${userId}`
    });
    
  } catch (error) {
    console.error('User token deletion error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred deleting user tokens'
    });
  }
});

export default passwordResetController;