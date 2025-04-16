/**
 * TestBotFather
 * 
 * Module trung tâm điều phối việc test UI và tích hợp, có trách nhiệm:
 * 1. Khởi chạy server test khi cần thiết
 * 2. Sử dụng giả lập (mock) từ testBot service có sẵn
 * 3. Tự động hóa việc test UI mà không cần viết test riêng
 * 
 * LƯU Ý QUAN TRỌNG:
 * TestBotFather KHÔNG tự tạo mock riêng mà sử dụng testBotService đã có sẵn
 * từ test-bot.helper.js. Nếu cần thêm mock, hãy cập nhật testBotService thay vì
 * tạo mock mới trong TestBotFather.
 * 
 * ------------------------------------------------------------------
 * CẤU TRÚC DỰ ÁN:
 * 
 * 1. Frontend:
 *    - /src/admin/: Admin UI và các giao diện quản trị
 *      - /components/: Các UI components được tái sử dụng
 *      - /context/: Các context providers (AuthContext, ThemeContext, etc.)
 *      - /controllers/: Controller layer, xử lý logic và gọi đến services
 *      - /hooks/: Custom hooks (useUserDomainService, useApi, etc.)
 *      - /layouts/: Layout templates cho UI
 *      - /pages/: Các trang chính, sử dụng controllers để lấy dữ liệu
 *      - /services/: Service layer, gọi API
 *      - /utils/: Các tiện ích
 * 
 *    - /src/components/: UI components cho phía client
 *    - /src/hooks/: Custom hooks (use-toast, use-mobile, etc.)
 *    - /src/pages/: Các trang client
 * 
 * 2. Backend:
 *    - /backend/src/server.js: Entry point cho server
 *    - /backend/src/config.js: File cấu hình
 *    - /backend/src/admin/api/: API endpoints cho admin
 *    - /backend/src/core/: Business logic và domain services
 *        - /events/: Event handlers và emitters
 *        - /repositories/: Data access layer
 *        - /services/: Domain services
 *    - /backend/src/lib/: Các thư viện và tiện ích
 *        - db-manager.js: Quản lý kết nối database
 *        - jwt-helper.js: Xử lý JWT
 *    - /backend/src/middleware/: Express middlewares
 *        - auth-middleware.js: Authentication middleware
 *    - /backend/src/sql/: SQL migration scripts
 *    - /backend/src/tests/: Tests cho backend
 *        - helpers/: Test helpers và mocks
 *        - *.test.js: Test files
 * 
 * 3. Testing:
 *    - start-server.js: Script khởi động server cho tests
 *    - test-admin-ui.js: Script chạy test UI admin
 *  * 4. Kiến trúc:
 *    - Domain Services: Backend service layer theo nguyên tắc Domain-Driven Design
 *    - Controller-Service: Frontend UI sử dụng pattern Controller -> Service
 *    - Repository: Data access layer cho database và API
 *    - Microservices: Hệ thống được chia thành các microservices độc lập
 *        - User Service: Quản lý người dùng và xác thực
 *        - Content Service: Quản lý nội dung và dữ liệu
 *        - Notification Service: Quản lý thông báo và email
 *        - Analytics Service: Thu thập và xử lý dữ liệu phân tích
 *        - Gateway Service: API Gateway và điều hướng requests
 * 
 * 5. Kiến trúc quy trình test:
 *    - Unit Tests: Test từng component/service riêng biệt
 *        - Sử dụng Vitest cho frontend và Jest cho backend
 *        - Mock các dependencies để tách biệt các đối tượng test
 *    - Integration Tests: Test tích hợp giữa các services
 *        - Test giao tiếp giữa các services
 *        - Sử dụng database test riêng biệt
 *    - End-to-End Tests: Test toàn bộ hệ thống
 *        - TestBotFather: Điều phối việc test UI tự động
 *        - Test server thật với database test
 *    - Performance Tests: Đánh giá hiệu năng
 *    - Security Tests: Kiểm tra các lỗ hổng bảo mật
 * 
 * 6. Sơ đồ test flow:
 *    (1) Developer viết code → (2) Unit tests tự động chạy
 *    → (3) Nếu Unit tests pass → Integration tests
 *    → (4) Nếu Integration tests pass → E2E tests với TestBotFather
 *    → (5) Deploy lên môi trường Staging → Performance & Security tests
 *    → (6) Deploy lên Production
 * ------------------------------------------------------------------
 */

