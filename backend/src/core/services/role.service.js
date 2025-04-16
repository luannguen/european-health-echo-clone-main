/**
 * Role Service
 * Handles business logic for role-related operations
 */

import dbService from '../services/db.service.js';
import config from '../../config.js';

/**
 * RoleService encapsulates all business logic related to user roles
 */
class RoleService {
  constructor() {
    this.db = dbService;
    
    // Get roles from config instead of hardcoding
    this.defaultRoles = config.roles;
    
    // Default role is from config
    this.defaultRole = config.defaultRole;
  }

  /**
   * Get all valid roles
   * @returns {Promise<Array<string>>} - Array of valid role names
   */
  async getValidRoles() {
    return Object.values(this.defaultRoles);
  }
  
  /**
   * Get default roles object
   * @returns {Object} - Default roles object
   */
  getDefaultRoles() {
    return this.defaultRoles;
  }

  /**
   * Check if a role is valid
   * @param {string} role - Role to check
   * @returns {Promise<boolean>} - True if valid
   */
  async isValidRole(role) {
    const validRoles = await this.getValidRoles();
    return validRoles.includes(role);
  }
  
  /**
   * Validate a role string and return valid role or default
   * @param {string} role - Role to validate
   * @returns {Promise<string>} - Valid role or default role
   */
  async validateRole(role) {
    if (!role) {
      return this.defaultRole;
    }
    
    const isValid = await this.isValidRole(role);
    return isValid ? role : this.defaultRole;
  }
  
  /**
   * Check if a user has a specific role
   * @param {number} userId - User ID
   * @param {string|Array<string>} roles - Role or roles to check
   * @returns {Promise<boolean>} - True if user has the role
   */
  async userHasRole(userId, roles) {
    try {
      // Get user's role
      const result = await this.db.executeQuery(
        'SELECT role FROM users WHERE id = @userId',
        { userId }
      );
      
      if (!result.recordset || result.recordset.length === 0) {
        return false;
      }
      
      const userRole = result.recordset[0].role;
      
      // Check if user's role is in the provided roles
      const rolesToCheck = Array.isArray(roles) ? roles : [roles];
      return rolesToCheck.includes(userRole);
    } catch (error) {
      console.error('Error checking user role:', error);
      return false;
    }
  }
  
  /**
   * Check if a user is an admin
   * @param {number} userId - User ID
   * @returns {Promise<boolean>} - True if user is an admin
   */
  async isAdmin(userId) {
    return await this.userHasRole(userId, this.defaultRoles.ADMIN);
  }
  
  /**
   * Get all roles
   * @returns {Promise<Array>} - Array of roles
   */
  async getAllRoles() {
    return await this.getValidRoles();
  }
}

// Create and export a singleton instance
const roleService = new RoleService();
export default roleService;