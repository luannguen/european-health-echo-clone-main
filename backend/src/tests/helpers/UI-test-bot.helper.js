/**
 * UI Test Bot Helper
 * 
 * TestFatherBotUI - Quản lý và tự động hóa việc test các UI components
 * Cung cấp một lớp trừu tượng để test UI mà không cần import trực tiếp mã nguồn product
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import testBot from './test-bot.helper.js';

/**
 * TestFatherBotUI - Lớp trung tâm quản lý việc test UI
 */
class TestFatherBotUI {
  constructor() {
    this._bots = {};
    this._mocks = {};
    this._globalMocks = {};
    this._renderResult = null;
    this.testBot = testBot;
  }
  
  /**
   * Khởi tạo TestFatherBotUI với các tùy chọn
   * @param {Object} options - Các tùy chọn khởi tạo
   */
  initialize(options = {}) {
    // Khởi tạo test bot
    testBot.initializeTestBot({
      logToConsole: options.logToConsole || false,
      setupInitialData: options.setupInitialData || true,
      ...options
    });
    
    // Khởi tạo global mocks
    this._setupGlobalMocks(options.globalMocks);
    
    return this;
  }
  
  /**
   * Đăng ký một UI test bot cụ thể
   * @param {string} botName - Tên của bot (ví dụ: 'user', 'product', v.v.)
   * @param {Object} botImplementation - Triển khai của bot
   */
  registerBot(botName, botImplementation) {
    this._bots[botName] = botImplementation;
    return this;
  }
  
  /**
   * Lấy bot theo tên
   * @param {string} botName - Tên của bot
   * @returns {Object} - Bot implementation
   */
  getBot(botName) {
    if (!this._bots[botName]) {
      throw new Error(`Bot '${botName}' chưa được đăng ký. Hãy đăng ký với registerBot() trước.`);
    }
    return this._bots[botName];
  }
  
  /**
   * Thiết lập mocks toàn cục
   * @param {Object} globalMocks - Các mock cần thiết lập
   * @private
   */
  _setupGlobalMocks(globalMocks = {}) {
    // Thiết lập global mocks mặc định
    const defaultGlobalMocks = {
      ReactRouter: () => {
        vi.mock('react-router-dom', () => testBot.uiTestHelper.createReactRouterMock());
      },
      
      AuthContext: () => {
        vi.mock('../context/AuthContext', () => ({
          useAuth: () => testBot.uiTestHelper.createAuthContextMock()
        }));
      },
      
      Toast: () => {
        vi.mock('../../hooks/use-toast', () => ({
          useToast: () => ({
            toast: vi.fn()
          })
        }));
      },
      
      UIComponents: () => {
        vi.mock('@/components/ui/button', () => ({
          Button: ({ children, onClick }) => (
            <button onClick={onClick}>{children}</button>
          )
        }));

        vi.mock('@/components/ui/form', () => ({
          Form: ({ children, onSubmit }) => (
            <form onSubmit={onSubmit}>{children}</form>
          ),
          FormField: ({ children }) => <div>{children}</div>,
          FormItem: ({ children }) => <div>{children}</div>,
          FormLabel: ({ children }) => <label>{children}</label>,
          FormControl: ({ children }) => <div>{children}</div>,
          FormDescription: ({ children }) => <div className="description">{children}</div>,
          FormMessage: ({ children }) => <div className="error">{children}</div>,
        }));
      }
    };
    
    // Merge custom global mocks với default
    this._globalMocks = { ...defaultGlobalMocks, ...globalMocks };
    
    return this;
  }
  
  /**
   * Thiết lập mock cho một module cụ thể
   * @param {string} moduleName - Tên module cần mock
   * @param {Function} mockFactory - Factory function để tạo mock
   */
  setMock(moduleName, mockFactory) {
    this._mocks[moduleName] = mockFactory;
    return this;
  }
  
  /**
   * Reset tất cả mocks và setup data
   */
  cleanup() {
    testBot.cleanupTestData();
    vi.resetAllMocks();
    this._renderResult = null;
    return this;
  }
  
