import { ApiBrokerInterface } from '../../services/api-broker';
import { BaseDomainServiceImpl, DomainOperationResult } from './base-domain-service';
import { User, UserRole } from '../../controllers/UserController';

/**
 * Available operations in UserDomainService
 */
export enum UserOperations {
  CREATE_USER = 'CREATE_USER',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER',
  CHANGE_USER_ROLE = 'CHANGE_USER_ROLE',
  RESET_PASSWORD = 'RESET_PASSWORD',
  VIEW_USER_DETAILS = 'VIEW_USER_DETAILS',
  VIEW_USER_LIST = 'VIEW_USER_LIST'
}

/**
 * Interface for UserDomainService
 * Contains all business operations related to user management
 */
export interface UserDomainService {
  /**
   * Gets users with pagination and filtering
   */
  getUsers(params?: Record<string, any>): Promise<DomainOperationResult<User[]>>;
  
  /**
   * Gets a user by ID
   */
  getUserById(userId: number): Promise<DomainOperationResult<User>>;
  
  /**
   * Creates a new user with validation and security checks
   */
  createUser(userData: Partial<User>): Promise<DomainOperationResult<User>>;
  
  /**
   * Updates an existing user with validation and security checks
   */
  updateUser(userId: number, userData: Partial<User>): Promise<DomainOperationResult<User>>;
  
  /**
   * Deletes a user with validation and security checks
   */
  deleteUser(userId: number): Promise<DomainOperationResult<boolean>>;
  
  /**
   * Toggles a user's active status
   */
  toggleUserStatus(userId: number, isActive: boolean): Promise<DomainOperationResult<boolean>>;
  
  /**
   * Get available user roles
   */
  getUserRoles(): Promise<DomainOperationResult<UserRole[]>>;
  
  /**
   * Changes a user's role with validation and security checks
   */
  changeUserRole(userId: number, roleId: string | number): Promise<DomainOperationResult<User>>;
  
  /**
   * Validates user data based on business rules
   */
  validateUserData(userData: Partial<User>, userId?: number): Promise<{isValid: boolean, errors: Record<string, string[]>}>;
  
  /**
   * Checks if an email is available (not used by another user)
   */
  isEmailAvailable(email: string, excludeUserId?: number): Promise<boolean>;
  
  /**
   * Checks if a username is available (not used by another user)
   */
  isUsernameAvailable(username: string, excludeUserId?: number): Promise<boolean>;
  
  /**
   * Changes a user's password with security validations
   */
  changePassword(
    userId: number, 
    currentPassword: string, 
    newPassword: string
  ): Promise<DomainOperationResult<boolean>>;
  
  /**
   * Initiates a password reset process
   */
  requestPasswordReset(email: string): Promise<DomainOperationResult<boolean>>;
  
  /**
   * Verifies a password reset token
   */
  verifyResetToken(token: string): Promise<DomainOperationResult<boolean>>;
  
  /**
   * Completes a password reset process using a token
   */
  resetPassword(token: string, newPassword: string): Promise<DomainOperationResult<boolean>>;
  
  /**
   * Validates whether a password meets security requirements
   */
  validatePassword(password: string): {isValid: boolean, errors: string[]};
  
  /**
   * Gets a list of recent user activities
   */
  getUserActivities(userId: number): Promise<DomainOperationResult<any[]>>;
}

/**
 * Implementation of UserDomainService
 * Contains business logic for user management
 */
export class UserDomainServiceImpl extends BaseDomainServiceImpl implements UserDomainService {
  // Password validation settings
  private readonly PASSWORD_MIN_LENGTH = 8;
  private readonly PASSWORD_REQUIRES_UPPERCASE = true;
  private readonly PASSWORD_REQUIRES_NUMBER = true;
  private readonly PASSWORD_REQUIRES_SPECIAL = true;
  
  // Constructor with ApiBroker dependency
  constructor(private apiBroker: ApiBrokerInterface) {
    super();
  }
  
