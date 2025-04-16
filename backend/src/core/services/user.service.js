/**
 * User Service
 * Handles business logic for user-related operations
 */

import userRepository from '../repositories/user.repository.js';
import roleService from './role.service.js';
import bcrypt from 'bcrypt';

/**
 * UserService encapsulates all business logic related to users
 */
class UserService {
  constructor() {
    this.userRepository = userRepository;
    this.roleService = roleService;
    this.saltRounds = 10;
  }

  /**
   * Get a list of users with pagination and filtering
   * @param {Object} options - Query options
   * @returns {Promise<Object>} - Paginated users with metadata
   */
  async getUsers(options = {}) {
    return await this.userRepository.getUsers(options);
  }

  /**
   * Get a user by ID
   * @param {number} id - User ID
   * @returns {Promise<Object|null>} - User object or null if not found
   */
  async getUserById(id) {
    return await this.userRepository.findById(id);
  }

  /**
   * Get valid user roles
   * @returns {Promise<Array<string>>} - Array of valid role names
   */
  async getValidRoles() {
    return await this.roleService.getAllRoles();
  }

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} - Created user object
   */
  async createUser(userData) {
    // Validate required fields
    if (!userData.username || !userData.email || !userData.password) {
      throw new Error('Username, email and password are required');
    }

    // Check if username or email already exists
    const usernameExists = await this.userRepository.usernameExists(userData.username);
    if (usernameExists) {
      throw new Error('Username already exists');
    }

    const emailExists = await this.userRepository.emailExists(userData.email);
    if (emailExists) {
      throw new Error('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, this.saltRounds);
    
    // Validate role
    const role = await this.roleService.validateRole(userData.role);
    
    // Prepare user data for creation
    const newUser = {
      ...userData,
      password: hashedPassword,
      role,
      is_active: userData.is_active !== undefined ? userData.is_active : true,
      created_at: new Date(),
      updated_at: new Date()
    };

    // Create user
    const user = await this.userRepository.create(newUser);
    
    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Update a user
   * @param {number} id - User ID
   * @param {Object} userData - User data to update
   * @returns {Promise<Object|null>} - Updated user object or null
   */
  async updateUser(id, userData) {
    // Get existing user
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Check if username is being changed and already exists
    if (userData.username && userData.username !== existingUser.username) {
      const usernameExists = await this.userRepository.usernameExists(userData.username);
      if (usernameExists) {
        throw new Error('Username already exists');
      }
    }

    // Check if email is being changed and already exists
    if (userData.email && userData.email !== existingUser.email) {
      const emailExists = await this.userRepository.emailExists(userData.email);
      if (emailExists) {
        throw new Error('Email already exists');
      }
    }
    
    // Validate role if it's being updated
    if (userData.role) {
      const isValidRole = await this.roleService.isValidRole(userData.role);
      if (!isValidRole) {
        throw new Error(`Invalid role: ${userData.role}`);
      }
      userData.role = await this.roleService.validateRole(userData.role);
    }

    // Hash password if provided
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, this.saltRounds);
    }

    // Add updated_at
    userData.updated_at = new Date();

    // Update user
    const updatedUser = await this.userRepository.update(id, userData);
    
    // Return null if user was not found (should not happen)
    if (!updatedUser) {
      return null;
    }
    
    // Return user without password
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }

  /**
   * Delete a user
   * @param {number} id - User ID
   * @returns {Promise<boolean>} - True if deleted, false otherwise
   */
  async deleteUser(id) {
    return await this.userRepository.delete(id);
  }

  /**
   * Update the last login time for a user
   * @param {number} id - User ID
   * @returns {Promise<boolean>} - True if updated successfully
   */
  async updateLastLogin(id) {
    try {
      await this.userRepository.update(id, {
        last_login: new Date(),
        updated_at: new Date()
      });
      return true;
    } catch (error) {
      console.error('Error updating last login time:', error);
      return false;
    }
  }

  /**
   * Authenticate a user by username/email and password
   * @param {string} usernameOrEmail - Username or email
   * @param {string} password - Password
   * @returns {Promise<Object|null>} - Authenticated user or null
   */
  async authenticate(usernameOrEmail, password) {
    // Try to find user by username or email
    let user = await this.userRepository.findByUsername(usernameOrEmail);
    if (!user) {
      user = await this.userRepository.findByEmail(usernameOrEmail);
    }

    // If user not found or not active
    if (!user || !user.is_active) {
      return null;
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return null;
    }

    // Update last login time
    await this.userRepository.updateLastLogin(user.id);

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Change user password
   * @param {number} id - User ID
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<boolean>} - True if password changed, false otherwise
   */
  async changePassword(id, currentPassword, newPassword) {
    // Get user with password
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify current password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, this.saltRounds);

    // Update password
    await this.userRepository.update(id, { 
      password: hashedPassword,
      updated_at: new Date()
    });

    return true;
  }
  
  /**
   * Check if a user has a specific role
   * @param {number} userId - User ID
   * @param {string|Array<string>} roles - Role or roles to check
   * @returns {Promise<boolean>} - True if user has the role
   */
  async userHasRole(userId, roles) {
    return await this.roleService.userHasRole(userId, roles);
  }
  
  /**
   * Check if a user is an admin
   * @param {number} userId - User ID
   * @returns {Promise<boolean>} - True if user is an admin
   */
  async isAdmin(userId) {
    return await this.roleService.isAdmin(userId);
  }
}

// Create and export a singleton instance
const userService = new UserService();
export default userService;