  /**
   * Setup tất cả mocks cần thiết cho một UI test
   * @param {Array<string>} mockNames - Danh sách tên các mock cần setup
   */
  setupMocks(mockNames = []) {
    // Setup global mocks
    Object.keys(this._globalMocks).forEach(mockName => {
      if (mockNames.includes(mockName) || mockNames.length === 0) {
        this._globalMocks[mockName]();
      }
    });
    
    // Setup custom mocks
    Object.keys(this._mocks).forEach(moduleName => {
      this._mocks[moduleName]();
    });
    
    return this;
  }
  
  /**
   * Render một component với context đầy đủ
   * @param {React.Component} Component - Component cần render
   * @param {Object} props - Props cho component
   */
  renderComponent(Component, props = {}) {
    this._renderResult = render(<Component {...props} />);
    return this;
  }
  
  /**
   * Lấy kết quả render hiện tại
   * @returns {Object} - Kết quả render từ @testing-library/react
   */
  getRenderResult() {
    return this._renderResult;
  }
  
  /**
   * Thực hiện một assertion sau khi chờ một điều kiện
   * @param {Function} callback - Callback chứa assertion
   * @returns {Promise} - Promise resolved sau khi assertion hoàn thành
   */
  async waitForAssertion(callback) {
    return waitFor(callback);
  }
  
  /**
   * Tìm một element theo text
   * @param {string} text - Text cần tìm
   * @returns {HTMLElement} - Element tìm thấy
   */
  getByText(text) {
    return screen.getByText(text);
  }
  
  /**
   * Tìm một element theo label
   * @param {string} label - Label text
   * @returns {HTMLElement} - Element tìm thấy
   */
  getByLabel(label) {
    return screen.getByLabelText(label);
  }
  
  /**
   * Click vào một element
   * @param {HTMLElement} element - Element cần click
   */
  click(element) {
    fireEvent.click(element);
    return this;
  }
  
  /**
   * Thay đổi giá trị của một input
   * @param {HTMLElement} element - Input element
   * @param {string} value - Giá trị mới
   */
  changeInput(element, value) {
    fireEvent.change(element, { target: { value } });
    return this;
  }
}

// Specialized UI Test Bots

/**
 * UserUITestBot - Bot chuyên biệt để test User UI
 */
class UserUITestBot {
  constructor(fatherBot) {
    this.fatherBot = fatherBot;
    this.testBot = fatherBot.testBot;
    this._setupUserMocks();
  }
  
  /**
   * Thiết lập mocks cần thiết cho User UI tests
   */
  _setupUserMocks() {
    // Mock UserController
    this.fatherBot.setMock('../controllers/UserController', () => {
      vi.mock('../controllers/UserController', () => ({
        useUserController: () => this.testBot.uiTestHelper.createUserControllerMock()
      }));
    });
    
    // Mock UserDomainService
    this.fatherBot.setMock('../hooks/useUserDomainService', () => {
      vi.mock('../hooks/useUserDomainService', () => ({
        useUserDomainService: () => this.testBot.uiTestHelper.createUserDomainServiceMock()
      }));
    });
    
    // Mock API hooks
    this.fatherBot.setMock('../hooks/useApi', () => {
      vi.mock('../hooks/useApi', () => ({
        default: () => ({
          callApi: vi.fn().mockImplementation((url, options) => {
            if (url.includes('/users') && options?.method === 'GET') {
              return Promise.resolve({ 
                success: true, 
                data: [
                  { user_id: 1, username: 'admin', email: 'admin@example.com', full_name: 'Admin User', role: 'admin', is_active: true },
                  { user_id: 2, username: 'user1', email: 'user1@example.com', full_name: 'Test User', role: 'user', is_active: true }
                ]
              });
            }
            return Promise.resolve({ success: true, data: {} });
          }),
          useApiCall: () => ({
            data: null,
            isLoading: false,
            error: null,
            execute: vi.fn()
          }),
          fetchWithAuth: vi.fn()
        })
      }));
    });
  }
  
