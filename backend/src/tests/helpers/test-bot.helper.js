/**
 * Test Bot Helper
 * Cung cấp các tiện ích để sử dụng TestBotService trong các file test
 */

import testBotService from '../../core/services/test-bot.service.js';
import config from '../../config.js';

/**
 * Helper cho việc test password reset
 */
export const passwordResetTestHelper = {
  /**
   * Lấy token đặt lại mật khẩu mới nhất cho một email
   * @param {string} email - Email cần lấy token
   * @returns {string|null} - Token hoặc null nếu không tìm thấy
   */
  getResetToken(email) {
    const tokenInfo = testBotService.getPasswordResetToken(email);
    return tokenInfo ? tokenInfo.token : null;
  },

  /**
   * Kiểm tra xem một email đã nhận được email đặt lại mật khẩu chưa
   * @param {string} email - Email cần kiểm tra
   * @returns {boolean} - true nếu đã nhận email
   */
  hasReceivedResetEmail(email) {
    const inbox = testBotService.getEmailInbox(email);
    return inbox.some(mail => mail.subject === 'Đặt lại mật khẩu');
  },

  /**
   * Xóa sạch tất cả dữ liệu test liên quan đến password reset
   */
  cleanup() {
    testBotService.clearAllData();
  }
};

/**
 * Helper cho việc test user session
 */
export const userSessionTestHelper = {
  /**
   * Tạo một phiên người dùng giả lập
   * @param {number} userId - ID người dùng
   * @param {string} username - Tên người dùng
   * @param {string} role - Vai trò (admin, manager, user...)
   * @returns {Object} - Thông tin phiên
   */
  createSession(userId, username, role = 'user') {
    return testBotService.createUserSession(userId, username, role);
  },

  /**
   * Kiểm tra xem người dùng có phiên đang hoạt động không
   * @param {number} userId - ID người dùng
   * @returns {boolean} - true nếu có phiên hoạt động
   */
  hasActiveSession(userId) {
    const session = testBotService.getUserSession(userId);
    return session && session.active;
  },
  
  /**
   * Xóa sạch tất cả dữ liệu test liên quan đến phiên người dùng
   */
  cleanup() {
    if (testBotService && typeof testBotService.clearUserSessions === 'function') {
      testBotService.clearUserSessions();
    } else {
      console.warn('Warning: testBotService.clearUserSessions is not available');
      // Fallback to clearing all data if specific method is not available
      testBotService.clearAllData();
    }
  }
};

/**
 * Cấu hình TestBotService
 * @param {Object} options - Tùy chọn cấu hình
 */
export function configureTestBot(options) {
  testBotService.updateConfig(options);
}

/**
 * Khởi tạo dữ liệu test ban đầu
 */
export function setupTestData() {
  // Ví dụ: tạo sẵn một số người dùng ảo cho test
  // Có thể mở rộng theo nhu cầu test
  const adminId = 1;
  const adminUsername = config.defaultAdmin.username || 'admin';
  testBotService.createUserSession(adminId, adminUsername, 'admin');
}

/**
 * Xóa sạch tất cả dữ liệu test
 */
export function cleanupTestData() {
  testBotService.clearAllData();
}

/**
 * Khởi tạo TestBot cho việc test
 */
export function initializeTestBot(options = {}) {
  // Đặt cấu hình mặc định
  const defaultOptions = {
    logToConsole: process.env.NODE_ENV !== 'production',
    tokenExpiryHours: 24
  };
  
  // Gộp với cấu hình tùy chọn
  configureTestBot({
    ...defaultOptions,
    ...options
  });
  
  // Xóa sạch dữ liệu cũ
  cleanupTestData();
  
  // Khởi tạo dữ liệu test mới nếu cần
  if (options.setupInitialData) {
    setupTestData();
  }
  
  return testBotService;
}

/**
 * Helper cho việc giả lập database
 */
export const databaseTestHelper = {
  /**
   * Lưu dữ liệu vào database giả lập
   * @param {string} collection - Tên collection
   * @param {string} id - ID của bản ghi
   * @param {Object} data - Dữ liệu cần lưu
   * @returns {boolean} - Kết quả thực hiện
   */
  save(collection, id, data) {
    return testBotService.mockDatabaseSave(collection, id, data);
  },
  
  /**
   * Lấy dữ liệu từ database giả lập
   * @param {string} collection - Tên collection
   * @param {string} id - ID của bản ghi
   * @returns {Object|null} - Dữ liệu hoặc null nếu không tìm thấy
   */
  get(collection, id) {
    return testBotService.mockDatabaseGet(collection, id);
  },
  
  /**
   * Tìm kiếm trong database giả lập
   * @param {string} collection - Tên collection
   * @param {Function} predicate - Hàm lọc (nhận vào item và trả về boolean)
   * @returns {Array} - Mảng các kết quả phù hợp
   */
  find(collection, predicate) {
    return testBotService.mockDatabaseFind(collection, predicate);
  },
  
  /**
   * Xóa tất cả dữ liệu trong một collection
   * @param {string} collection - Tên collection
   */
  clearCollection(collection) {
    if (testBotService.store.databaseMock.has(collection)) {
      testBotService.store.databaseMock.get(collection).clear();
    }
  }
};