import { spawn } from 'child_process';
import path from 'path';
import testBot from './test-bot.helper.js';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

/**
 * TestBotFather - Lớp điều phối tất cả các tests
 */
class TestBotFather {
  constructor() {
    this.testBot = testBot;
    this.serverProcess = null;
    this.testResults = [];
    this.testConfig = {
      logToConsole: false,
      runServer: false,
      serverPort: 3000,
      enableReporting: true,
      mockNetwork: true,
      recordVideo: false
    };
    this.uiComponentsRegistry = new Map();
    this.testCount = { total: 0, passed: 0, failed: 0 };
  }

  /**
   * Thiết lập cấu hình cho TestBotFather
   * @param {Object} config - Cấu hình test
   */
  configure(config = {}) {
    this.testConfig = { ...this.testConfig, ...config };
    return this;
  }

  /**
   * Khởi tạo TestBotFather cùng với tất cả các phụ thuộc
   */
  async initialize() {
    // Khởi tạo testBot
    this.testBot.initializeTestBot({
      logToConsole: this.testConfig.logToConsole,
      setupInitialData: true
    });
    
    // Khởi chạy server test nếu cần
    if (this.testConfig.runServer) {
      await this.startTestServer();
    }
    
    console.log('TestBotFather đã khởi tạo thành công');
    return this;
  }

