/**
 * TestBotMother.js
 * 
 * Module trung tâm điều phối việc test API, có trách nhiệm:
 * 1. Quản lý môi trường test API
 * 2. Sử dụng giả lập (mock) từ testBot service có sẵn
 * 3. Tự động hóa việc test API mà không cần viết test riêng chi tiết
 * 
 * LƯU Ý QUAN TRỌNG:
 * - TestBotMother sẽ sử dụng testBotService đã có sẵn từ test-bot.helper.js
 * - Nếu cần thêm mock, hãy cập nhật testBotService thay vì tạo mock mới
 * 
 * ------------------------------------------------------------------
 * CẤU TRÚC DỰ ÁN API:
 * 
 * 1. API Endpoints:
 *    - /backend/src/admin/api/: Các routes API cho admin dashboard
 *      - user-api.js: CRUD người dùng
 *      - auth-api.js: Đăng nhập, đăng xuất, refresh token
 *      - settings-api.js: Cấu hình hệ thống
 * 
 * 2. Domain Services:
 *    - /backend/src/core/services/: Business logic và domain services
 *      - user-service.js: Quản lý người dùng
 *      - auth-service.js: Xác thực và phân quyền
 * 
 * 3. Repositories:
 *    - /backend/src/core/repositories/: Data access layer
 *      - user-repository.js: Truy cập dữ liệu người dùng
 *      - auth-repository.js: Truy cập dữ liệu xác thực
 * 
 * 4. Database:
 *    - SQL Tables:
 *      - users: Thông tin người dùng
 *      - auth_logs: Logs đăng nhập
 *      - refresh_tokens: Lưu trữ refresh tokens
 *      - revoked_tokens: Danh sách tokens đã bị thu hồi
 * ------------------------------------------------------------------
 */

import testBot from './test-bot.helper.js';
import supertest from 'supertest';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import config from '../../config.js';

/**
 * TestBotMother - Lớp điều phối tất cả các API tests
 */
class TestBotMother {
  constructor() {
    this.testBot = testBot;
    this.serverProcess = null;
    this.serverUrl = null;
    this.request = null;
    this.testResults = [];
    this.testConfig = {
      logToConsole: false,
      runServer: false,
      serverPort: 3001,
      enableReporting: true,
      mockDB: true,
      useInMemoryDB: true
    };
    this.apiRegistry = new Map();
    this.testCount = { total: 0, passed: 0, failed: 0 };
    this._authTokens = {};
  }

  /**
   * Thiết lập cấu hình cho TestBotMother
   * @param {Object} config - Cấu hình test
   */
  configure(config = {}) {
    this.testConfig = { ...this.testConfig, ...config };
    return this;
  }

  /**
   * Khởi tạo TestBotMother cùng với tất cả các phụ thuộc
   */
  async initialize() {
    // Khởi tạo testBot
    this.testBot.initializeTestBot({
      logToConsole: this.testConfig.logToConsole,
      setupInitialData: true
    });
    
    // Thiết lập database test
    if (this.testConfig.mockDB) {
      console.log('Sử dụng mock database cho API tests');
      this._setupMockDatabase();
    } 
    else if (this.testConfig.useInMemoryDB) {
      console.log('Sử dụng in-memory database cho API tests');
      await this._setupInMemoryDatabase();
    }
    
    // Khởi chạy server test nếu cần
    if (this.testConfig.runServer) {
      await this.startTestServer();
      this.request = supertest(this.serverUrl);
    }
    
    console.log('TestBotMother đã khởi tạo thành công');
    return this;
  }

  /**
   * Thiết lập mock database
   * @private
   */
  _setupMockDatabase() {
    // Sử dụng testBot để mock database
    const dbMock = {
      users: [
        { 
          user_id: 1, 
          username: 'admin', 
          email: 'admin@example.com',
          password: '$2b$10$xPttDtYUwcZA2xVpvx.Bee2VJhSNR8sY1C1ew7uESMdOTJxMa3wQq', // 'admin123'
          full_name: 'Admin User', 
          role: 'admin', 
          is_active: true,
          created_at: new Date().toISOString()
        },
        { 
          user_id: 2, 
          username: 'user1', 
          email: 'user1@example.com', 
          password: '$2b$10$xPttDtYUwcZA2xVpvx.Bee2VJhSNR8sY1C1ew7uESMdOTJxMa3wQq', // 'password123'
          full_name: 'Test User', 
          role: 'user', 
          is_active: true,
          created_at: new Date().toISOString()
        }
      ],
      refresh_tokens: [],
      auth_logs: [],
      revoked_tokens: []
    };
    
    // Đăng ký mock data với testBot
    Object.entries(dbMock).forEach(([collection, data]) => {
      data.forEach(item => {
        const id = item.user_id || item.id || Math.random().toString(36).substr(2, 9);
        this.testBot.databaseTestHelper.save(collection, id, item);
      });
    });
  }

