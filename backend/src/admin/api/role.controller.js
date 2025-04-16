/**
 * Role Controller
 * RESTful API controller for role management
 */

import BaseController from './base.controller.js';
import roleService from '../../core/services/role.service.js';
import userService from '../../core/services/user.service.js';

/**
 * RoleController handles HTTP requests related to user roles
 * Implements RESTful API endpoints for role management
 */
class RoleController extends BaseController {
  constructor() {
    super();
    this.roleService = roleService;
    this.userService = userService;
  }

  /**
   * Get all available roles
   * @route GET /api/roles
   */
  getAllRoles = async (req, res) => {
    try {
      const roles = await this.roleService.getAllRoles();
      return this.sendSuccess(res, roles);
    } catch (error) {
      return this.sendError(res, error.message);
    }
  };

  /**
   * Get default roles defined in the system
   * @route GET /api/roles/defaults
   */
  getDefaultRoles = async (req, res) => {
    try {
      const defaultRoles = this.roleService.getDefaultRoles();
      return this.sendSuccess(res, defaultRoles);
    } catch (error) {
      return this.sendError(res, error.message);
    }
  };

  /**
   * Check if a role is valid
   * @route GET /api/roles/validate/:role
   */
  validateRole = async (req, res) => {
    try {
      const { role } = req.params;
      const isValid = await this.roleService.isValidRole(role);
      // Return just the boolean value instead of an object
      return this.sendSuccess(res, isValid);
    } catch (error) {
      return this.sendError(res, error.message);
    }
  };

  /**
   * Get users by role
   * @route GET /api/roles/:role/users
   */
  getUsersByRole = async (req, res) => {
    try {
      const { role } = req.params;
      
      // Check if role is valid
      const isValid = await this.roleService.isValidRole(role);
      if (!isValid) {
        return this.sendBadRequest(res, `Invalid role: ${role}`);
      }
      
      // Use the user service to get users with pagination
      const options = {
        page: parseInt(req.query.page) || 1,
        pageSize: parseInt(req.query.pageSize) || 10,
        sortBy: req.query.sortBy || 'created_at',
        sortDir: req.query.sortDir || 'desc',
        role: role
      };
      
      const result = await this.userService.getUsers(options);
      return this.sendPaginated(res, result.data, result.pagination);
    } catch (error) {
      return this.sendError(res, error.message);
    }
  };
}

// Create and export a singleton instance
const roleController = new RoleController();
export default roleController;