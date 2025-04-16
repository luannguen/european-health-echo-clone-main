/**
 * File API tests đã được chuyển sang sử dụng giải pháp TestBotMother
 * Xem TestBotMother.js để biết cách sử dụng giải pháp test mới này
 * 
 * TestBotMother giúp tách biệt hoàn toàn logic test và mã nguồn product API
 * bằng cách điều phối việc test API mà không cần import trực tiếp các modules API
 */

import { describe, it, beforeAll, afterAll, beforeEach, afterEach, expect } from 'vitest';
import testBotMother from '../tests/helpers/TestBotMother';

describe('API Tests with TestBotMother', () => {
  beforeAll(async () => {
    // Khởi tạo TestBotMother với cấu hình test
    await testBotMother.configure({
      logToConsole: true,
      runServer: true,  // Đặt thành true để chạy server test thật
      serverPort: 3001,
      mockDB: true,     // Sử dụng mock database
      useInMemoryDB: false
    }).initialize();
    
    // Đăng ký các API cần test
    testBotMother.registerAPI(
      'Users API',
      '/api/users',
      testBotMother.createUserAPITestCases()
    );
    
    testBotMother.registerAPI(
      'Auth API',
      '/api/auth',
      testBotMother.createAuthAPITestCases()
    );
  });
  
  afterAll(async () => {
    await testBotMother.cleanup();
  });
  
  describe('User API', () => {
    it('should test all User API endpoints', async () => {
      await testBotMother.testAPI('Users API');
      
      // Kiểm tra các test cases cụ thể của User API
      expect(testBotMother.testResults.filter(r => 
        r.api.includes('/api/users') && !r.success
      ).length).toBe(0);
    });
    
    it('should create a new user', async () => {
      // Tạo một test case tùy chỉnh
      const createUserCase = {
        name: 'Tạo người dùng với dữ liệu tùy chỉnh',
        method: 'POST',
        endpoint: '/api/users',
        requireAuth: true,
        authUser: 'admin',
        data: {
          username: 'customuser',
          email: 'custom@example.com',
          password: 'custom123',
          full_name: 'Custom User',
          role: 'user'
        },
        expectStatus: 201,
        expectBody: {
          success: true
        }
      };
      
      const response = await testBotMother.runAPITestCase('/api/users', createUserCase);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.username).toBe('customuser');
    });
    
    it('should handle user deletion', async () => {
      // Tạo người dùng trước
      const createUserCase = {
        name: 'Tạo người dùng để xóa',
        method: 'POST',
        endpoint: '/api/users',
        requireAuth: true,
        authUser: 'admin',
        data: {
          username: 'deleteuser',
          email: 'delete@example.com',
          password: 'delete123',
          full_name: 'Delete User',
          role: 'user'
        },
        expectStatus: 201
      };
      
      // Tạo người dùng
      const createResponse = await testBotMother.runAPITestCase('/api/users', createUserCase);
      const userId = createResponse.body.data.user_id;
      
      // Xóa người dùng
      const deleteCase = {
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
      
      await testBotMother.runAPITestCase(`/api/users/${userId}`, deleteCase);
      
      // Kiểm tra người dùng đã bị xóa
      const getUserCase = {
        name: 'Kiểm tra người dùng đã bị xóa',
        method: 'GET',
        endpoint: `/api/users/${userId}`,
        requireAuth: true,
        authUser: 'admin',
        expectStatus: 404
      };
      
      await testBotMother.runAPITestCase(`/api/users/${userId}`, getUserCase, { ignoreStatus: true });
    });
  });
  
  describe('Auth API', () => {
    it('should test all Auth API endpoints', async () => {
      await testBotMother.testAPI('Auth API');
      
      // Kiểm tra các test cases cụ thể của Auth API
      expect(testBotMother.testResults.filter(r => 
        r.api.includes('/api/auth') && !r.success
      ).length).toBe(0);
    });
    
    it('should test authentication flow', async () => {
      // Đăng nhập
      const loginCase = {
        name: 'Đăng nhập để lấy token',
        method: 'POST',
        endpoint: '/api/auth/login',
        data: {
          username: 'admin',
          password: 'admin123'
        },
        expectStatus: 200,
        authUser: 'flowtest'
      };
      
      const loginResponse = await testBotMother.runAPITestCase('/api/auth/login', loginCase);
      expect(loginResponse.body.token).toBeDefined();
      
      // Truy cập tài nguyên bảo mật
      const securedCase = {
        name: 'Truy cập tài nguyên bảo mật',
        method: 'GET',
        endpoint: '/api/users',
        requireAuth: true,
        authUser: 'flowtest',
        expectStatus: 200
      };
      
      const securedResponse = await testBotMother.runAPITestCase('/api/users', securedCase);
      expect(securedResponse.body.success).toBe(true);
      
      // Đăng xuất
      const logoutCase = {
        name: 'Đăng xuất',
        method: 'POST',
        endpoint: '/api/auth/logout',
        requireAuth: true,
        authUser: 'flowtest',
        expectStatus: 200
      };
      
      await testBotMother.runAPITestCase('/api/auth/logout', logoutCase);
    });
  });
  
  it('should run all API tests', async () => {
    const results = await testBotMother.runAllAPITests();
    console.log(`Tổng số tests: ${testBotMother.testCount.total}`);
    console.log(`Passed: ${testBotMother.testCount.passed}`);
    console.log(`Failed: ${testBotMother.testCount.failed}`);
    
    // Kiểm tra tất cả tests đã pass
    expect(testBotMother.testCount.failed).toBe(0);
  });
});
