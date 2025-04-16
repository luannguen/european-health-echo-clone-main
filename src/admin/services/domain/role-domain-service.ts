import { ApiBrokerInterface } from '../../services/api-broker';
import { BaseDomainServiceImpl, DomainOperationResult } from './base-domain-service';
import { Role, Permission } from '../../controllers/RoleController';
import { API_ENDPOINTS } from '../../services/api-endpoints';

/**
 * Available operations in RoleDomainService
 */
export enum RoleOperations {
  CREATE_ROLE = 'CREATE_ROLE',
  UPDATE_ROLE = 'UPDATE_ROLE',
  DELETE_ROLE = 'DELETE_ROLE',
  ASSIGN_PERMISSIONS = 'ASSIGN_PERMISSIONS',
  VIEW_ROLE_DETAILS = 'VIEW_ROLE_DETAILS',
  VIEW_ROLE_LIST = 'VIEW_ROLE_LIST',
  VIEW_ROLE_USERS = 'VIEW_ROLE_USERS'
}

/**
 * Interface for RoleDomainService
 * Contains all business operations related to role management
 */
export interface RoleDomainService {
  /**
   * Gets roles with pagination and filtering
   */
  getRoles(params?: Record<string, any>): Promise<DomainOperationResult<Role[]>>;
  
  /**
   * Gets a role by ID
   */
  getRoleById(roleId: number): Promise<DomainOperationResult<Role>>;
  
  /**
   * Creates a new role with validation and security checks
   */
  createRole(roleData: Partial<Role>): Promise<DomainOperationResult<Role>>;
  
  /**
   * Updates an existing role with validation and security checks
   */
  updateRole(roleId: number, roleData: Partial<Role>): Promise<DomainOperationResult<Role>>;
  
  /**
   * Deletes a role with validation and security checks
   */
  deleteRole(roleId: number): Promise<DomainOperationResult<boolean>>;
  
  /**
   * Assigns permissions to a role
   */
  assignPermissions(roleId: number, permissionIds: number[]): Promise<DomainOperationResult<boolean>>;
  
  /**
   * Gets all available permissions
   */
  getAllPermissions(): Promise<DomainOperationResult<Permission[]>>;
  
  /**
   * Gets permissions for a specific role
   */
  getRolePermissions(roleId: number): Promise<DomainOperationResult<Permission[]>>;
  
  /**
   * Gets all users assigned to a role
   */
  getUsersByRoleId(roleId: number): Promise<DomainOperationResult<any[]>>;
  
  /**
   * Validates role data based on business rules
   */
  validateRoleData(roleData: Partial<Role>, roleId?: number): Promise<{isValid: boolean, errors: Record<string, string[]>}>;
  
  /**
   * Checks if a role name is available (not used by another role)
   */
  isRoleNameAvailable(name: string, excludeRoleId?: number): Promise<boolean>;
  
  /**
   * Creates a default set of permissions for a new role
   */
  createDefaultPermissions(roleId: number): Promise<DomainOperationResult<boolean>>;
}

/**
 * Implementation of RoleDomainService
 * Contains business logic for role management
 */
export class RoleDomainServiceImpl extends BaseDomainServiceImpl implements RoleDomainService {
  // System roles that cannot be modified or deleted
  private readonly SYSTEM_ROLES = ['admin', 'superadmin'];
  
  constructor(private apiBroker: ApiBrokerInterface) {
    super();
  }
  
