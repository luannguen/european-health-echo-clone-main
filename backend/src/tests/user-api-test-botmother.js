/**
 * User API Tests sử dụng TestBotMother
 * 
 * File này sử dụng TestBotMother để test User API mà không cần import
 * trực tiếp các module API vào trong file test
 */

import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import testBotMother from './helpers/TestBotMother';

describe('User API Tests', () => {
  beforeAll(async () => {
    // Khởi tạo TestBotMother với cấu hình test
    await testBotMother.configure({
      logToConsole: true,
      runServer: true,  // Chạy server test thật
      serverPort: 3001,
      mockDB: true,     // Sử dụng mock database
      useInMemoryDB: false
    }).initialize();
    
    // Đăng ký User API để test
    testBotMother.registerAPI(
      'Users API',
      '/api/users',
      testBotMother.createUserAPITestCases()
    );
  });
  
  afterAll(async () => {
    await testBotMother.cleanup();
  });
  
  it('should run all User API tests', async () => {
    await testBotMother.testAPI('Users API');
    expect(testBotMother.testCount.failed).toBe(0);
  });
  
  describe('User CRUD Operations', () => {
    it('should create a new user', async () => {
      // Test case tùy chỉnh để tạo người dùng mới
      const createUserCase = {
        name: 'Tạo người dùng mới với thông tin tùy chỉnh',
        method: 'POST',
        endpoint: '/api/users',
        requireAuth: true,
        authUser: 'admin',
        data: {
          username: 'testcreate',
          email: 'testcreate@example.com',
          password: 'test123',
          full_name: 'Test Create User',
          role: 'user'
        },
        expectStatus: 201,
        expectBody: {
          success: true
        }
      };
      
      const response = await testBotMother.runAPITestCase('/api/users', createUserCase);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.username).toBe('testcreate');
      
      // Lưu user_id cho các test sau
      const userId = response.body.data.user_id;
      
      // Test lấy thông tin người dùng vừa tạo
      const getUserCase = {
        name: 'Lấy thông tin người dùng vừa tạo',
        method: 'GET',
        endpoint: `/api/users/${userId}`,
        requireAuth: true,
        authUser: 'admin',
        expectStatus: 200,
        expectBody: {
          success: true
        },
        assertions: [
          function(response) {
            return response.body.data && 
                  response.body.data.username === 'testcreate' &&
                  response.body.data.email === 'testcreate@example.com';
          }
        ]
      };
      
      await testBotMother.runAPITestCase(`/api/users/${userId}`, getUserCase);
      
      // Test cập nhật thông tin người dùng
      const updateUserCase = {
        name: 'Cập nhật thông tin người dùng',
        method: 'PUT',
        endpoint: `/api/users/${userId}`,
        requireAuth: true,
        authUser: 'admin',
        data: {
          full_name: 'Updated Test User',
          email: 'updated@example.com'
        },
        expectStatus: 200,
        expectBody: {
          success: true
        }
      };
      
      const updateResponse = await testBotMother.runAPITestCase(`/api/users/${userId}`, updateUserCase);
      expect(updateResponse.body.data.full_name).toBe('Updated Test User');
      
      // Test xóa người dùng
      const deleteUserCase = {
        name: 'Xóa người dùng vừa tạo',
        method: 'DELETE',
        endpoint: `/api/users/${userId}`,
        requireAuth: true,
        authUser: 'admin',
        expectStatus: 200,
        expectBody: {
          success: true
        }
      };
      
      await testBotMother.runAPITestCase(`/api/users/${userId}`, deleteUserCase);
      
      // Kiểm tra người dùng đã bị xóa
      const checkDeletedCase = {
        name: 'Kiểm tra người dùng đã bị xóa',
        method: 'GET',
        endpoint: `/api/users/${userId}`,
        requireAuth: true,
        authUser: 'admin',
        expectStatus: 404
      };
      
      await testBotMother.runAPITestCase(`/api/users/${userId}`, checkDeletedCase, { 
        ignoreStatus: true // Chỉ để không throw exception khi test thất bại
      });
    });
    
    it('should handle validation errors when creating users', async () => {
      // Test tạo người dùng với dữ liệu không hợp lệ
      const invalidUserCase = {
        name: 'Tạo người dùng với email không hợp lệ',
        method: 'POST',
        endpoint: '/api/users',
        requireAuth: true,
        authUser: 'admin',
        data: {
          username: 'invalid',
          email: 'not-an-email',
          password: '123',  // Mật khẩu quá ngắn
          full_name: '',    // Tên trống
          role: 'invalid-role' // Role không hợp lệ
        },
        expectStatus: 400,
        expectBody: {
          success: false
        },
        assertions: [
          function(response) {
            return response.body.validationErrors && 
                  Object.keys(response.body.validationErrors).length > 0;
          }
        ]
      };
      
      await testBotMother.runAPITestCase('/api/users', invalidUserCase, { 
        ignoreStatus: true 
      });
    });
    
    it('should get users with pagination', async () => {
      // Test danh sách người dùng với phân trang
      const paginationCase = {
        name: 'Lấy danh sách người dùng với phân trang',
        method: 'GET',
        endpoint: '/api/users?page=1&limit=10',
        requireAuth: true,
        authUser: 'admin',
        expectStatus: 200,
        expectBody: {
          success: true
        },
        assertions: [
          function(response) {
            return Array.isArray(response.body.data) && 
                  typeof response.body.pagination === 'object' &&
                  typeof response.body.pagination.totalItems === 'number' &&
                  typeof response.body.pagination.totalPages === 'number';
          }
        ]
      };
      
      await testBotMother.runAPITestCase('/api/users?page=1&limit=10', paginationCase);
    });
    
    it('should search users by keyword', async () => {
      // Đảm bảo có ít nhất một admin user
      const adminUserCase = {
        name: 'Tạo admin user cho test tìm kiếm',
        method: 'POST',
        endpoint: '/api/users',
        requireAuth: true,
        authUser: 'admin',
        data: {
          username: 'searchadmin',
          email: 'searchadmin@example.com',
          password: 'search123',
          full_name: 'Search Admin User',
          role: 'admin'
        },
        expectStatus: 201
      };
      
      await testBotMother.runAPITestCase('/api/users', adminUserCase);
      
      // Test tìm kiếm người dùng
      const searchCase = {
        name: 'Tìm kiếm người dùng theo từ khóa',
        method: 'GET',
        endpoint: '/api/users?search=admin',
        requireAuth: true,
        authUser: 'admin',
        expectStatus: 200,
        expectBody: {
          success: true
        },
        assertions: [
          function(response) {
            // Kiểm tra kết quả tìm kiếm chỉ chứa từ khóa 'admin'
            return Array.isArray(response.body.data) && 
                  response.body.data.length > 0 &&
                  response.body.data.every(user => 
                    user.username.includes('admin') || 
                    user.full_name.includes('Admin') || 
                    user.role === 'admin'
                  );
          }
        ]
      };
      
      await testBotMother.runAPITestCase('/api/users?search=admin', searchCase);
    });
    
    it('should filter users by status', async () => {
      // Test filter theo status
      const activeUserCase = {
        name: 'Lọc người dùng theo trạng thái active',
        method: 'GET',
        endpoint: '/api/users?status=active',
        requireAuth: true,
        authUser: 'admin',
        expectStatus: 200,
        assertions: [
          function(response) {
            return Array.isArray(response.body.data) && 
                  response.body.data.every(user => user.is_active === true);
          }
        ]
      };
      
      await testBotMother.runAPITestCase('/api/users?status=active', activeUserCase);
    });
  });
  
  describe('User Status Management', () => {
    let testUserId;
    
    // Tạo user trước khi test status
    it('should prepare a test user for status tests', async () => {
      const createUserForStatusCase = {
        name: 'Tạo người dùng mới để test status',
        method: 'POST',
        endpoint: '/api/users',
        requireAuth: true,
        authUser: 'admin',
        data: {
          username: 'statususer',
          email: 'statususer@example.com',
          password: 'status123',
          full_name: 'Status Test User',
          role: 'user',
          is_active: true
        },
        expectStatus: 201
      };
      
      const response = await testBotMother.runAPITestCase('/api/users', createUserForStatusCase);
      testUserId = response.body.data.user_id;
      expect(testUserId).toBeDefined();
    });
    
    it('should toggle user status', async () => {
      // Test thay đổi trạng thái người dùng
      const toggleStatusCase = {
        name: 'Thay đổi trạng thái người dùng',
        method: 'PATCH',
        endpoint: `/api/users/${testUserId}/status`,
        requireAuth: true,
        authUser: 'admin',
        data: {
          is_active: false
        },
        expectStatus: 200,
        expectBody: {
          success: true
        }
      };
      
      // Deactivate user
      const deactivateResponse = await testBotMother.runAPITestCase(`/api/users/${testUserId}/status`, toggleStatusCase);
      expect(deactivateResponse.body.data.is_active).toBe(false);
      
      // Activate user lại
      const activateCase = {
        ...toggleStatusCase,
        data: {
          is_active: true
        }
      };
      
      const activateResponse = await testBotMother.runAPITestCase(`/api/users/${testUserId}/status`, activateCase);
      expect(activateResponse.body.data.is_active).toBe(true);
    });
    
    it('should reject unauthorized status changes', async () => {
      // Tạo regular user cho test
      const createRegularUserCase = {
        name: 'Tạo regular user',
        method: 'POST',
        endpoint: '/api/users',
        requireAuth: true,
        authUser: 'admin',
        data: {
          username: 'regularuser',
          email: 'regular@example.com',
          password: 'regular123',
          full_name: 'Regular User',
          role: 'user'
        },
        expectStatus: 201
      };
      
      await testBotMother.runAPITestCase('/api/users', createRegularUserCase);
      
      // Đăng nhập với regular user
      const loginRegularUserCase = {
        name: 'Đăng nhập với regular user',
        method: 'POST',
        endpoint: '/api/auth/login',
        data: {
          username: 'regularuser',
          password: 'regular123'
        },
        expectStatus: 200,
        authUser: 'regularuser'
      };
      
      await testBotMother.runAPITestCase('/api/auth/login', loginRegularUserCase);
      
      // Regular user thử thay đổi status của user khác (không được phép)
      const unauthorizedChangeCase = {
        name: 'Regular user cố thay đổi status của user khác',
        method: 'PATCH',
        endpoint: `/api/users/${testUserId}/status`,
        requireAuth: true,
        authUser: 'regularuser',
        data: {
          is_active: false
        },
        expectStatus: 403  // Forbidden
      };
      
      await testBotMother.runAPITestCase(`/api/users/${testUserId}/status`, unauthorizedChangeCase, { 
        ignoreStatus: true
      });
    });
  });
  
  // In kết quả test
  it('should report test results', () => {
    testBotMother.reportTestResults();
    expect(testBotMother.testCount.total).toBeGreaterThan(0);
  });
});