  /**
   * Dynamically import a component from the user UI
   * @param {string} componentName - Name of the component to import
   * @returns {Promise<Component>} - React component
   */
  async importComponent(componentName) {
    // Dynamically import component based on name
    const components = {
      UserList: () => import('../pages/users/UserList'),
      UserCreate: () => import('../pages/users/UserCreate'),
      UserEdit: () => import('../pages/users/UserEdit'),
      UserDetail: () => import('../pages/users/UserDetail')
    };
    
    if (!components[componentName]) {
      throw new Error(`Component '${componentName}' không tồn tại hoặc chưa được định nghĩa.`);
    }
    
    const module = await components[componentName]();
    return module.default;
  }
  
  /**
   * Render user list component
   * @returns {Object} - this for chaining
   */
  async renderUserList() {
    const UserList = await this.importComponent('UserList');
    this.fatherBot.renderComponent(UserList);
    return this;
  }
  
  /**
   * Render user create component
   * @returns {Object} - this for chaining
   */
  async renderUserCreate() {
    const UserCreate = await this.importComponent('UserCreate');
    this.fatherBot.renderComponent(UserCreate);
    return this;
  }
  
  /**
   * Render user edit component
   * @returns {Object} - this for chaining
   */
  async renderUserEdit() {
    const UserEdit = await this.importComponent('UserEdit');
    this.fatherBot.renderComponent(UserEdit);
    return this;
  }
  
  /**
   * Render user detail component
   * @returns {Object} - this for chaining
   */
  async renderUserDetail() {
    const UserDetail = await this.importComponent('UserDetail');
    this.fatherBot.renderComponent(UserDetail);
    return this;
  }
  
  /**
   * Search users with a specific query
   * @param {string} query - Search query
   * @returns {Object} - this for chaining
   */
  searchUsers(query) {
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: query } });
    
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);
    
    return this;
  }
  
  /**
   * Fill user form with data
   * @param {Object} userData - User data
   * @returns {Object} - this for chaining
   */
  fillUserForm(userData) {
    const { username, email, fullName, password, role } = userData;
    
    if (username) {
      fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: username } });
    }
    
    if (email) {
      fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: email } });
    }
    
    if (fullName) {
      fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: fullName } });
    }
    
    if (password) {
      fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: password } });
    }
    
    if (role) {
      const roleSelect = screen.getByLabelText(/Role/i);
      fireEvent.change(roleSelect, { target: { value: role } });
    }
    
    return this;
  }
  
  /**
   * Submit user form
   * @param {string} buttonText - Text on the submit button
   * @returns {Object} - this for chaining
   */
  submitForm(buttonText = /create|save|update/i) {
    const submitButton = screen.getByRole('button', { name: buttonText });
    fireEvent.click(submitButton);
    return this;
  }
  
  /**
   * Mock user controller methods with custom behavior
   * @param {Object} customMethods - Custom methods
   * @returns {Object} - this for chaining
   */
  mockUserController(customMethods) {
    vi.mock('../controllers/UserController', () => ({
      useUserController: () => this.testBot.uiTestHelper.createUserControllerMock(customMethods)
    }));
    return this;
  }
  
  /**
   * Mock user domain service methods with custom behavior
   * @param {Object} customMethods - Custom methods
   * @returns {Object} - this for chaining
   */
  mockUserDomainService(customMethods) {
    vi.mock('../hooks/useUserDomainService', () => ({
      useUserDomainService: () => this.testBot.uiTestHelper.createUserDomainServiceMock(customMethods)
    }));
    return this;
  }
}

// Tạo instance của TestFatherBotUI
const testFatherBotUI = new TestFatherBotUI();

// Đăng ký các specialized bots
testFatherBotUI.registerBot('user', (fatherBot) => new UserUITestBot(fatherBot));

// Xuất instance
export default testFatherBotUI;