  /**
   * Gets roles with pagination and filtering
   */  async getRoles(params: Record<string, any> = {}): Promise<DomainOperationResult<Role[]>> {
    if (!(await this.canPerformOperation(RoleOperations.VIEW_ROLE_LIST))) {
      return this.createErrorResult(
        'PERMISSION_DENIED',
        'You do not have permission to view roles'
      );
    }
    
    try {
      const result = await this.apiBroker.get<Role[]>(API_ENDPOINTS.ROLES.LIST, {}, params);
      return this.createSuccessResult(result);
    } catch (error: any) {
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to fetch roles',
        error
      );
    }
  }
  
  /**
   * Gets a role by ID
   */  async getRoleById(roleId: number): Promise<DomainOperationResult<Role>> {
    if (!(await this.canPerformOperation(RoleOperations.VIEW_ROLE_DETAILS))) {
      return this.createErrorResult(
        'PERMISSION_DENIED',
        'You do not have permission to view role details'
      );
    }
    
    try {
      const result = await this.apiBroker.get<Role>(API_ENDPOINTS.ROLES.DETAIL, { id: roleId });
      return this.createSuccessResult(result);
    } catch (error: any) {
      if (error.status === 404) {
        return this.createErrorResult('NOT_FOUND', 'Role not found');
      }
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to fetch role details',
        error
      );
    }
  }
  
  /**
   * Maps operations to required permissions
   */
  protected getOperationPermission(operationName: string): string | null {
    const permissionMap: Record<string, string> = {
      [RoleOperations.CREATE_ROLE]: 'role:create',
      [RoleOperations.UPDATE_ROLE]: 'role:update',
      [RoleOperations.DELETE_ROLE]: 'role:delete',
      [RoleOperations.ASSIGN_PERMISSIONS]: 'role:assign-permissions',
      [RoleOperations.VIEW_ROLE_DETAILS]: 'role:view',
      [RoleOperations.VIEW_ROLE_LIST]: 'role:list',
      [RoleOperations.VIEW_ROLE_USERS]: 'role:view-users'
    };
    
    return permissionMap[operationName] || null;
  }
  
  /**
   * Gets available operations based on user's permissions
   */
  async getAvailableOperations(): Promise<string[]> {
    const operations = Object.values(RoleOperations);
    const availableOps: string[] = [];
    
    for (const op of operations) {
      if (await this.canPerformOperation(op)) {
        availableOps.push(op);
      }
    }
    
    return availableOps;
  }
  
  /**
   * Creates a new role with validation and security checks
   */  async createRole(roleData: Partial<Role>): Promise<DomainOperationResult<Role>> {
    // Check permission
    if (!(await this.canPerformOperation(RoleOperations.CREATE_ROLE))) {
      return this.createErrorResult(
        'PERMISSION_DENIED',
        'You do not have permission to create roles'
      );
    }
    
    // Validate data
    const validation = await this.validateRoleData(roleData);
    if (!validation.isValid) {
      return this.createValidationErrorResult(validation.errors);
    }
    
    try {
      const result = await this.apiBroker.post<Role>(API_ENDPOINTS.ROLES.CREATE, roleData);
      
      // Create default permissions for the new role
      if (result && 'role_id' in result) {
        await this.createDefaultPermissions(result.role_id);
      }
      
      return this.createSuccessResult(result);
    } catch (error: any) {
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to create role',
        error
      );
    }
  }
  
  /**
   * Updates an existing role with validation and security checks
   */  async updateRole(roleId: number, roleData: Partial<Role>): Promise<DomainOperationResult<Role>> {
    // Check permission
    if (!(await this.canPerformOperation(RoleOperations.UPDATE_ROLE))) {
      return this.createErrorResult(
        'PERMISSION_DENIED',
        'You do not have permission to update roles'
      );
    }
    
    // Check if this is a system role
    try {
      const existingRole = await this.apiBroker.get<Role>(API_ENDPOINTS.ROLES.DETAIL, { id: roleId });
      if ('name' in existingRole && this.SYSTEM_ROLES.includes(existingRole.name)) {
        return this.createErrorResult(
          'SYSTEM_ROLE',
          'System roles cannot be modified'
        );
      }
    } catch (error: any) {
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to check role',
        error
      );
    }    
    // Validate data
    const validation = await this.validateRoleData(roleData, roleId);
    if (!validation.isValid) {
      return this.createValidationErrorResult(validation.errors);
    }
    
    try {
      const result = await this.apiBroker.put<Role>(API_ENDPOINTS.ROLES.UPDATE, { id: roleId }, roleData);
      return this.createSuccessResult(result);
    } catch (error: any) {
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to update role',
        error
      );
    }
  }
  
  /**
   * Deletes a role with validation and security checks
   */  async deleteRole(roleId: number): Promise<DomainOperationResult<boolean>> {
    // Check permission
    if (!(await this.canPerformOperation(RoleOperations.DELETE_ROLE))) {
      return this.createErrorResult(
        'PERMISSION_DENIED',
        'You do not have permission to delete roles'
      );
    }
    
    // Check if role exists and is not a system role
    try {
      const roleData = await this.apiBroker.get<Role>(API_ENDPOINTS.ROLES.DETAIL, { id: roleId });
      
      // Don't allow deletion of system roles
      if ('name' in roleData && this.SYSTEM_ROLES.includes(roleData.name)) {
        return this.createErrorResult(
          'SYSTEM_ROLE',
          'System roles cannot be deleted'
        );
      }
      
      // Business rule: Check if the role has users
      const users = await this.getUsersByRoleId(roleId);
      if (users.success && users.data && users.data.length > 0) {
        return this.createErrorResult(
          'ROLE_IN_USE',
          'This role has users assigned to it and cannot be deleted'
        );
      }
    } catch (error: any) {
      if (error.status === 404) {
        return this.createErrorResult('NOT_FOUND', 'Role not found');
      }
      
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to check role',
        error
      );
    }
    
    try {
      await this.apiBroker.delete(API_ENDPOINTS.ROLES.DETAIL, { id: roleId });
      return this.createSuccessResult(true);
    } catch (error: any) {
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to delete role',
        error
      );
    }
  }
  
  /**
   * Assigns permissions to a role
   */  async assignPermissions(roleId: number, permissionIds: number[]): Promise<DomainOperationResult<boolean>> {
    // Check permission
    if (!(await this.canPerformOperation(RoleOperations.ASSIGN_PERMISSIONS))) {
      return this.createErrorResult(
        'PERMISSION_DENIED',
        'You do not have permission to assign permissions to roles'
      );
    }
    
    // Check if role exists and is not a system role
    try {
      const roleData = await this.apiBroker.get<Role>(API_ENDPOINTS.ROLES.DETAIL, { id: roleId });
      
      // For system roles, validate that critical permissions aren't removed
      if ('name' in roleData && this.SYSTEM_ROLES.includes(roleData.name)) {
        // Get current permissions
        const currentResult = await this.getRolePermissions(roleId);
        if (currentResult.success && currentResult.data) {
          const currentPermissions = currentResult.data;
          const criticalPermissions = currentPermissions.filter(p => p.name.startsWith('admin:'));
          const criticalIds = criticalPermissions.map(p => p.permission_id);
          
          // Check if any critical permission is being removed
          for (const id of criticalIds) {
            if (!permissionIds.includes(id)) {
              return this.createErrorResult(
                'SYSTEM_ROLE',
                'Critical permissions cannot be removed from system roles'
              );
            }
          }
        }
      }
    } catch (error: any) {
      if (error.status === 404) {
        return this.createErrorResult('NOT_FOUND', 'Role not found');
      }
      
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to check role',
        error
      );
    }
    
    // Validate that all permission IDs exist
    try {
      const allPermissions = await this.getAllPermissions();
      if (!allPermissions.success || !allPermissions.data) {
        return this.createErrorResult('API_ERROR', 'Failed to get permissions list');
      }
      
      const validPermissionIds = allPermissions.data.map(p => p.permission_id);
      const invalidPermissions = permissionIds.filter(id => !validPermissionIds.includes(id));
      
      if (invalidPermissions.length > 0) {
        return this.createErrorResult(
          'INVALID_PERMISSIONS',
          `The following permission IDs are invalid: ${invalidPermissions.join(', ')}`
        );
      }
    } catch (error: any) {
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to validate permissions',
        error
      );
    }
    
    try {
      await this.apiBroker.post(`/roles/${roleId}/permissions`, { permission_ids: permissionIds });
      return this.createSuccessResult(true);
    } catch (error: any) {
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to assign permissions',
        error
      );
    }
  }
  
  /**
   * Gets all available permissions
   */  async getAllPermissions(): Promise<DomainOperationResult<Permission[]>> {
    // Check permission
    if (!(await this.canPerformOperation(RoleOperations.ASSIGN_PERMISSIONS))) {
      return this.createErrorResult(
        'PERMISSION_DENIED',
        'You do not have permission to view permissions'
      );
    }
    
    try {
      const permissions = await this.apiBroker.get<Permission[]>('/permissions', {});
      return this.createSuccessResult(permissions);
    } catch (error: any) {
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to get permissions',
        error
      );
    }
  }
  
  /**
   * Gets permissions for a specific role
   */  async getRolePermissions(roleId: number): Promise<DomainOperationResult<Permission[]>> {
    // Check permission
    if (!(await this.canPerformOperation(RoleOperations.VIEW_ROLE_DETAILS))) {
      return this.createErrorResult(
        'PERMISSION_DENIED',
        'You do not have permission to view role permissions'
      );
    }
    
    try {
      const permissions = await this.apiBroker.get<Permission[]>(`/roles/${roleId}/permissions`, { id: roleId });
      return this.createSuccessResult(permissions);
    } catch (error: any) {
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to get role permissions',
        error
      );
    }
  }
  
  /**
   * Gets all users assigned to a role
   */  async getUsersByRoleId(roleId: number): Promise<DomainOperationResult<any[]>> {
    // Check permission
    if (!(await this.canPerformOperation(RoleOperations.VIEW_ROLE_USERS))) {
      return this.createErrorResult(
        'PERMISSION_DENIED',
        'You do not have permission to view users by role'
      );
    }
    
    try {
      const users = await this.apiBroker.get<any[]>(`/roles/${roleId}/users`, { id: roleId });
      return this.createSuccessResult(users);
    } catch (error: any) {
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to get users for this role',
        error
      );
    }
  }
  
  /**
   * Validates role data based on business rules
   */
  async validateRoleData(roleData: Partial<Role>, roleId?: number): Promise<{isValid: boolean, errors: Record<string, string[]>}> {
    const errors: Record<string, string[]> = {};
    
    // Validate role name
    if (roleData.name !== undefined) {
      if (!roleData.name) {
        errors.name = ['Role name is required'];
      } else if (roleData.name.length < 3) {
        errors.name = ['Role name must be at least 3 characters long'];
      } else if (this.SYSTEM_ROLES.includes(roleData.name) && !roleId) {
        errors.name = ['This name is reserved for system roles'];
      } else if (!(await this.isRoleNameAvailable(roleData.name, roleId))) {
        errors.name = ['This role name is already taken'];
      }
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
  
  /**
   * Checks if a role name is available (not used by another role)
   */  async isRoleNameAvailable(name: string, excludeRoleId?: number): Promise<boolean> {
    try {
      // This is a simplified example - in a real implementation, you would
      // call a specific API endpoint to check role name availability
      const roles = await this.apiBroker.get<Role[]>(API_ENDPOINTS.ROLES.LIST, {}, { name });
      
      // If the name belongs to the role being updated, it's available
      if (excludeRoleId && roles.length === 1) {
        return roles[0].role_id === excludeRoleId;
      }
      
      return roles.length === 0;
    } catch (error) {
      // If there's an error, assume the name is not available
      return false;
    }
  }
  
  /**
   * Creates a default set of permissions for a new role
   */
  async createDefaultPermissions(roleId: number): Promise<DomainOperationResult<boolean>> {
    try {
      // Get a list of basic permissions that every role should have
      const allPermissions = await this.getAllPermissions();
      if (!allPermissions.success || !allPermissions.data) {
        return this.createErrorResult('API_ERROR', 'Failed to get permissions list');
      }
      
      // Filter for basic permissions (this is just an example - adjust according to your system)
      const basicPermissionNames = ['user:view', 'role:view'];
      const basicPermissions = allPermissions.data
        .filter(p => basicPermissionNames.includes(p.name))
        .map(p => p.permission_id);
      
      // Assign these permissions to the role
      if (basicPermissions.length > 0) {
        await this.assignPermissions(roleId, basicPermissions);
      }
      
      return this.createSuccessResult(true);
    } catch (error: any) {
      // Don't fail the role creation if default permissions fail
      console.error('Failed to create default permissions for role', roleId, error);
      return this.createErrorResult(
        'API_ERROR',
        error.message || 'Failed to assign default permissions',
        error
      );
    }
  }
}
