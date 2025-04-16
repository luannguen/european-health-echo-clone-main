/**
 * User Controller
 * RESTful API controller for user management
 */

import BaseController from './base.controller.js';
import userService from '../../core/services/user.service.js';
import roleService from '../../core/services/role.service.js';
import authService from '../../core/services/auth.service.js';

/**
 * UserController handles HTTP requests related to users
 * Implements RESTful API endpoints for user management
 */
class UserController extends BaseController {
  constructor() {
    super();
    this.userService = userService;
    this.roleService = roleService;
  }

  /**
   * Get all users with pagination and filtering
   * @route GET /api/users
   */
  getUsers = async (req, res) => {
    try {
      const options = {
        page: parseInt(req.query.page) || 1,
        pageSize: parseInt(req.query.pageSize) || 10,
        sortBy: req.query.sortBy || 'created_at',
        sortDir: req.query.sortDir || 'desc',
        search: req.query.search || '',
        role: req.query.role
      };

      const result = await this.userService.getUsers(options);
      return this.sendPaginated(res, result.data, result.pagination);
    } catch (error) {
      return this.sendError(res, error.message);
    }
  };

  /**
   * Get a user by ID
   * @route GET /api/users/:id
   */
  getUserById = async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await this.userService.getUserById(userId);
      
      if (!user) {
        return this.sendNotFound(res, 'User not found');
      }
      
      return this.sendSuccess(res, user);
    } catch (error) {
      return this.sendError(res, error.message);
    }
  };

  /**
   * Get all available roles
   * @route GET /api/users/roles
   */
  getValidRoles = async (req, res) => {
    try {
      const roles = await this.userService.getValidRoles();
      return this.sendSuccess(res, roles);
    } catch (error) {
      return this.sendError(res, error.message);
    }
  };

  /**
   * Create a new user
   * @route POST /api/users
   */
  createUser = async (req, res) => {
    try {
      // Validate request body
      const { username, email, password, full_name, role, is_active } = req.body;
      
      if (!username || !email || !password) {
        return this.sendBadRequest(res, 'Username, email, and password are required');
      }

      // Create user with or without role (will use default if not specified)
      const userData = {
        username,
        email,
        password,
        full_name: full_name || '',
        is_active: is_active !== undefined ? is_active : true
      };
      
      // Only add role if provided
      if (role !== undefined) {
        userData.role = role;
      }

      const newUser = await this.userService.createUser(userData);
      return this.sendSuccess(res, newUser, 201);
    } catch (error) {
      if (error.message.includes('already exists')) {
        return this.sendBadRequest(res, error.message);
      }
      if (error.message.includes('Invalid role')) {
        return this.sendBadRequest(res, error.message);
      }
      return this.sendError(res, error.message);
    }
  };

  /**
   * Update a user
   * @route PUT /api/users/:id
   */
  updateUser = async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { username, email, password, full_name, role, is_active } = req.body;
      
      // Validate that at least one field is provided
      if (!username && !email && !password && !full_name && role === undefined && is_active === undefined) {
        return this.sendBadRequest(res, 'At least one field must be provided');
      }

      // If role is provided, check if it's valid
      if (role !== undefined) {
        const isValidRole = await this.roleService.isValidRole(role);
        if (!isValidRole) {
          // Return success: false instead of BadRequest
          return this.sendResponse(res, 200, {
            success: false,
            message: `Invalid role: ${role}`
          });
        }
      }

      // Prepare update data
      const updateData = {};
      if (username !== undefined) updateData.username = username;
      if (email !== undefined) updateData.email = email;
      if (password !== undefined) updateData.password = password;
      if (full_name !== undefined) updateData.full_name = full_name;
      if (role !== undefined) updateData.role = role;
      if (is_active !== undefined) updateData.is_active = is_active;

      // Update user
      const updatedUser = await this.userService.updateUser(userId, updateData);
      
      if (!updatedUser) {
        return this.sendNotFound(res, 'User not found');
      }
      
      return this.sendSuccess(res, updatedUser);
    } catch (error) {
      if (error.message === 'User not found') {
        return this.sendNotFound(res, error.message);
      }
      if (error.message.includes('already exists')) {
        return this.sendBadRequest(res, error.message);
      }
      if (error.message.includes('Invalid role')) {
        // In case there are other paths where invalid role errors are thrown,
        // also handle them here with success: false
        return this.sendResponse(res, 200, {
          success: false,
          message: error.message
        });
      }
      return this.sendError(res, error.message);
    }
  };

  /**
   * Delete a user
   * @route DELETE /api/users/:id
   */
  deleteUser = async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const deleted = await this.userService.deleteUser(userId);
      
      if (!deleted) {
        return this.sendNotFound(res, 'User not found');
      }
      
      return this.sendSuccess(res, { message: 'User deleted successfully' });
    } catch (error) {
      return this.sendError(res, error.message);
    }
  };
  /**
   * Authenticate a user (login)
   * @route POST /api/auth/login
   */
  login = async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return this.sendBadRequest(res, 'Username and password are required');
      }

      // Sử dụng authService mới để xác thực và tạo token
      const options = {
        userAgent: req.headers['user-agent'],
        ipAddress: req.ip
      };
      
      try {
        const authResult = await authService.login(username, password, options);
        
        // Trả về token và thông tin người dùng
        return this.sendSuccess(res, {
          user: authResult.user,
          token: authResult.tokens.accessToken,
          refreshToken: authResult.tokens.refreshToken,
          expiresIn: authResult.tokens.expiresIn
        });
      } catch (authError) {
        return this.sendUnauthorized(res, authError.message || 'Invalid username or password');
      }
    } catch (error) {
      return this.sendError(res, error.message);
    }
  };

  /**
   * Change password
   * @route POST /api/users/:id/change-password
   */
  changePassword = async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        return this.sendBadRequest(res, 'Current password and new password are required');
      }

      // Check if user exists
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return this.sendNotFound(res, 'User not found');
      }

      // Check if the authenticated user is changing their own password or is an admin
      const isAdmin = await this.userService.isAdmin(req.user.user_id);
      if (req.user.user_id !== userId && !isAdmin) {
        return this.sendForbidden(res, 'You are not authorized to change this user\'s password');
      }

      // Change password
      const success = await this.userService.changePassword(userId, currentPassword, newPassword);
      
      if (!success) {
        return this.sendBadRequest(res, 'Failed to change password');
      }
      
      return this.sendSuccess(res, { message: 'Password changed successfully' });
    } catch (error) {
      if (error.message === 'User not found') {
        return this.sendNotFound(res, error.message);
      }
      if (error.message === 'Current password is incorrect') {
        return this.sendBadRequest(res, error.message);
      }
      return this.sendError(res, error.message);
    }
  };

  /**
   * Check if a user has a specific role
   * @route GET /api/users/:id/has-role/:role
   */
  checkUserRole = async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { role } = req.params;
      
      // Check if user exists
      const user = await this.userService.getUserById(userId);
      if (!user) {
        return this.sendNotFound(res, 'User not found');
      }
      
      // Check if role is valid
      const isValidRole = await this.roleService.isValidRole(role);
      if (!isValidRole) {
        return this.sendBadRequest(res, `Invalid role: ${role}`);
      }
      
      // Check if user has the role
      const hasRole = await this.userService.userHasRole(userId, role);
      
      // Return just the boolean value instead of an object
      return this.sendSuccess(res, hasRole);
    } catch (error) {
      return this.sendError(res, error.message);
    }
  };
}

// Create and export a singleton instance
const userController = new UserController();
export default userController;