  /**
   * Khởi chạy server test
   * @returns {Promise} - Promise resolved khi server đã sẵn sàng
   */
  startTestServer() {
    return new Promise((resolve, reject) => {
      console.log('Đang khởi động test server...');
      
      // Đường dẫn đến script khởi động server
      const serverScript = path.resolve(process.cwd(), 'start-server.js');
      
      // Khởi chạy server như một process riêng
      this.serverProcess = spawn('node', [serverScript], {
        env: {
          ...process.env,
          NODE_ENV: 'test',
          PORT: this.testConfig.serverPort
        },
        stdio: 'pipe'
      });
      
      let serverOutput = '';
      
      // Theo dõi output của server
      this.serverProcess.stdout.on('data', (data) => {
        serverOutput += data.toString();
        if (this.testConfig.logToConsole) {
          console.log(`Server: ${data.toString().trim()}`);
        }
        
        // Kiểm tra nếu server đã sẵn sàng
        if (serverOutput.includes('Server ready') || serverOutput.includes(`listening on port ${this.testConfig.serverPort}`)) {
          console.log(`Test server đã khởi động trên port ${this.testConfig.serverPort}`);
          resolve();
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
   * Đăng ký một UI component để test
   * @param {string} name - Tên của component
   * @param {Function} importFn - Hàm import động component
   * @param {Array} testCases - Các test case cho component
   */
  registerUIComponent(name, importFn, testCases = []) {
    this.uiComponentsRegistry.set(name, { importFn, testCases });
    return this;
  }

  /**
   * Test một UI component theo tên
   * @param {string} componentName - Tên của component cần test
   * @param {Object} options - Tùy chọn cho test
   */
  async testUIComponent(componentName, options = {}) {
    console.log(`Bắt đầu test UI component: ${componentName}`);
    
    if (!this.uiComponentsRegistry.has(componentName)) {
      console.error(`Không tìm thấy component "${componentName}" trong registry`);
      return false;
    }
    
    const { importFn, testCases } = this.uiComponentsRegistry.get(componentName);
    
    try {
      // Import component
      const Component = (await importFn()).default;
      
      // Setup mocks
      this.setupGlobalMocks();
      
      // Nếu không có test cases, chỉ test render
      if (!testCases || testCases.length === 0) {
        await this.testComponentRender(Component, componentName);
      } else {
        // Chạy từng test case
        for (const testCase of testCases) {
          await this.runTestCase(Component, testCase);
        }
      }
      
      console.log(`Hoàn thành test UI component: ${componentName}`);
      return true;
    } catch (error) {
      console.error(`Lỗi khi test component ${componentName}:`, error);
      this.testResults.push({
        component: componentName,
        success: false,
        error: error.message
      });
      return false;
    }
  }

  /**
   * Test việc render một component
   * @param {Component} Component - Component cần test
   * @param {string} name - Tên của component
   */
  async testComponentRender(Component, name) {
    this.testCount.total++;
    
    try {
      // Render component
      render(<Component />);
      
      // Đợi component render xong
      await waitFor(() => {
        expect(document.body).not.toBeEmptyDOMElement();
      });
      
      console.log(`✓ Component ${name} render thành công`);
      this.testCount.passed++;
      
      this.testResults.push({
        component: name,
        test: 'render',
        success: true
      });
    } catch (error) {
      console.error(`✗ Component ${name} render thất bại:`, error);
      this.testCount.failed++;
      
      this.testResults.push({
        component: name,
        test: 'render',
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Chạy một test case cụ thể
   * @param {Component} Component - Component cần test
   * @param {Object} testCase - Test case
   */
  async runTestCase(Component, testCase) {
    const { name, setup, actions, assertions, cleanup } = testCase;
    this.testCount.total++;
    
    console.log(`Chạy test case: ${name}`);
    
    try {
      // Setup trước test nếu có
      if (setup && typeof setup === 'function') {
        await setup();
      }
      
      // Render component
      const renderResult = render(<Component />);
      
      // Thực hiện các actions
      if (actions && Array.isArray(actions)) {
        for (const action of actions) {
          await action(screen, fireEvent, renderResult);
        }
      }
      
      // Kiểm tra kết quả
      if (assertions && Array.isArray(assertions)) {
        for (const assertion of assertions) {
          await waitFor(() => assertion(screen, expect));
        }
      }
      
      // Cleanup sau test
      if (cleanup && typeof cleanup === 'function') {
        await cleanup();
      }
      
      console.log(`✓ Test case "${name}" thành công`);
      this.testCount.passed++;
      
      this.testResults.push({
        component: Component.name,
        test: name,
        success: true
      });
    } catch (error) {
      console.error(`✗ Test case "${name}" thất bại:`, error);
      this.testCount.failed++;
      
      this.testResults.push({
        component: Component.name,
        test: name,
        success: false,
        error: error.message
      });
    }
  }
  /**
   * Thiết lập các global mock cần thiết
   * 
   * LƯU Ý: Sử dụng testBot.uiTestHelper để lấy mocks có sẵn
   * thay vì định nghĩa chúng lại trong TestBotFather
   */
  setupGlobalMocks() {
    // Mock cho React Router - sử dụng helper có sẵn
    vi.mock('react-router-dom', () => this.testBot.uiTestHelper.createReactRouterMock({
      Outlet: () => <div data-testid="outlet" />
    }));
    
    // Mock cho AuthContext - sử dụng helper có sẵn
    vi.mock('../context/AuthContext', () => ({
      useAuth: () => this.testBot.uiTestHelper.createAuthContextMock()
    }));
    
    // Mock cho API - sử dụng API test helper có sẵn
    vi.mock('../hooks/useApi', () => {
      // Định nghĩa các endpoint cần mock
      const endpoints = {
        '/users': {
          GET: { 
            success: true, 
            data: [
              { user_id: 1, username: 'admin', email: 'admin@example.com', full_name: 'Admin User', role: 'admin', is_active: true },
              { user_id: 2, username: 'user1', email: 'user1@example.com', full_name: 'Test User', role: 'user', is_active: true }
            ]
          },
          POST: (body) => ({ 
            success: true, 
            data: { 
              user_id: 3, 
              ...body
            }
          })
        }
      };
      
      // Đăng ký mock responses với apiTestHelper
      Object.entries(endpoints).forEach(([endpoint, methods]) => {
        Object.entries(methods).forEach(([method, response]) => {
          if (typeof response === 'function') {
            this.testBot.apiTestHelper.mockResponse(`${endpoint}?method=${method}`, response);
          } else {
            this.testBot.apiTestHelper.mockResponse(`${endpoint}?method=${method}`, response);
          }
        });
      });
      
      // Return mock API hook
      return {
        default: () => ({
          callApi: this.testBot.apiTestHelper.call,
          useApiCall: () => ({
            data: null,
            isLoading: false,
            error: null,
            execute: vi.fn()
          }),
          fetchWithAuth: vi.fn()
        })
      };
    });
    
    // Mock UI components sử dụng vi
    vi.mock('@/components/ui/button', () => ({
      Button: ({ children, onClick }) => (
        <button onClick={onClick}>{children}</button>
      )
    }));
  }

  /**
   * Tạo một loạt các test case dành riêng cho UserLogin component
   * @returns {Array} Các test case
   */
  createUserLoginTestCases() {
    return [
      {
        name: 'Hiển thị form đăng nhập',
        actions: [],
        assertions: [
          (screen) => {
            expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /login|đăng nhập/i })).toBeInTheDocument();
          }
        ]
      },
      {
        name: 'Hiển thị lỗi khi submit form trống',
        actions: [
          (_, fireEvent, { container }) => {
            const loginButton = screen.getByRole('button', { name: /login|đăng nhập/i });
            fireEvent.click(loginButton);
          }
        ],
        assertions: [
          (screen) => {
            expect(screen.getByText(/username.*required|tên đăng nhập.*bắt buộc/i)).toBeInTheDocument();
            expect(screen.getByText(/password.*required|mật khẩu.*bắt buộc/i)).toBeInTheDocument();
          }
        ]
      },
      {
        name: 'Xử lý đăng nhập thành công',
        setup: () => {
          // Setup auth service mock
          vi.mock('../services/auth-service', () => ({
            default: {
              login: vi.fn().mockResolvedValue({
                success: true,
                data: {
                  user: {
                    user_id: 1,
                    username: 'testuser',
                    role: 'user'
                  },
                  token: 'fake-token',
                  refreshToken: 'fake-refresh-token'
                }
              })
            }
          }));
        },
        actions: [
          (screen, fireEvent) => {
            // Fill username field
            const usernameInput = screen.getByLabelText(/username/i);
            fireEvent.change(usernameInput, { target: { value: 'testuser' } });
            
            // Fill password field
            const passwordInput = screen.getByLabelText(/password/i);
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
            
            // Click login button
            const loginButton = screen.getByRole('button', { name: /login|đăng nhập/i });
            fireEvent.click(loginButton);
          }
        ],
        assertions: [
          async (screen) => {
            // Import auth service để kiểm tra
            const authService = (await import('../services/auth-service')).default;
            expect(authService.login).toHaveBeenCalledWith({
              username: 'testuser',
              password: 'password123'
            });
          }
        ]
      },
      {
        name: 'Xử lý đăng nhập thất bại',
        setup: () => {
          // Setup auth service mock
          vi.mock('../services/auth-service', () => ({
            default: {
              login: vi.fn().mockResolvedValue({
                success: false,
                message: 'Invalid credentials'
              })
            }
          }));
        },
        actions: [
          (screen, fireEvent) => {
            // Fill username field
            const usernameInput = screen.getByLabelText(/username/i);
            fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
            
            // Fill password field
            const passwordInput = screen.getByLabelText(/password/i);
            fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
            
            // Click login button
            const loginButton = screen.getByRole('button', { name: /login|đăng nhập/i });
            fireEvent.click(loginButton);
          }
        ],
        assertions: [
          (screen) => {
            // Kiểm tra thông báo lỗi
            expect(screen.getByText(/invalid credentials|tài khoản không hợp lệ/i)).toBeInTheDocument();
          }
        ]
      }
    ];
  }

  /**
   * Tạo một loạt các test case dành riêng cho UserList component
   * @returns {Array} Các test case
   */
  createUserListTestCases() {
    return [
      {
        name: 'Hiển thị danh sách người dùng',
        setup: () => {
          // Mock User Controller
          vi.mock('../controllers/UserController', () => ({
            useUserController: () => ({
              getUsers: vi.fn().mockResolvedValue([
                { 
                  user_id: 1, 
                  username: 'admin', 
                  email: 'admin@example.com', 
                  full_name: 'Admin User', 
                  role: 'admin', 
                  is_active: true
                },
                { 
                  user_id: 2, 
                  username: 'user1', 
                  email: 'user1@example.com', 
                  full_name: 'Test User', 
                  role: 'user', 
                  is_active: true
                }
              ]),
              isLoading: false,
              error: null
            })
          }));
        },
        actions: [],
        assertions: [
          async (screen) => {
            await waitFor(() => {
              expect(screen.getByText('admin')).toBeInTheDocument();
              expect(screen.getByText('user1')).toBeInTheDocument();
            });
          }
        ]
      },
      {
        name: 'Tìm kiếm người dùng',
        setup: () => {
          // Mock User Controller
          vi.mock('../controllers/UserController', () => {
            const controller = {
              getUsers: vi.fn().mockImplementation((params) => {
                if (params && params.search === 'admin') {
                  return Promise.resolve([
                    { 
                      user_id: 1, 
                      username: 'admin', 
                      email: 'admin@example.com', 
                      full_name: 'Admin User', 
                      role: 'admin', 
                      is_active: true
                    }
                  ]);
                }
                return Promise.resolve([]);
              }),
              isLoading: false,
              error: null
            };
            return {
              useUserController: () => controller
            };
          });
        },
        actions: [
          (screen, fireEvent) => {
            // Type in search box
            const searchInput = screen.getByPlaceholderText(/search/i);
            fireEvent.change(searchInput, { target: { value: 'admin' } });
            
            // Click search button
            const searchButton = screen.getByRole('button', { name: /search|tìm kiếm/i });
            fireEvent.click(searchButton);
          }
        ],
        assertions: [
          async (screen) => {
            await waitFor(() => {
              expect(screen.getByText('admin')).toBeInTheDocument();
              // Không tìm thấy user1
              expect(screen.queryByText('user1')).not.toBeInTheDocument();
            });
          }
        ]
      }
    ];
  }

  /**
   * Chạy tất cả các test UI đã đăng ký
   */
  async runAllUITests() {
    console.log('Bắt đầu chạy tất cả các test UI...');
    
    for (const [componentName] of this.uiComponentsRegistry) {
      await this.testUIComponent(componentName);
    }
    
    this.reportTestResults();
    
    return this.testResults;
  }

  /**
   * In báo cáo kết quả test
   */
  reportTestResults() {
    console.log('\n===== TEST RESULTS =====');
    console.log(`Tổng số tests: ${this.testCount.total}`);
    console.log(`Thành công: ${this.testCount.passed}`);
    console.log(`Thất bại: ${this.testCount.failed}`);
    console.log('=======================\n');
    
    // In chi tiết các test thất bại
    if (this.testCount.failed > 0) {
      console.log('Chi tiết các test thất bại:');
      this.testResults.filter(result => !result.success).forEach(result => {
        console.log(`- [${result.component}] ${result.test}: ${result.error}`);
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
    this.testResults = [];
    this.testCount = { total: 0, passed: 0, failed: 0 };
    
    console.log('TestBotFather đã dọn dẹp thành công');
  }
}

// Tạo và export một instance singleton
const testBotFather = new TestBotFather();

export default testBotFather;