/**
 * Helper cho việc giả lập người dùng và xác thực
 */
export const authTestHelper = {
  /**
   * Tạo người dùng mới
   * @param {Object} userData - Thông tin người dùng
   * @returns {Object} - Thông tin người dùng đã tạo
   */
  createUser(userData = {}) {
    return testBotService.createMockUser(userData);
  },
  
  /**
   * Tạo người dùng admin
   * @param {Object} userData - Thông tin người dùng
   * @returns {Object} - Thông tin người dùng admin đã tạo
   */
  createAdminUser(userData = {}) {
    return testBotService.createMockUser({ role: 'admin', ...userData });
  },
  
  /**
   * Tạo token xác thực
   * @param {string} userId - ID người dùng
   * @returns {Object} - Token info
   */
  createAuthToken(userId) {
    return testBotService.createMockAuthToken(userId);
  },
  
  /**
   * Tạo người dùng và token trong một bước
   * @param {Object} userData - Thông tin người dùng
   * @returns {Object} - Thông tin người dùng và token
   */
  setupAuthenticatedUser(userData = {}) {
    const user = testBotService.createMockUser(userData);
    const tokenInfo = testBotService.createMockAuthToken(user.id);
    return { user, ...tokenInfo };
  }
};

/**
 * Helper cho việc giả lập API
 */
export const apiTestHelper = {
  /**
   * Thiết lập response tùy chỉnh cho một API endpoint
   * @param {string} endpoint - Endpoint URL hoặc pattern
   * @param {Object} response - Response data
   * @param {number} statusCode - HTTP status code
   */
  mockResponse(endpoint, response, statusCode = 200) {
    testBotService.mockApiResponse(endpoint, response, statusCode);
  },
  
  /**
   * Gọi API giả lập
   * @param {string} endpoint - Endpoint URL
   * @param {Object} options - Request options
   * @returns {Promise<Object>} - Response
   */
  async call(endpoint, options = {}) {
    return testBotService.mockApiCall(endpoint, options);
  }
};

/**
 * Helper cho metrics và báo cáo test
 */
export const testReportHelper = {
  /**
   * Lấy metrics của test hiện tại
   * @returns {Object} - Metrics data
   */
  getMetrics() {
    return testBotService.getTestMetrics();
  },
  
  /**
   * In báo cáo đơn giản về test
   */
  printReport() {
    const metrics = testBotService.getTestMetrics();
    console.log('\n===== TEST REPORT =====');
    console.log(`Test duration: ${metrics.testDuration.toFixed(2)}s`);
    console.log(`API calls: ${metrics.apiCalls}`);
    console.log(`DB queries: ${metrics.dbQueries}`);
    console.log(`Email notifications: ${metrics.emailsCount}`);
    console.log(`User sessions: ${metrics.activeUserSessions}`);
    console.log(`Mock users: ${metrics.mockUsersCount}`);
    console.log('=======================\n');
  }
};

/**
 * Helper cho việc test UI components
 */
