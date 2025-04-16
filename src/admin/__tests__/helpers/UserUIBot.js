/**
 * UserUIBot
 * 
 * Helper bot dành riêng cho việc test User UI components
 * Sử dụng TestBotFather để điều phối và quản lý việc test
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import testBotFather from '../../../backend/src/tests/helpers/TestBotFather';

// Import các components cần test
import UserList from '../pages/UserList';
import UserCreate from '../pages/UserCreate';
import UserEdit from '../pages/UserEdit';
import UserDetail from '../pages/UserDetail';

// Khởi tạo TestBotFather
testBotFather.configure({
  logToConsole: false,
  runServer: false
}).initialize();

class UserUIBot {
  constructor() {
    this.testBot = testBotFather.testBot;
    this.userControllerMock = null;
    this.userDomainServiceMock = null;
  }

  /**
   * Tạo mock cho UserController
   * @param {Object} customMethods - Override methods mặc định
   * @returns {Object} - Mock controller
   */
  mockUserController(customMethods = {}) {
    this.userControllerMock = this.testBot.uiTestHelper.createUserControllerMock(customMethods);
    
    // Mock import của UserController
    vi.mock('../controllers/UserController', () => ({
      default: () => this.userControllerMock
    }));
    
    return this.userControllerMock;
  }

  /**
   * Tạo mock cho UserDomainService
   * @param {Object} customMethods - Override methods mặc định
   * @returns {Object} - Mock service
   */
  mockUserDomainService(customMethods = {}) {
    this.userDomainServiceMock = this.testBot.uiTestHelper.createUserDomainServiceMock(customMethods);
    
    // Mock import của UserDomainService
    vi.mock('../services/UserDomainService', () => ({
      default: () => this.userDomainServiceMock
    }));
    
    return this.userDomainServiceMock;
  }

  /**
   * Render UserList component với mocks
   * @returns {Object} - Kết quả render
   */
  async renderUserList() {
    // Setup mocks nếu chưa có
    if (!this.userControllerMock) {
      this.mockUserController();
    }
    
    // Render với Router context
    return render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );
  }

  /**
   * Render UserCreate component với mocks
   * @returns {Object} - Kết quả render
   */
  async renderUserCreate() {
    // Setup mocks nếu chưa có
    if (!this.userDomainServiceMock) {
      this.mockUserDomainService();
    }
    
    // Render với Router context
    return render(
      <BrowserRouter>
        <UserCreate />
      </BrowserRouter>
    );
  }

  /**
   * Render UserEdit component với mocks
   * @param {Number} userId - ID của user để edit (mặc định: 1)
   * @returns {Object} - Kết quả render
   */
  async renderUserEdit(userId = 1) {
    // Setup mocks nếu chưa có
    if (!this.userDomainServiceMock) {
      this.mockUserDomainService();
    }
    
    // Mock useParams để trả về userId
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useParams: () => ({ userId: userId?.toString() })
      };
    });
    
    // Render với Router context
    return render(
      <BrowserRouter>
        <UserEdit />
      </BrowserRouter>
    );
  }

  /**
   * Render UserDetail component với mocks
   * @param {Number} userId - ID của user để xem chi tiết (mặc định: 1)
   * @returns {Object} - Kết quả render
   */
  async renderUserDetail(userId = 1) {
    // Setup mocks nếu chưa có
    if (!this.userControllerMock) {
      this.mockUserController();
    }
    
    // Mock useParams để trả về userId
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useParams: () => ({ userId: userId?.toString() })
      };
    });
    
    // Render với Router context
    return render(
      <BrowserRouter>
        <UserDetail />
      </BrowserRouter>
    );
  }

  /**
   * Tìm kiếm users trong UserList
   * @param {String} keyword - Từ khóa tìm kiếm
   */
  searchUsers(keyword) {
    const searchInput = screen.getByPlaceholderText(/search|tìm kiếm/i);
    fireEvent.change(searchInput, { target: { value: keyword } });
    
    // Trigger search button nếu có
    try {
      const searchButton = screen.getByRole('button', { name: /search|tìm kiếm/i });
      fireEvent.click(searchButton);
    } catch (e) {
      // Có thể search tự động khi onChange
    }
  }

  /**
   * Điền form tạo/sửa user
   * @param {Object} userData - Dữ liệu người dùng
   */
  fillUserForm(userData = {}) {
    // Điền username nếu có
    if (userData.username) {
      try {
        const usernameInput = screen.getByLabelText(/username/i);
        fireEvent.change(usernameInput, { target: { value: userData.username } });
      } catch (e) {
        console.warn('Username field not found');
      }
    }
    
    // Điền email nếu có
    if (userData.email) {
      try {
        const emailInput = screen.getByLabelText(/email/i);
        fireEvent.change(emailInput, { target: { value: userData.email } });
      } catch (e) {
        console.warn('Email field not found');
      }
    }
    
    // Điền full name nếu có
    if (userData.fullName) {
      try {
        const fullNameInput = screen.getByLabelText(/full name|họ tên/i);
        fireEvent.change(fullNameInput, { target: { value: userData.fullName } });
      } catch (e) {
        console.warn('Full name field not found');
      }
    }
    
    // Điền password nếu có
    if (userData.password) {
      try {
        const passwordInput = screen.getByLabelText(/password|mật khẩu/i);
        fireEvent.change(passwordInput, { target: { value: userData.password } });
      } catch (e) {
        console.warn('Password field not found');
      }
    }
    
    // Chọn role nếu có
    if (userData.role) {
      try {
        const roleSelect = screen.getByLabelText(/role|vai trò/i);
        fireEvent.change(roleSelect, { target: { value: userData.role } });
      } catch (e) {
        console.warn('Role field not found');
      }
    }
  }

  /**
   * Submit form
   * @param {RegExp} buttonTextPattern - Pattern để match text của button submit
   */
  submitForm(buttonTextPattern = /submit|save|create|update|tạo mới|lưu|cập nhật/i) {
    const submitButton = screen.getByRole('button', { name: buttonTextPattern });
    fireEvent.click(submitButton);
  }

  /**
   * Click vào một phần tử
   * @param {HTMLElement} element - Phần tử cần click
   */
  click(element) {
    fireEvent.click(element);
  }

  /**
   * Thay đổi giá trị của một input
   * @param {HTMLElement} element - Input element
   * @param {String} value - Giá trị mới
   */
  changeInput(element, value) {
    fireEvent.change(element, { target: { value } });
  }

  /**
   * Cleanup sau khi test xong
   */
  cleanup() {
    vi.resetAllMocks();
  }
}

const userUIBot = new UserUIBot();

export default userUIBot;