  /**
   * Gets users with pagination and filtering
   */
  async getUsers(params: Record<string, any> = {}): Promise<DomainOperationResult<User[]>> {
    if (!(await this.canPerformOperation(UserOperations.VIEW_USER_LIST))) {
      return this.createErrorResult(
        'PERMISSION_DENIED',
        'You do not have permission to view users'
      );
    }
    
    try {
      const result = await this.apiBroker.getUsers(params);
      return this.createSuccessResult(result);
    } catch (error: any) {
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to fetch users',
        error
      );
    }
  }
  
  /**
   * Gets a user by ID
   */
  async getUserById(userId: number): Promise<DomainOperationResult<User>> {
    if (!(await this.canPerformOperation(UserOperations.VIEW_USER_DETAILS))) {
      return this.createErrorResult(
        'PERMISSION_DENIED',
        'You do not have permission to view user details'
      );
    }
    
    try {
      const result = await this.apiBroker.getUserById(userId);
      return this.createSuccessResult(result);
    } catch (error: any) {
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to fetch user details',
        error
      );
    }
  }
  
  /**
   * Toggles a user's active status
   */
  async toggleUserStatus(userId: number, isActive: boolean): Promise<DomainOperationResult<boolean>> {
    if (!(await this.canPerformOperation(UserOperations.UPDATE_USER))) {
      return this.createErrorResult(
        'PERMISSION_DENIED',
        'You do not have permission to update user status'
      );
    }
    
    try {
      // Check if user exists
      await this.apiBroker.getUserById(userId);
      
      // Toggle user status
      await this.apiBroker.toggleUserStatus(userId, isActive);
      return this.createSuccessResult(true);
    } catch (error: any) {
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to update user status',
        error
      );
    }
  }
  
  /**
   * Get available user roles
   */
  async getUserRoles(): Promise<DomainOperationResult<UserRole[]>> {
    try {
      const roles = await this.apiBroker.getUserRoles();
      return this.createSuccessResult(roles);
    } catch (error: any) {
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to fetch user roles',
        error
      );
    }
  }
  
  /**
   * Verifies a password reset token
   */
  async verifyResetToken(token: string): Promise<DomainOperationResult<boolean>> {
    try {
      await this.apiBroker.get(`/password-reset/verify/${token}`, { token });
      return this.createSuccessResult(true);
    } catch (error: any) {
      return this.createErrorResult(
        'INVALID_TOKEN',
        'The reset token is invalid or has expired',
        error
      );
    }
  }
  
  /**
   * Maps operations to required permissions
   */
  protected getOperationPermission(operationName: string): string | null {
    const permissionMap: Record<string, string> = {
      [UserOperations.CREATE_USER]: 'user:create',
      [UserOperations.UPDATE_USER]: 'user:update',
      [UserOperations.DELETE_USER]: 'user:delete',
      [UserOperations.CHANGE_USER_ROLE]: 'user:change-role',
      [UserOperations.RESET_PASSWORD]: 'user:reset-password',
      [UserOperations.VIEW_USER_DETAILS]: 'user:view',
      [UserOperations.VIEW_USER_LIST]: 'user:list'
    };
    
    return permissionMap[operationName] || null;
  }
  
  /**
   * Gets available operations based on user's permissions
   */
  async getAvailableOperations(): Promise<string[]> {
    const operations = Object.values(UserOperations);
    const availableOps: string[] = [];
    
    for (const op of operations) {
      if (await this.canPerformOperation(op)) {
        availableOps.push(op);
      }
    }
    
    return availableOps;
  }

  /**
   * Creates a new user with validation and security checks
   */
  async createUser(userData: Partial<User>): Promise<DomainOperationResult<User>> {
    // Check permission
    if (!(await this.canPerformOperation(UserOperations.CREATE_USER))) {
      return this.createErrorResult(
        'PERMISSION_DENIED', 
        'You do not have permission to create users'
      );
    }
    
    // Validate data
    const validation = await this.validateUserData(userData);
    if (!validation.isValid) {
      return this.createValidationErrorResult(validation.errors);
    }
    
    try {
      const result = await this.apiBroker.createUser(userData);
      return this.createSuccessResult(result);
    } catch (error: any) {
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to create user',
        error
      );
    }
  }

  /**
   * Updates an existing user with validation and security checks
   */
  async updateUser(userId: number, userData: Partial<User>): Promise<DomainOperationResult<User>> {
    // Check permission
    if (!(await this.canPerformOperation(UserOperations.UPDATE_USER))) {
      return this.createErrorResult(
        'PERMISSION_DENIED', 
        'You do not have permission to update users'
      );
    }
    
    // Validate data
    const validation = await this.validateUserData(userData, userId);
    if (!validation.isValid) {
      return this.createValidationErrorResult(validation.errors);
    }
    
    try {
      const result = await this.apiBroker.updateUser(userId, userData);
      return this.createSuccessResult(result);
    } catch (error: any) {
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to update user',
        error
      );
    }
  }

  /**
   * Deletes a user with validation and security checks
   */
  async deleteUser(userId: number): Promise<DomainOperationResult<boolean>> {
    // Check permission
    if (!(await this.canPerformOperation(UserOperations.DELETE_USER))) {
      return this.createErrorResult(
        'PERMISSION_DENIED', 
        'You do not have permission to delete users'
      );
    }
    
    // Check if user exists
    try {
      await this.apiBroker.getUserById(userId);
    } catch (error) {
      return this.createErrorResult('NOT_FOUND', 'User not found');
    }
    
    // Business rule: Cannot delete admin users
    try {
      const userData = await this.apiBroker.getUserById(userId);
      if (userData.role === 'admin') {
        return this.createErrorResult(
          'BUSINESS_RULE_VIOLATION', 
          'Admin users cannot be deleted'
        );
      }
    } catch (error: any) {
      return this.createErrorResult('API_ERROR', error.message || 'Error checking user role');
    }
    
    try {
      await this.apiBroker.deleteUser(userId);
      return this.createSuccessResult(true);
    } catch (error: any) {
      return this.createErrorResult('API_ERROR', error.message || 'Failed to delete user');
    }
  }

  /**
   * Changes a user's role with validation and security checks
   */
  async changeUserRole(userId: number, roleId: string | number): Promise<DomainOperationResult<User>> {
    // Check permission
    if (!(await this.canPerformOperation(UserOperations.CHANGE_USER_ROLE))) {
      return this.createErrorResult(
        'PERMISSION_DENIED', 
        'You do not have permission to change user roles'
      );
    }
    
    // Business rule: Check if role is valid
    try {
      const roles = await this.apiBroker.getUserRoles();
      const isValidRole = roles.some((role: UserRole) => 
        role.role_id === roleId || role.name === roleId
      );
      
      if (!isValidRole) {
        return this.createErrorResult('INVALID_ROLE', 'The specified role does not exist');
      }
    } catch (error: any) {
      return this.createErrorResult('API_ERROR', error.message || 'Error validating role');
    }
    
    // Update the user
    try {
      const userData = await this.apiBroker.getUserById(userId);
      const updatedUser = await this.apiBroker.updateUser(userId, { 
        ...userData, 
        role: String(roleId) 
      });
      
      return this.createSuccessResult(updatedUser);
    } catch (error: any) {
      return this.createErrorResult('API_ERROR', error.message || 'Failed to change user role');
    }
  }

  /**
   * Validates user data based on business rules
   */
  async validateUserData(
    userData: Partial<User>, 
    userId?: number
  ): Promise<{isValid: boolean, errors: Record<string, string[]>}> {
    const errors: Record<string, string[]> = {};
    
    // Validate username
    if (userData.username) {
      if (userData.username.length < 3) {
        errors.username = ['Username must be at least 3 characters long'];
      } else if (!(await this.isUsernameAvailable(userData.username, userId))) {
        errors.username = ['This username is already taken'];
      }
    }
    
    // Validate email
    if (userData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        errors.email = ['Please enter a valid email address'];
      } else if (!(await this.isEmailAvailable(userData.email, userId))) {
        errors.email = ['This email is already in use'];
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Checks if an email is available (not used by another user)
   */
  async isEmailAvailable(email: string, excludeUserId?: number): Promise<boolean> {
    try {
      // This is a simplified example - in a real implementation, you would 
      // call a specific API endpoint to check email availability
      const users = await this.apiBroker.getUsers({ email });
      
      // If the email belongs to the user being updated, it's available
      if (excludeUserId && users.length === 1) {
        return users[0].user_id === excludeUserId;
      }
      
      return users.length === 0;
    } catch (error) {
      // If there's an error, assume the email is not available
      return false;
    }
  }

  /**
   * Checks if a username is available (not used by another user)
   */
  async isUsernameAvailable(username: string, excludeUserId?: number): Promise<boolean> {
    try {
      // This is a simplified example - in a real implementation, you would 
      // call a specific API endpoint to check username availability
      const users = await this.apiBroker.getUsers({ username });
      
      // If the username belongs to the user being updated, it's available
      if (excludeUserId && users.length === 1) {
        return users[0].user_id === excludeUserId;
      }
      
      return users.length === 0;
    } catch (error) {
      // If there's an error, assume the username is not available
      return false;
    }
  }

  /**
   * Changes a user's password with security validations
   */
  async changePassword(
    userId: number, 
    currentPassword: string, 
    newPassword: string
  ): Promise<DomainOperationResult<boolean>> {
    // Validate new password
    const passwordValidation = this.validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return this.createValidationErrorResult({
        newPassword: passwordValidation.errors
      });
    }
    
    try {
      await this.apiBroker.put(`/users/${userId}/password`, { id: userId }, {
        current_password: currentPassword,
        new_password: newPassword
      });
      
      return this.createSuccessResult(true);
    } catch (error: any) {
      if (error.status === 401) {
        return this.createErrorResult(
          'INVALID_CURRENT_PASSWORD',
          'Current password is incorrect'
        );
      }
      
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to change password'
      );
    }
  }

  /**
   * Initiates a password reset process
   */
  async requestPasswordReset(email: string): Promise<DomainOperationResult<boolean>> {
    // Check if email exists
    try {
      const users = await this.apiBroker.getUsers({ email });
      if (users.length === 0) {
        // For security reasons, don't reveal that the email doesn't exist
        return this.createSuccessResult(true);
      }
    } catch (error) {
      // For security reasons, don't reveal errors
    }
    
    try {
      await this.apiBroker.post('/password-reset/request', { email });
      return this.createSuccessResult(true);
    } catch (error: any) {
      // For security reasons, don't reveal too much about errors
      return this.createErrorResult(
        'API_ERROR',
        'An error occurred while processing your request'
      );
    }
  }

  /**
   * Completes a password reset process using a token
   */
  async resetPassword(token: string, newPassword: string): Promise<DomainOperationResult<boolean>> {
    // Validate new password
    const passwordValidation = this.validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return this.createValidationErrorResult({
        newPassword: passwordValidation.errors
      });
    }
    
    try {
      await this.apiBroker.post('/password-reset/reset', {
        token,
        new_password: newPassword
      });
      
      return this.createSuccessResult(true);
    } catch (error: any) {
      if (error.status === 400) {
        return this.createErrorResult(
          'INVALID_TOKEN',
          'The reset token is invalid or has expired'
        );
      }
      
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to reset password'
      );
    }
  }

  /**
   * Validates whether a password meets security requirements
   */
  validatePassword(password: string): {isValid: boolean, errors: string[]} {
    const errors: string[] = [];
    
    if (password.length < this.PASSWORD_MIN_LENGTH) {
      errors.push(`Password must be at least ${this.PASSWORD_MIN_LENGTH} characters long`);
    }
    
    if (this.PASSWORD_REQUIRES_UPPERCASE && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (this.PASSWORD_REQUIRES_NUMBER && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (this.PASSWORD_REQUIRES_SPECIAL && !/[^a-zA-Z0-9]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Gets a list of recent user activities
   */
  async getUserActivities(userId: number): Promise<DomainOperationResult<any[]>> {
    if (!(await this.canPerformOperation(UserOperations.VIEW_USER_DETAILS))) {
      return this.createErrorResult(
        'PERMISSION_DENIED', 
        'You do not have permission to view user activities'
      );
    }
    
    try {
      const activities = await this.apiBroker.get(`/users/${userId}/activities`, { id: userId });
      return this.createSuccessResult(activities);
    } catch (error: any) {
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to fetch user activities'
      );
    }
  }
}