export const uiTestHelper = {
  /**
   * Tạo mock cho controller trong UI tests
   * @param {Object} customMethods - Custom implementation của các methods
   * @returns {Object} - Mock controller object
   */
  createUserControllerMock(customMethods = {}) {
    return {
      getUsers: vi.fn().mockResolvedValue([
        { 
          user_id: 1, 
          username: 'admin', 
          email: 'admin@example.com', 
          full_name: 'Admin User', 
          role: 'admin', 
          is_active: true,
          created_at: '2023-01-01T00:00:00Z'
        },
        { 
          user_id: 2, 
          username: 'user1', 
          email: 'user1@example.com', 
          full_name: 'Test User', 
          role: 'user', 
          is_active: true,
          created_at: '2023-01-02T00:00:00Z'
        }
      ]),
      getUserById: vi.fn().mockResolvedValue({
        user_id: 1, 
        username: 'admin', 
        email: 'admin@example.com', 
        full_name: 'Admin User', 
        role: 'admin', 
        is_active: true,
        created_at: '2023-01-01T00:00:00Z'
      }),
      createUser: vi.fn().mockResolvedValue({
        user_id: 3, 
        username: 'newuser', 
        email: 'newuser@example.com', 
        full_name: 'New User', 
        role: 'user', 
        is_active: true,
        created_at: '2023-01-03T00:00:00Z'
      }),
      updateUser: vi.fn().mockResolvedValue({
        user_id: 1, 
        username: 'admin', 
        email: 'admin@example.com', 
        full_name: 'Updated Admin User', 
        role: 'admin', 
        is_active: true,
        created_at: '2023-01-01T00:00:00Z'
      }),
      deleteUser: vi.fn().mockResolvedValue(true),
      toggleUserStatus: vi.fn().mockResolvedValue(true),
      isLoading: false,
      error: null,
      validationErrors: null,
      ...customMethods
    };
  },

  /**
   * Tạo mock cho domain service trong UI tests
   * @param {Object} customMethods - Custom implementation của các methods
   * @returns {Object} - Mock domain service object
   */
  createUserDomainServiceMock(customMethods = {}) {
    return {
      getUsers: vi.fn().mockResolvedValue({ 
        success: true, 
        data: [
          { 
            user_id: 1, 
            username: 'admin', 
            email: 'admin@example.com', 
            full_name: 'Admin User', 
            role: 'admin', 
            is_active: true,
            created_at: '2023-01-01T00:00:00Z'
          },
          { 
            user_id: 2, 
            username: 'user1', 
            email: 'user1@example.com', 
            full_name: 'Test User', 
            role: 'user', 
            is_active: true,
            created_at: '2023-01-02T00:00:00Z'
          }
        ] 
      }),
      getUserById: vi.fn().mockResolvedValue({ 
        success: true, 
        data: {
          user_id: 1, 
          username: 'admin', 
          email: 'admin@example.com', 
          full_name: 'Admin User', 
          role: 'admin', 
          is_active: true,
          created_at: '2023-01-01T00:00:00Z'
        } 
      }),
      createUser: vi.fn().mockResolvedValue({ 
        success: true, 
        data: {
          user_id: 3, 
          username: 'newuser', 
          email: 'newuser@example.com', 
          full_name: 'New User', 
          role: 'user', 
          is_active: true,
          created_at: '2023-01-03T00:00:00Z'
        } 
      }),
      updateUser: vi.fn().mockResolvedValue({ 
        success: true, 
        data: {
          user_id: 1, 
          username: 'admin', 
          email: 'admin@example.com', 
          full_name: 'Updated Admin User', 
          role: 'admin', 
          is_active: true,
          created_at: '2023-01-01T00:00:00Z'
        } 
      }),
      deleteUser: vi.fn().mockResolvedValue({ success: true, data: true }),
      toggleUserStatus: vi.fn().mockResolvedValue({ success: true, data: true }),
      validateUserData: vi.fn().mockResolvedValue({ isValid: true, errors: {} }),
      getUserRoles: vi.fn().mockResolvedValue({ 
        success: true, 
        data: [
          { role_id: 1, name: 'admin', description: 'Administrator' },
          { role_id: 2, name: 'user', description: 'Regular User' }
        ] 
      }),
      ...customMethods
    };
  },

  /**
   * Tạo mock cho AuthContext trong UI tests
   * @param {Object} customValues - Custom giá trị cho context
   * @returns {Object} - Mock AuthContext object
   */
  createAuthContextMock(customValues = {}) {
    return {
      user: { 
        user_id: 1,
        username: 'admin',
        email: 'admin@example.com',
        full_name: 'Admin User',
        role: 'admin',
        is_active: true
      },
      isAuthenticated: true,
      isLoading: false,
      token: 'mock-token',
      refreshToken: 'mock-refresh-token',
      login: vi.fn().mockResolvedValue(undefined),
      logout: vi.fn(),
      logoutAllDevices: vi.fn().mockResolvedValue(undefined),
      refreshAccessToken: vi.fn().mockResolvedValue(true),
      clearError: vi.fn(),
      error: null,
      ...customValues
    };
  },

  /**
   * Set up mocks cho React Router
   * @returns {Object} - Object chứa các mock functions cho React Router
   */
  createReactRouterMock(customValues = {}) {
    return {
      useNavigate: () => vi.fn(),
      useParams: () => ({ userId: '1', ...customValues.params }),
      useLocation: () => ({ state: null, ...customValues.location }),
      Navigate: () => null,
      Link: ({ to, children }) => (
        <a href={to}>{children}</a>
      ),
      ...customValues
    };
  }
};

export default {
  passwordResetTestHelper,
  userSessionTestHelper,
  databaseTestHelper,
  authTestHelper,
  apiTestHelper,
  testReportHelper,
  uiTestHelper,
  configureTestBot,
  setupTestData,
  cleanupTestData,
  initializeTestBot,
  testBotService
};
