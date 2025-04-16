/**
 * Base interface for all domain services
 * Domain services handle complex business logic, validations, and workflows
 * that may involve multiple API calls or business rules
 */
export interface BaseDomainService {
  /**
   * Validates an operation is allowed based on permissions and business rules
   * @param operationName The operation name to validate
   * @param data Any data needed for validation
   * @returns True if operation is allowed, false otherwise
   */
  canPerformOperation(operationName: string, data?: any): Promise<boolean>;
  
  /**
   * Gets a list of all operations this service can perform
   * Useful for dynamic UI rendering based on permissions
   */
  getAvailableOperations(): Promise<string[]>;
}

/**
 * Result interface for domain service operations
 * Standardizes the return format for all domain service methods
 */
export interface DomainOperationResult<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  validationErrors?: Record<string, string[]>;
}

/**
 * Base class implementing common domain service functionality
 */
export abstract class BaseDomainServiceImpl implements BaseDomainService {
  // Current user's permissions
  protected permissions: string[] = [];
  
  /**
   * Sets the current user's permissions
   * Should be called when user logs in or permissions change
   */
  setPermissions(permissions: string[]): void {
    this.permissions = permissions;
  }
  
  /**
   * Default implementation - should be overridden by specific domain services
   */
  async canPerformOperation(operationName: string, data?: any): Promise<boolean> {
    const requiredPermission = this.getOperationPermission(operationName);
    if (!requiredPermission) return true;
    
    return this.permissions.includes(requiredPermission);
  }
  
  /**
   * Default implementation - should be overridden by specific domain services
   */
  async getAvailableOperations(): Promise<string[]> {
    return [];
  }
  
  /**
   * Gets the required permission for an operation
   * @param operationName Operation to check
   * @returns Permission string required or null if no permission required
   */
  protected getOperationPermission(operationName: string): string | null {
    return null;
  }
  
  /**
   * Helper to create a successful result
   */
  protected createSuccessResult<T>(data?: T): DomainOperationResult<T> {
    return {
      success: true,
      data
    };
  }
  
  /**
   * Helper to create an error result
   */
  protected createErrorResult(code: string, message: string, details?: any): DomainOperationResult {
    return {
      success: false,
      error: {
        code,
        message,
        details
      }
    };
  }
  
  /**
   * Helper to create a validation error result
   */
  protected createValidationErrorResult(
    validationErrors: Record<string, string[]>,
    message: string = 'Validation failed'
  ): DomainOperationResult {
    return {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message
      },
      validationErrors
    };
  }
}