  /**
   * Thiết lập in-memory database
   * @private
   */
  async _setupInMemoryDatabase() {
    try {
      const testDbService = require('../../test-db-service.js');
      await testDbService.setupInMemoryDatabase();
      
      // Tạo dữ liệu ban đầu
      await testDbService.createDefaultUsers();
      
      console.log('In-memory database đã được thiết lập');
    } catch (error) {
      console.error('Lỗi khi thiết lập in-memory database:', error);
      throw error;
    }
  }
  
  /**
   * Khởi chạy server test
   * @returns {Promise} - Promise resolved khi server đã sẵn sàng
   */
  async startTestServer() {
    return new Promise((resolve, reject) => {
      console.log('Đang khởi động test server...');
      
      // Đường dẫn đến script khởi động server
      const serverScript = path.resolve(process.cwd(), 'start-server.js');
      
      // Kiểm tra file tồn tại
      if (!fs.existsSync(serverScript)) {
        console.error(`Không tìm thấy file start-server.js tại ${serverScript}`);
        reject(new Error(`File không tồn tại: ${serverScript}`));
        return;
      }
      
      // Khởi chạy server như một process riêng
      this.serverProcess = spawn('node', [serverScript], {
        env: {
          ...process.env,
          NODE_ENV: 'test',
          PORT: this.testConfig.serverPort,
          USE_TEST_DB: 'true'
        },
        stdio: 'pipe'
      });
      
      let serverOutput = '';
      this.serverUrl = `http://localhost:${this.testConfig.serverPort}`;
      
      // Theo dõi output của server
      this.serverProcess.stdout.on('data', (data) => {
        serverOutput += data.toString();
        if (this.testConfig.logToConsole) {
          console.log(`Server: ${data.toString().trim()}`);
        }
        
        // Kiểm tra nếu server đã sẵn sàng
        if (serverOutput.includes('Server ready') || serverOutput.includes(`listening on port ${this.testConfig.serverPort}`)) {
          console.log(`Test server đã khởi động trên port ${this.testConfig.serverPort}`);
          resolve(this.serverUrl);
        }
      });
      
      this.serverProcess.stderr.on('data', (data) => {
        if (this.testConfig.logToConsole) {
          console.error(`Server error: ${data.toString().trim()}`);
        }
      });
      
      // Xử lý khi server bị lỗi
      this.serverProcess.on('error', (error) => {
        console.error('Không thể khởi động test server:', error);
        reject(error);
      });
      
      // Set timeout để tránh treo
      setTimeout(() => {
        if (!serverOutput.includes('Server ready') && !serverOutput.includes(`listening on port ${this.testConfig.serverPort}`)) {
          console.error('Test server khởi động quá thời gian');
          reject(new Error('Server startup timeout'));
        }
      }, 10000); // Timeout 10 giây
    });
  }

  /**
   * Dừng server test
   */
  async stopTestServer() {
    if (this.serverProcess && !this.serverProcess.killed) {
      console.log('Đang dừng test server...');
      this.serverProcess.kill('SIGTERM');
      
      // Đảm bảo process đã được kill
      return new Promise((resolve) => {
        this.serverProcess.on('exit', () => {
          console.log('Test server đã dừng');
          this.serverProcess = null;
          resolve();
        });
        
        // Nếu process không tự kết thúc, kill mạnh hơn
        setTimeout(() => {
          if (this.serverProcess && !this.serverProcess.killed) {
            this.serverProcess.kill('SIGKILL');
          }
        }, 3000);
      });
    }
    return Promise.resolve();
  }

  /**
   * Đăng ký một API endpoint để test
   * @param {string} name - Tên của API
   * @param {string} endpoint - Đường dẫn endpoint
   * @param {Array} testCases - Các test case cho API
   */
  registerAPI(name, endpoint, testCases = []) {
    this.apiRegistry.set(name, { endpoint, testCases });
    return this;
  }

