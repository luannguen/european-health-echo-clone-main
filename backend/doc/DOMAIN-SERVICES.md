# Domain Services Architecture

## Overview

The Domain Services layer is a powerful architectural component that sits between the Controllers and the API Broker. It centralizes all business logic, security validations, and complex workflow operations in one place, making the application more maintainable, testable, and secure.

## Purpose

The Domain Services layer serves the following purposes:
1. **Centralize Business Logic**: All business rules, validations, and complex operations are defined in one place
2. **Separate Concerns**: UI components focus on presentation, Controllers handle UI state, and Domain Services handle business operations
3. **Improve Security**: All security checks are performed consistently at the domain level 
4. **Enhance Testability**: Business logic can be easily tested independently from UI components
5. **Standardize Error Handling**: All business operations return standardized results with detailed error information

## Architecture

```
UI Components → Controllers → Domain Services → API Broker → Backend APIs
```

### Components

1. **BaseDomainService**: The foundation interface for all domain services
   - Provides permission checking
   - Standardizes result handling
   - Defines common operations

2. **Domain-Specific Services**:
   - **UserDomainService**: Handles user-related business logic
   - **RoleDomainService**: Handles role-related business logic
   - (Other domain services can be added as needed)

3. **DomainOperationResult**: A standardized result type for all domain operations
   - Includes success/failure status
   - Contains typed data when successful
   - Provides detailed error information when needed
   - Includes validation errors for input validation failures

## Implementation

### Base Domain Service

```typescript
export interface BaseDomainService {
  canPerformOperation(operationName: string, data?: any): Promise<boolean>;
  getAvailableOperations(): Promise<string[]>;
}

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
```

### Domain Service Implementation Pattern

Each domain service:
1. Extends `BaseDomainServiceImpl`
2. Defines specific operations for its domain
3. Implements business rules and validations
4. Returns standardized `DomainOperationResult` objects

Example:
```typescript
export class UserDomainServiceImpl extends BaseDomainServiceImpl implements UserDomainService {
  // Business logic methods
  async createUser(userData: Partial<User>): Promise<DomainOperationResult<User>> {
    // Permission checking
    if (!(await this.canPerformOperation(UserOperations.CREATE_USER))) {
      return this.createErrorResult('PERMISSION_DENIED', 'No permission to create users');
    }
    
    // Data validation
    const validation = await this.validateUserData(userData);
    if (!validation.isValid) {
      return this.createValidationErrorResult(validation.errors);
    }
    
    // Perform operation
    try {
      const result = await this.apiBroker.createUser(userData);
      return this.createSuccessResult(result);
    } catch (error) {
      return this.createErrorResult('API_ERROR', error.message);
    }
  }
}
```

## Usage in Controllers

Controllers are simplified by delegating business logic to domain services:

```typescript
export const useUserController = () => {
  const userDomainService = useUserDomainService();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const createUser = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await userDomainService.createUser(userData);
      
      if (!result.success) {
        setError(result.error?.message || 'An error occurred');
        return null;
      }
      
      return result.data;
    } finally {
      setIsLoading(false);
    }
  };
  
  return { createUser, isLoading, error };
};
```

## Benefits

### 1. Security

All security checks are centralized and consistently applied. This reduces the risk of forgetting important security validations in individual components.

### 2. Code Reuse

Business rules and validations are defined once and reused across the application, reducing duplication and ensuring consistency.

### 3. Maintainability

Changes to business logic only need to be made in one place, making the codebase easier to maintain as requirements evolve.

### 4. Testing

Business logic can be tested independently of UI components, making unit tests more focused and effective.

### 5. Error Handling

Standardized error handling with detailed information makes it easier to debug issues and provide clear feedback to users.

## Best Practices

1. **Keep Domain Services Focused**: Each domain service should handle a specific domain area
2. **Define Clear Interfaces**: Use TypeScript interfaces to define the contract for each domain service
3. **Validate All Input**: Perform comprehensive validation of all input data
4. **Check Permissions**: Always check permissions before performing operations
5. **Return Detailed Errors**: Provide specific error codes and messages for easier debugging
6. **Don't Expose Implementation Details**: Keep implementation details private to the domain service
