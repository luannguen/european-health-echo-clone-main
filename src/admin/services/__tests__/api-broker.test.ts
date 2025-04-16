import ApiBroker from '../api-broker';
import { API_ENDPOINTS } from '../api-url.service';

// Mock callApi function
const mockCallApi = jest.fn();

describe('API Broker Tests', () => {
  let apiBroker: ApiBroker;

  beforeEach(() => {
    // Reset mocks before each test
    mockCallApi.mockReset();
    apiBroker = new ApiBroker(mockCallApi);
  });

  describe('User Management APIs', () => {
    it('getUsers should call API with correct parameters', async () => {
      // Define test parameters
      const testParams = { page: 1, pageSize: 10, search: 'test' };
      
      // Call the method
      await apiBroker.getUsers(testParams);
      
      // Assert that callApi was called with correct parameters
      expect(mockCallApi).toHaveBeenCalledWith(
        API_ENDPOINTS.USERS.LIST, 
        {}, 
        testParams
      );
    });

    it('getUserById should call API with correct ID parameter', async () => {
      // Define test ID
      const testId = 123;
      
      // Call the method
      await apiBroker.getUserById(testId);
      
      // Assert that callApi was called with correct parameters
      expect(mockCallApi).toHaveBeenCalledWith(
        API_ENDPOINTS.USERS.DETAIL, 
        { id: testId }
      );
    });

    it('createUser should call API with correct method and body', async () => {
      // Define test user data
      const testUserData = {
        username: 'testuser',
        email: 'test@example.com',
        full_name: 'Test User',
        role: 'editor'
      };
      
      // Call the method
      await apiBroker.createUser(testUserData);
      
      // Assert that callApi was called with correct parameters
      expect(mockCallApi).toHaveBeenCalledWith(
        API_ENDPOINTS.USERS.CREATE, 
        {}, 
        {}, 
        {
          method: 'POST',
          body: testUserData
        }
      );
    });

    it('updateUser should call API with correct ID, method and body', async () => {
      // Define test ID and update data
      const testId = 123;
      const testUpdateData = {
        email: 'updated@example.com',
        full_name: 'Updated User'
      };
      
      // Call the method
      await apiBroker.updateUser(testId, testUpdateData);
      
      // Assert that callApi was called with correct parameters
      expect(mockCallApi).toHaveBeenCalledWith(
        API_ENDPOINTS.USERS.DETAIL, 
        { id: testId }, 
        {}, 
        {
          method: 'PUT',
          body: testUpdateData
        }
      );
    });

    it('deleteUser should call API with correct ID and method', async () => {
      // Define test ID
      const testId = 123;
      
      // Call the method
      await apiBroker.deleteUser(testId);
      
      // Assert that callApi was called with correct parameters
      expect(mockCallApi).toHaveBeenCalledWith(
        API_ENDPOINTS.USERS.DETAIL, 
        { id: testId }, 
        {}, 
        {
          method: 'DELETE'
        }
      );
    });

    it('toggleUserStatus should call API with correct status update', async () => {
      // Define test parameters
      const testId = 123;
      const currentStatus = false; // Currently inactive
      
      // Call the method to activate the user
      await apiBroker.toggleUserStatus(testId, currentStatus);
      
      // Assert that callApi was called with correct parameters to activate
      expect(mockCallApi).toHaveBeenCalledWith(
        API_ENDPOINTS.USERS.DETAIL, 
        { id: testId }, 
        {}, 
        {
          method: 'PUT',
          body: { is_active: currentStatus }
        }
      );

      // Reset mock and test deactivation
      mockCallApi.mockReset();
      await apiBroker.toggleUserStatus(testId, true); // Currently active

      // Assert that callApi was called with correct parameters to deactivate
      expect(mockCallApi).toHaveBeenCalledWith(
        API_ENDPOINTS.USERS.DETAIL, 
        { id: testId }, 
        {}, 
        {
          method: 'PUT',
          body: { is_active: true }
        }
      );
    });
    
    it('should handle API errors correctly', async () => {
      // Setup mockCallApi to reject with an error
      const errorMessage = 'API Error: Network Failure';
      mockCallApi.mockRejectedValueOnce(new Error(errorMessage));
      
      // Expect the getUsers method to propagate the error
      await expect(apiBroker.getUsers()).rejects.toThrow(errorMessage);
      
      // Verify mockCallApi was called
      expect(mockCallApi).toHaveBeenCalledWith(
        API_ENDPOINTS.USERS.LIST, 
        {}, 
        undefined
      );
    });

    it('should handle successful API responses with data', async () => {
      // Mock response data
      const mockResponse = {
        data: [
          { id: 1, username: 'user1', email: 'user1@example.com' },
          { id: 2, username: 'user2', email: 'user2@example.com' }
        ],
        pagination: {
          currentPage: 1,
          totalPages: 5,
          totalItems: 42,
          pageSize: 10
        }
      };
      
      // Setup mockCallApi to resolve with the mock response
      mockCallApi.mockResolvedValueOnce(mockResponse);
      
      // Call the method and expect the correct response
      const result = await apiBroker.getUsers();
      expect(result).toEqual(mockResponse);
      
      // Verify mockCallApi was called
      expect(mockCallApi).toHaveBeenCalledWith(
        API_ENDPOINTS.USERS.LIST, 
        {}, 
        undefined
      );
    });
  });
});
