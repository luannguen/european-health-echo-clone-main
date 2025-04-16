// File UserUI.test.tsx hiện đã được xóa và thay thế bằng giải pháp TestBotFather
// Xem TestBotFather.js để biết cách sử dụng giải pháp test mới này

import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userUIBot from './helpers/UserUIBot';
import testBotFather from '../../../backend/src/tests/helpers/TestBotFather';

// Đổi tên để tránh nhầm lẫn
const testFatherBotUI = testBotFather;

describe('User UI Tests', () => {
  beforeAll(() => {
    // Khởi tạo testFatherBotUI nếu cần
    testFatherBotUI.configure({
      logToConsole: false
    }).initialize();
  });

  afterAll(() => {
    userUIBot.cleanup();
    vi.resetAllMocks();
  });
  // Test UserList component
  describe('UserList Component', () => {
    it('renders users correctly', async () => {
      // Sử dụng UserUITestBot để render và test UserList
      await userUIBot.renderUserList();
      
      // Đợi users tải xong và kiểm tra hiển thị
      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.getByText('user1')).toBeInTheDocument();
      });
    });
    
    it('supports user filtering and search', async () => {
      // Cấu hình mock cho UserController với hành vi tìm kiếm
      userUIBot.mockUserController({
        getUsers: vi.fn().mockImplementation((params) => {
          if (params && params.search === 'admin') {
            return Promise.resolve([
              { 
                user_id: 1, 
                username: 'admin', 
                email: 'admin@example.com', 
                full_name: 'Admin User', 
                role: 'admin', 
                is_active: true,
                created_at: '2023-01-01T00:00:00Z'
              }
            ]);
          }
          return Promise.resolve([]);
        })
      });
      
      // Render và thực hiện tìm kiếm
      await userUIBot.renderUserList();
      
      // Thực hiện tìm kiếm thông qua UserUITestBot
      userUIBot.searchUsers('admin');
      
      // Kiểm tra kết quả tìm kiếm
      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.queryByText('user1')).not.toBeInTheDocument();
      });
    });
  });
  
  // Test UserCreate component
  describe('UserCreate Component', () => {
    it('renders create form correctly', async () => {
      await userUIBot.renderUserCreate();
      
      // Kiểm tra các phần tử form
      await waitFor(() => {
        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Role/i)).toBeInTheDocument();
      });
    });
    
    it('submits form with correct data', async () => {
      // Lấy mock service để spy
      const userDomainServiceMock = testFatherBotUI.testBot.uiTestHelper.createUserDomainServiceMock();
      const createUserSpy = vi.spyOn(userDomainServiceMock, 'createUser');
      
      // Cấu hình UserDomainService với spy
      userUIBot.mockUserDomainService({
        createUser: createUserSpy
      });
      
      await userUIBot.renderUserCreate();
      
      // Điền form thông qua UserUITestBot
      userUIBot.fillUserForm({
        username: 'newuser',
        email: 'newuser@example.com',
        fullName: 'New User',
        password: 'Password123!',
        role: 'user'
      });
      
      // Gửi form
      userUIBot.submitForm();
      
      // Kiểm tra kết quả
      await waitFor(() => {
        expect(createUserSpy).toHaveBeenCalledWith(expect.objectContaining({
          username: 'newuser',
          email: 'newuser@example.com',
          full_name: 'New User',
          password: 'Password123!',
          role: 'user'
        }));
      });
    });
    
    it('shows validation errors', async () => {
      // Setup custom mock với validation errors
      userUIBot.mockUserDomainService({
        createUser: vi.fn().mockResolvedValue({
          success: false,
          validationErrors: {
            email: ['Invalid email format'],
            password: ['Password must be at least 8 characters']
          }
        })
      });
      
      await userUIBot.renderUserCreate();
      
      // Điền form tối thiểu
      userUIBot.fillUserForm({
        username: 'test'
      });
      
      // Submit form
      userUIBot.submitForm();
      
      // Check validation errors
      await waitFor(() => {
        expect(screen.getByText('Invalid email format')).toBeInTheDocument();
        expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
      });
    });
  });
  
  // Test UserEdit component
  describe('UserEdit Component', () => {
    it('loads and displays user data', async () => {
      await userUIBot.renderUserEdit();
      
      // Kiểm tra dữ liệu người dùng được hiển thị
      await waitFor(() => {
        expect(screen.getByDisplayValue('admin')).toBeInTheDocument();
        expect(screen.getByDisplayValue('admin@example.com')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Admin User')).toBeInTheDocument();
      });
    });
    
    it('submits updates correctly', async () => {
      // Setup spy cho updateUser
      const userDomainServiceMock = testFatherBotUI.testBot.uiTestHelper.createUserDomainServiceMock();
      const updateUserSpy = vi.spyOn(userDomainServiceMock, 'updateUser');
      
      userUIBot.mockUserDomainService({
        updateUser: updateUserSpy
      });
      
      await userUIBot.renderUserEdit();
      
      // Đợi dữ liệu load
      await waitFor(() => {
        expect(screen.getByDisplayValue('Admin User')).toBeInTheDocument();
      });
      
      // Thay đổi full name
      userUIBot.changeInput(screen.getByDisplayValue('Admin User'), 'Updated Admin User');
      
      // Submit form
      userUIBot.submitForm(/save|update/i);
      
      // Kiểm tra kết quả
      await waitFor(() => {
        expect(updateUserSpy).toHaveBeenCalledWith(1, expect.objectContaining({
          full_name: 'Updated Admin User'
        }));
      });
    });
  });
  
  // Test UserDetail component
  describe('UserDetail Component', () => {
    it('displays user details correctly', async () => {
      await userUIBot.renderUserDetail();
      
      // Kiểm tra thông tin người dùng
      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
        expect(screen.getByText('admin@example.com')).toBeInTheDocument();
        expect(screen.getByText('Admin User')).toBeInTheDocument();
        expect(screen.getByText('admin')).toBeInTheDocument(); // role
      });
    });
    
    it('has functional delete button', async () => {
      // Setup spy cho deleteUser
      const userControllerMock = testFatherBotUI.testBot.uiTestHelper.createUserControllerMock();
      const deleteUserSpy = vi.spyOn(userControllerMock, 'deleteUser');
      
      userUIBot.mockUserController({
        deleteUser: deleteUserSpy
      });
      
      // Mock window.confirm
      const originalConfirm = window.confirm;
      window.confirm = vi.fn().mockReturnValue(true);
      
      await userUIBot.renderUserDetail();
      
      // Đợi dữ liệu load
      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
      });
      
      // Click delete button
      const deleteButton = screen.getByRole('button', { name: /delete/i });
      userUIBot.click(deleteButton);
      
      // Kiểm tra kết quả
      await waitFor(() => {
        expect(deleteUserSpy).toHaveBeenCalledWith(1);
      });
      
      // Khôi phục window.confirm
      window.confirm = originalConfirm;
    });
    
    it('has functional status toggle', async () => {
      // Setup spy cho toggleUserStatus
      const userControllerMock = testFatherBotUI.testBot.uiTestHelper.createUserControllerMock();
      const toggleStatusSpy = vi.spyOn(userControllerMock, 'toggleUserStatus');
      
      userUIBot.mockUserController({
        toggleUserStatus: toggleStatusSpy
      });
      
      await userUIBot.renderUserDetail();
      
      // Đợi dữ liệu load
      await waitFor(() => {
        expect(screen.getByText('admin')).toBeInTheDocument();
      });
      
      // Click toggle switch
      const statusToggle = screen.getByRole('switch');
      userUIBot.click(statusToggle);
      
      // Kiểm tra kết quả
      await waitFor(() => {
        expect(toggleStatusSpy).toHaveBeenCalledWith(1, false); // Toggle from true to false
      });
    });
  });
});

