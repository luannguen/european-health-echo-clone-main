/**
 * AuthenticationService
 * Service quản lý quy trình đăng nhập, đăng ký, đăng xuất
 */

import bcrypt from 'bcrypt';
import tokenService from './token.service.js';
import userService from './user.service.js';
import authEventEmitter from '../events/auth-events.js';

class AuthenticationService {
  /**
   * Xác thực người dùng và tạo token
   * @param {string} usernameOrEmail - Tên đăng nhập hoặc email
   * @param {string} password - Mật khẩu
   * @returns {Promise<Object>} - Thông tin người dùng và token
   */
  async login(usernameOrEmail, password) {
    try {
      // Xác thực người dùng
      const user = await userService.authenticate(usernameOrEmail, password);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Tạo tokens
      const accessToken = tokenService.generateAccessToken(user);
      const refreshToken = tokenService.generateRefreshToken(user.id);
      
      // Cập nhật thời gian đăng nhập cuối
      await userService.updateLastLogin(user.id);
      
      // Phát sự kiện đăng nhập thành công
      authEventEmitter.emit('user:login', {
        userId: user.id,
        username: user.username,
        success: true,
        action: 'login'
      });
      
      // Loại bỏ mật khẩu khỏi user object trước khi trả về
      const { password: _, ...userWithoutPassword } = user;
      
      return {
        user: userWithoutPassword,
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: 7200 // 2 giờ
        }
      };
    } catch (error) {
      // Phát sự kiện đăng nhập thất bại
      authEventEmitter.emit('user:login_failed', {
        username: usernameOrEmail,
        success: false,
        action: 'login',
        details: error.message
      });
      
      throw error;
    }
  }

  /**
   * Xác thực token và trả về thông tin người dùng
   * @param {string} token - JWT token
   * @returns {Promise<Object>} - Thông tin người dùng
   */
  async verify(token) {
    try {
      // Xác thực token
      const decoded = tokenService.verifyAccessToken(token);
      
      // Lấy thông tin người dùng từ database
      const user = await userService.getUserById(decoded.id);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      if (!user.is_active) {
        throw new Error('User is inactive');
      }
      
      // Loại bỏ mật khẩu khỏi user object trước khi trả về
      const { password: _, ...userWithoutPassword } = user;
      
      return userWithoutPassword;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Đăng ký người dùng mới
   * @param {Object} userData - Thông tin người dùng
   * @returns {Promise<Object>} - Thông tin người dùng và token
   */
  async register(userData) {
    try {
      // Tạo người dùng mới
      const newUser = await userService.createUser(userData);
      
      // Tạo tokens
      const accessToken = tokenService.generateAccessToken(newUser);
      const refreshToken = tokenService.generateRefreshToken(newUser.id);
      
      // Phát sự kiện đăng ký thành công
      authEventEmitter.emit('user:register', {
        userId: newUser.id,
        username: newUser.username,
        success: true,
        action: 'register'
      });
      
      // Loại bỏ mật khẩu khỏi user object trước khi trả về
      const { password: _, ...userWithoutPassword } = newUser;
      
      return {
        user: userWithoutPassword,
        tokens: {
          accessToken,
          refreshToken,
          expiresIn: 7200 // 2 giờ
        }
      };
    } catch (error) {
      // Phát sự kiện đăng ký thất bại
      authEventEmitter.emit('user:register_failed', {
        success: false,
        action: 'register',
        details: error.message
      });
      
      throw error;
    }
  }

  /**
   * Đổi mật khẩu người dùng
   * @param {number|string} userId - ID người dùng
   * @param {string} currentPassword - Mật khẩu hiện tại
   * @param {string} newPassword - Mật khẩu mới
   * @returns {Promise<boolean>} - Kết quả thay đổi
   */
  async changePassword(userId, currentPassword, newPassword) {
    try {
      // Lấy thông tin người dùng
      const user = await userService.getUserById(userId);
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // Xác thực mật khẩu hiện tại
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      
      if (!isPasswordValid) {
        throw new Error('Current password is incorrect');
      }
      
      // Đổi mật khẩu
      const result = await userService.changePassword(userId, newPassword);
      
      if (result) {
        // Phát sự kiện đổi mật khẩu thành công
        authEventEmitter.emit('user:password_change', {
          userId,
          username: user.username,
          success: true,
          action: 'change_password'
        });
      }
      
      return result;
    } catch (error) {
      // Phát sự kiện đổi mật khẩu thất bại
      authEventEmitter.emit('user:password_change_failed', {
        userId,
        success: false,
        action: 'change_password',
        details: error.message
      });
      
      throw error;
    }
  }
}

// Export singleton instance
export default new AuthenticationService();
