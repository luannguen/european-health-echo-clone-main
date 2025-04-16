/**
 * Login UI Test
 * 
 * File test cho giao diện đăng nhập sử dụng TestBotFather
 */

import { describe, it, beforeAll, afterAll, afterEach, expect } from 'vitest';
import testBotFather from '../../../backend/src/tests/helpers/TestBotFather';

describe('Login UI Tests', () => {
  // Khởi tạo TestBotFather một lần cho tất cả các test
  beforeAll(async () => {
    await testBotFather.configure({
      logToConsole: true,
      runServer: false,  // Set true nếu muốn chạy server thật
      serverPort: 3030,
      enableReporting: true
    }).initialize();
    
    // Đăng ký Login component cần test
    testBotFather.registerUIComponent(
      'UserLogin',
      () => import('../pages/auth/Login'),
      testBotFather.createUserLoginTestCases()
    );
  });
  
  // Dọn dẹp sau mỗi test case
  afterEach(async () => {
    vi.resetAllMocks();
  });
  
  // Dọn dẹp sau khi tất cả test hoàn thành
  afterAll(async () => {
    await testBotFather.cleanup();
  });
  
  // Test login component tự động với các test case đã định nghĩa
  it('should test login component', async () => {
    await testBotFather.testUIComponent('UserLogin');
    expect(testBotFather.testCount.failed).toBe(0);
  });
  
  // Test các tính năng cụ thể của Login component
  describe('Login Features', () => {
    it('should show forgot password link', async () => {
      // Ghi đè test case mặc định với tính năng cụ thể
      const forgotPasswordTestCase = {
        name: 'Hiển thị và xử lý link quên mật khẩu',
        actions: [
          (screen, fireEvent) => {
            // Click vào link "Forgot Password"
            const forgotPasswordLink = screen.getByText(/forgot password|quên mật khẩu/i);
            fireEvent.click(forgotPasswordLink);
          }
        ],
        assertions: [
          async (screen) => {
            // Kiểm tra chuyển hướng đến trang quên mật khẩu
            const navigate = require('react-router-dom').useNavigate();
            expect(navigate).toHaveBeenCalledWith('/forgot-password');
          }
        ]
      };
      
      // Sử dụng test case tùy chỉnh
      await testBotFather.runTestCase((await import('../pages/auth/Login')).default, forgotPasswordTestCase);
      expect(testBotFather.testCount.failed).toBe(0);
    });
    
    it('should handle remember me checkbox', async () => {
      const rememberMeTestCase = {
        name: 'Lưu trạng thái "Ghi nhớ đăng nhập"',
        actions: [
          (screen, fireEvent) => {
            // Tick vào checkbox Remember Me
            const rememberMeCheckbox = screen.getByLabelText(/remember me|ghi nhớ/i);
            fireEvent.click(rememberMeCheckbox);
            
            // Nhập thông tin đăng nhập
            const usernameInput = screen.getByLabelText(/username|tên đăng nhập/i);
            fireEvent.change(usernameInput, { target: { value: 'testuser' } });
            
            const passwordInput = screen.getByLabelText(/password|mật khẩu/i);
            fireEvent.change(passwordInput, { target: { value: 'password123' } });
            
            // Click button đăng nhập
            const loginButton = screen.getByRole('button', { name: /login|đăng nhập/i });
            fireEvent.click(loginButton);
          }
        ],
        assertions: [
          async (screen) => {
            // Verify authService được gọi với rememberMe = true
            const authService = (await import('../services/auth-service')).default;
            expect(authService.login).toHaveBeenCalledWith(
              expect.objectContaining({
                username: 'testuser',
                password: 'password123',
                rememberMe: true
              })
            );
          }
        ],
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
        }
      };
      
      // Chạy test case "Remember Me"
      await testBotFather.runTestCase((await import('../pages/auth/Login')).default, rememberMeTestCase);
      expect(testBotFather.testCount.failed).toBe(0);
    });
  });
});