  /**
   * Test một API endpoint theo tên
   * @param {string} apiName - Tên của API cần test
   * @param {Object} options - Tùy chọn cho test
   */
  async testAPI(apiName, options = {}) {
    console.log(`Bắt đầu test API: ${apiName}`);
    
    if (!this.apiRegistry.has(apiName)) {
      console.error(`Không tìm thấy API "${apiName}" trong registry`);
      return false;
    }
    
    const { endpoint, testCases } = this.apiRegistry.get(apiName);
    
    try {
      // Nếu không có test cases, chỉ test endpoint cơ bản
      if (!testCases || testCases.length === 0) {
        await this.testAPIHealthCheck(endpoint);
      } else {
        // Chạy từng test case
        for (const testCase of testCases) {
          await this.runAPITestCase(endpoint, testCase, options);
        }
      }
      
      console.log(`Hoàn thành test API: ${apiName}`);
      return true;
    } catch (error) {
      console.error(`Lỗi khi test API ${apiName}:`, error);
      this.testResults.push({
        api: apiName,
        success: false,
        error: error.message
      });
      return false;
    }
  }

  /**
   * Test health check của một API endpoint
   * @param {string} endpoint - Endpoint URL
   */
  async testAPIHealthCheck(endpoint) {
    this.testCount.total++;
    
    try {
      let response;
      
      if (this.request) {
        // Nếu đang chạy với server thật
        response = await this.request.get(endpoint);
      } else {
        // Nếu đang sử dụng mock
        response = await this.testBot.apiTestHelper.call(endpoint, { method: 'GET' });
      }
      
      // Kiểm tra response
      if (response.status && (response.status >= 200 && response.status < 500)) {
        console.log(`✓ API ${endpoint} health check thành công`);
        this.testCount.passed++;
        
        this.testResults.push({
          api: endpoint,
          test: 'health check',
          success: true
        });
      } else {
        throw new Error(`API trả về status code ${response.status || 'unknown'}`);
      }
    } catch (error) {
      console.error(`✗ API ${endpoint} health check thất bại:`, error);
      this.testCount.failed++;
      
      this.testResults.push({
        api: endpoint,
        test: 'health check',
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Chạy một test case cụ thể
   * @param {string} endpoint - API endpoint
   * @param {Object} testCase - Test case
   * @param {Object} options - Tùy chọn cho test
   */
  async runAPITestCase(endpoint, testCase, options = {}) {
    const { name, method = 'GET', data, headers = {}, expectStatus = 200, expectBody, setup, assertions, cleanup } = testCase;
    this.testCount.total++;
    
    console.log(`Chạy test case API: ${name}`);
    
    try {
      // Setup trước test nếu có
      if (setup && typeof setup === 'function') {
        await setup.call(this);
      }
      
      // Xác định headers
      const testHeaders = { ...headers };
      if (testCase.requireAuth && this._authTokens[testCase.authUser || 'default']) {
        testHeaders.Authorization = `Bearer ${this._authTokens[testCase.authUser || 'default']}`;
      }
      
      // Gọi API
      let response;
      
      if (this.request) {
        // Nếu đang chạy với server thật
        const req = this.request[method.toLowerCase()](endpoint);
        
        // Thêm headers
        Object.entries(testHeaders).forEach(([key, value]) => {
          req.set(key, value);
        });
        
        // Thêm data nếu cần
        if (data && (method.toUpperCase() !== 'GET')) {
          req.send(data);
        }
        
        response = await req;
      } else {
        // Nếu đang sử dụng mock
        response = await this.testBot.apiTestHelper.call(endpoint, { 
          method: method.toUpperCase(),
          headers: testHeaders,
          body: data 
        });
      }
      
      // Kiểm tra status code
      if (options.ignoreStatus !== true && response.status !== expectStatus) {
        throw new Error(`API trả về status code ${response.status} thay vì ${expectStatus}`);
      }
      
      // Kiểm tra body nếu cần
      if (expectBody) {
        // Kiểm tra theo từng trường trong expectBody
        Object.entries(expectBody).forEach(([key, value]) => {
          if (typeof value === 'function') {
            const result = value(response.body);
            if (!result) {
              throw new Error(`Kiểm tra với hàm cho trường ${key} thất bại`);
            }
          } else if (response.body[key] !== value) {
            throw new Error(`Trường ${key} = ${response.body[key]} thay vì ${value}`);
          }
        });
      }
      
      // Kiểm tra kết quả với các assertions tùy chỉnh
      if (assertions && Array.isArray(assertions)) {
        for (const assertion of assertions) {
          const result = await assertion.call(this, response);
          if (result === false) {
            throw new Error(`Assertion tùy chỉnh thất bại`);
          }
        }
      }
      
      // Lưu token xác thực nếu là login API
      if (response.body && response.body.token) {
        const authUser = testCase.authUser || 'default';
        this._authTokens[authUser] = response.body.token;
        console.log(`Đã lưu token xác thực cho user: ${authUser}`);
      }
      
      // Cleanup sau test
      if (cleanup && typeof cleanup === 'function') {
        await cleanup.call(this);
      }
      
      console.log(`✓ Test case API "${name}" thành công`);
      this.testCount.passed++;
      
      this.testResults.push({
        api: endpoint,
        test: name,
        success: true
      });
      
      return response;
    } catch (error) {
      console.error(`✗ Test case API "${name}" thất bại:`, error);
      this.testCount.failed++;
      
      this.testResults.push({
        api: endpoint,
        test: name,
        success: false,
        error: error.message
      });
      
      throw error;
    }
  }

  /**
   * Tạo một loạt các test cases cho User API
   * @returns {Array} Các test case
   */
  createUserAPITestCases() {
    return [
      // Test đăng nhập
      {
        name: 'Đăng nhập với tài khoản admin',
        method: 'POST',
        endpoint: '/api/auth/login',
        data: {
          username: 'admin',
          password: 'admin123'
        },
        expectStatus: 200,
        expectBody: {
          success: true,
          message: (val) => val && val.includes('success')
        },
        assertions: [
          function(response) {
            return response.body.token && response.body.user && response.body.user.role === 'admin';
          }
        ],
        authUser: 'admin'
      },
      
      // Test lấy danh sách người dùng (yêu cầu xác thực)
      {
        name: 'Lấy danh sách người dùng (đã xác thực)',
        method: 'GET',
        endpoint: '/api/users',
        requireAuth: true,
        authUser: 'admin',
        expectStatus: 200,
        expectBody: {
          success: true
        },
        assertions: [
          function(response) {
            return Array.isArray(response.body.data) && response.body.data.length > 0;
          }
        ]
      },
      
      // Test tạo người dùng mới
      {
        name: 'Tạo người dùng mới',
        method: 'POST',
        endpoint: '/api/users',
        requireAuth: true,
        authUser: 'admin',
        data: {
          username: 'newuser',
          email: 'newuser@example.com',
          password: 'password123',
          full_name: 'New User',
          role: 'user'
        },
        expectStatus: 201,
        expectBody: {
          success: true
        },
        assertions: [
          function(response) {
            return response.body.data && response.body.data.user_id && response.body.data.username === 'newuser';
          }
        ]
      },
      
      // Test lấy thông tin người dùng theo ID
      {
        name: 'Lấy thông tin người dùng theo ID',
        method: 'GET',
        endpoint: '/api/users/1',
        requireAuth: true,
        authUser: 'admin',
        expectStatus: 200,
        expectBody: {
          success: true
        },
        assertions: [
          function(response) {
            return response.body.data && response.body.data.user_id === 1;
          }
        ]
      },
      
      // Test cập nhật thông tin người dùng
      {
        name: 'Cập nhật thông tin người dùng',
        method: 'PUT',
        endpoint: '/api/users/2',
        requireAuth: true,
        authUser: 'admin',
        data: {
          full_name: 'Updated User Name',
          email: 'updated@example.com'
        },
        expectStatus: 200,
        expectBody: {
          success: true
        },
        assertions: [
          function(response) {
            return response.body.data && response.body.data.full_name === 'Updated User Name';
          }
        ]
      },
      
      // Test xóa người dùng
      {
        name: 'Xóa người dùng',
        method: 'DELETE',
        endpoint: '/api/users/2',
        requireAuth: true,
        authUser: 'admin',
        expectStatus: 200,
        expectBody: {
          success: true
        },
        setup: async function() {
          // Tạo một người dùng để xóa nếu cần
          if (this.testConfig.mockDB) {
            const userExists = this.testBot.databaseTestHelper.get('users', '2');
            if (!userExists) {
              this.testBot.databaseTestHelper.save('users', '2', {
                user_id: 2,
                username: 'deleteuser',
                email: 'delete@example.com',
                password: 'hashed_password',
                full_name: 'Delete User',
                role: 'user',
                is_active: true
              });
            }
          }
        }
      }
    ];
  }

  /**
   * Tạo một loạt các test cases cho Auth API
   * @returns {Array} Các test case
   */
  createAuthAPITestCases() {
    return [
      // Test đăng nhập thành công
      {
        name: 'Đăng nhập thành công',
        method: 'POST',
        endpoint: '/api/auth/login',
        data: {
          username: 'admin',
          password: 'admin123'
        },
        expectStatus: 200,
        expectBody: {
          success: true
        },
        assertions: [
          function(response) {
            return response.body.token && response.body.refreshToken;
          }
        ],
        authUser: 'admin'
      },
      
      // Test đăng nhập thất bại với mật khẩu sai
      {
        name: 'Đăng nhập thất bại (mật khẩu sai)',
        method: 'POST',
        endpoint: '/api/auth/login',
        data: {
          username: 'admin',
          password: 'wrong_password'
        },
        expectStatus: 401,
        expectBody: {
          success: false
        }
      },
      
      // Test đăng nhập thất bại với tài khoản không tồn tại
      {
        name: 'Đăng nhập thất bại (tài khoản không tồn tại)',
        method: 'POST',
        endpoint: '/api/auth/login',
        data: {
          username: 'nonexistent',
          password: 'password123'
        },
        expectStatus: 401,
        expectBody: {
          success: false
        }
      },
      
      // Test refresh token
      {
        name: 'Refresh token',
        method: 'POST',
        endpoint: '/api/auth/refresh-token',
        setup: async function() {
          // Đảm bảo đã có refresh token (đăng nhập trước)
          if (!this._authTokens.admin) {
            const loginResponse = await this.runAPITestCase('/api/auth/login', this.createAuthAPITestCases()[0]);
            // Không cần kiểm tra kết quả vì đã được kiểm tra trong test case login
          }
        },
        data: function() {
          // Sử dụng refresh token từ đăng nhập trước
          return { refreshToken: this._authTokens.adminRefresh || 'invalid_token' };
        },
        expectStatus: 200,
        expectBody: {
          success: true
        },
        assertions: [
          function(response) {
            return response.body.token && typeof response.body.token === 'string';
          }
        ]
      },
      
      // Test đăng xuất
      {
        name: 'Đăng xuất',
        method: 'POST',
        endpoint: '/api/auth/logout',
        requireAuth: true,
        authUser: 'admin',
        expectStatus: 200,
        expectBody: {
          success: true
        },
        setup: async function() {
          // Đảm bảo đã đăng nhập
          if (!this._authTokens.admin) {
            const loginResponse = await this.runAPITestCase('/api/auth/login', this.createAuthAPITestCases()[0]);
          }
        }
      }
    ];
  }

  /**
   * Chạy tất cả các test API đã đăng ký
   */
  async runAllAPITests() {
    console.log('Bắt đầu chạy tất cả các test API...');
    
    // Reset kết quả test
    this.testResults = [];
    this.testCount = { total: 0, passed: 0, failed: 0 };
    
    for (const [apiName] of this.apiRegistry) {
      try {
        await this.testAPI(apiName);
      } catch (error) {
        console.error(`Lỗi khi test API ${apiName}:`, error);
      }
    }
    
    this.reportTestResults();
    
    return this.testResults;
  }

  /**
   * In báo cáo kết quả test
   */
  reportTestResults() {
    console.log('\n===== TEST RESULTS =====');
    console.log(`Tổng số tests API: ${this.testCount.total}`);
    console.log(`Thành công: ${this.testCount.passed}`);
    console.log(`Thất bại: ${this.testCount.failed}`);
    console.log('=======================\n');
    
    // In chi tiết các test thất bại
    if (this.testCount.failed > 0) {
      console.log('Chi tiết các test thất bại:');
      this.testResults.filter(result => !result.success).forEach(result => {
        console.log(`- [${result.api}] ${result.test || 'N/A'}: ${result.error}`);
      });
      console.log('\n');
    }
    
    // In metrics từ testBot
    if (this.testBot && this.testBot.testReportHelper) {
      this.testBot.testReportHelper.printReport();
    }
  }

  /**
   * Dọn dẹp tài nguyên sau khi test
   */
  async cleanup() {
    // Dọn dẹp testBot
    this.testBot.cleanupTestData();
    
    // Dừng server test
    if (this.serverProcess) {
      await this.stopTestServer();
    }
    
    // Reset các biến
    this._authTokens = {};
    
    console.log('TestBotMother đã dọn dẹp thành công');
  }
}

// Tạo và export một instance singleton
const testBotMother = new TestBotMother();

export default testBotMother;
