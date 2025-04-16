/**
 * AuthService
 * Service tổng hợp (facade) kết hợp các module xác thực và phân quyền
 * Cung cấp API đơn giản để sử dụng trong ứng dụng
 */

import jwt from 'jsonwebtoken';
import config from '../../config.js';
import userService from './user.service.js';
import tokenService from './token.service.js';
import authenticationService from './authentication.service.js';
import authorizationService from './authorization.service.js';
import tokenRepository from '../repositories/token.repository.js';
import authEventEmitter from '../events/auth-events.js';

// Sử dụng scheduler để định kỳ dọn dẹp tokens
let cleanupInterval = null;
const CLEANUP_INTERVAL_MS = 60 * 60 * 1000; // Mỗi giờ

class AuthService {
  constructor() {
    // Thiết lập tham chiếu đến tokenRepository cho tokenService
    tokenService.setTokenRepository(tokenRepository);
    
    // Đăng ký lắng nghe sự kiện log
    this._setupEventListeners();
    
    // Khởi động job dọn dẹp tokens
    this._startCleanupJob();
  }

  /**
   * Alias for refreshToken for backward compatibility
   * @param {string} refreshToken - Refresh token
   * @param {Object} [options] - Tùy chọn
   * @returns {Promise<Object>} - Access token mới
   */
  async refresh(refreshToken, options = {}) {
    return this.refreshToken(refreshToken, options);
  }
  
  /**
   * Xác thực người dùng và tạo token đăng nhập
   * @param {string} usernameOrEmail - Tên đăng nhập hoặc email
   * @param {string} password - Mật khẩu
   * @param {Object} [options] - Tùy chọn
   * @param {string} [options.userAgent] - User Agent của người dùng
   * @param {string} [options.ipAddress] - Địa chỉ IP của người dùng
   * @returns {Promise<Object>} - Thông tin người dùng và token
   */
  async login(usernameOrEmail, password, options = {}) {
    try {
      // Sử dụng AuthenticationService để đăng nhập
      const authResult = await authenticationService.login(usernameOrEmail, password);
      
      // Bổ sung thông tin metadata vào log
      this._attachMetadataToLogs(authResult.user.id, options);
      
      // Lưu refresh token vào database
      const expiryDate = new Date(Date.now() + this._getRefreshTokenExpiryMs());
      
      await tokenRepository.saveRefreshToken(
        authResult.tokens.refreshToken,
        authResult.user.id,
        expiryDate,
        options.userAgent
      );
      
      return authResult;
    } catch (error) {
      // Xử lý lỗi và chuyển tiếp
      throw error;
    }
  }

  /**
   * Đăng ký người dùng mới
   * @param {Object} userData - Thông tin người dùng
   * @param {Object} [options] - Tùy chọn
   * @returns {Promise<Object>} - Thông tin người dùng và token
   */
  async register(userData, options = {}) {
    try {
      // Sử dụng AuthenticationService để đăng ký
      const registrationResult = await authenticationService.register(userData);
      
      // Bổ sung thông tin metadata vào log
      this._attachMetadataToLogs(registrationResult.user.id, options);
      
      // Lưu refresh token vào database
      const expiryDate = new Date(Date.now() + this._getRefreshTokenExpiryMs());
      
      await tokenRepository.saveRefreshToken(
        registrationResult.tokens.refreshToken,
        registrationResult.user.id,
        expiryDate,
        options.userAgent
      );
      
      return registrationResult;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Xác thực token và trả về thông tin người dùng
   * @param {string} token - JWT access token
   * @returns {Promise<Object>} - Thông tin người dùng
   */  async verifyToken(token) {
    try {
      // Kiểm tra token có trong blacklist không
      const isRevoked = await tokenRepository.isTokenRevoked(token);
      
      if (isRevoked) {
        throw new Error('Token has been revoked');
      }
      
      // Log token being verified for debugging
      console.log(`Verifying token: ${token ? token.substring(0, 15) + '...' : 'undefined'}`);
      
      // Sử dụng AuthenticationService để xác thực
      const user = await authenticationService.verify(token);
      
      // Debug log to check user object format
      console.log('Verified user:', JSON.stringify({
        id: user.id,
        user_id: user.user_id,
        role: user.role
      }));
      
      return user;
    } catch (error) {
      console.error('Token verification error:', error.message);
      throw error;
    }
  }
    /**
   * Làm mới access token bằng refresh token
   * @param {string} refreshToken - Refresh token
   * @param {Object} [options] - Tùy chọn
   * @returns {Promise<Object>} - Access token mới
   */    async refreshToken(refreshToken, options = {}) {
    try {
      // Handle case when the refresh token is sent as an object instead of string
      if (typeof refreshToken === 'object' && refreshToken !== null) {
        // If it's an object with refreshToken property, extract that value
        if (refreshToken.refreshToken) {
          console.log('Refresh token received as object, extracting token value');
          refreshToken = refreshToken.refreshToken;
        } else {
          console.log('Invalid refresh token object received:', refreshToken);
          throw new Error('Invalid refresh token format');
        }
      }
      
      console.log('Refresh token request received:', refreshToken ? refreshToken.substring(0, 8) + '...' : 'undefined');
      
      if (!refreshToken) {
        throw new Error('Refresh token is required');
      }
      
      // Kiểm tra refresh token trong database
      const storedToken = await tokenRepository.findRefreshToken(refreshToken);
      console.log('Database lookup result:', storedToken ? 'Token found for user ' + storedToken.user_id : 'Token not found in DB');
      
      let userId = null;
      
      // First check if token exists in database
      if (storedToken) {
        userId = storedToken.user_id;
        
        // Cập nhật thời gian sử dụng cuối cùng
        await tokenRepository.updateRefreshTokenLastUsed(refreshToken);
      } else {
        // Fallback: try direct lookup from in-memory store
        userId = tokenService.getUserIdFromRefreshToken(refreshToken);
        console.log('In-memory lookup result:', userId ? 'Token found for user ' + userId : 'Token not found in memory');
      }
      
      // If we couldn't find the token in either place, it's invalid
      if (!userId) {
        throw new Error('Invalid or expired refresh token');
      }
      
      // Get user information to validate and generate new token
      const user = await userService.getUserById(userId);
      
      if (!user || !user.is_active) {
        throw new Error('User not found or account disabled');
      }
      
      // Generate new access token
      const accessToken = tokenService.generateAccessToken(user);
      
      // Make sure the token is registered in memory too
      tokenService.registerRefreshToken(refreshToken, userId);
      
      // Bổ sung thông tin metadata vào log
      this._attachMetadataToLogs(userId, options);
      
      return {
        accessToken,
        expiresIn: 7200 // Default 2 hours
      };
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }
  
  /**
   * Đăng xuất (hủy token)
   * @param {string} accessToken - JWT access token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise<boolean>} - Kết quả đăng xuất
   */  async logout(accessToken, refreshToken) {
    try {
      let result = false;
      let userId = null;
      
      // Hủy access token (lưu vào blacklist)
      if (accessToken) {
        const decoded = jwt.decode(accessToken);
        
        if (decoded) {
          userId = decoded.id;
          
          // Lưu token vào database blacklist
          const expiryDate = new Date(decoded.exp * 1000);
          await tokenRepository.saveRevokedToken(accessToken, expiryDate, userId);
          
          // Also revoke token in memory
          tokenService.revokeAccessToken(accessToken);
        }
      }
      
      // Hủy refresh token
      if (refreshToken) {
        // Lấy thông tin refresh token từ database nếu chưa có userId
        if (!userId) {
          const tokenInfo = await tokenRepository.findRefreshToken(refreshToken);
          if (tokenInfo) {
            userId = tokenInfo.user_id;
          } else {
            // Try to get userId from in-memory store
            userId = tokenService.getUserIdFromRefreshToken(refreshToken);
          }
        }
        
        // Thu hồi refresh token from database
        await tokenRepository.revokeRefreshToken(refreshToken);
        
        // Also remove from in-memory store
        tokenService.removeRefreshToken(refreshToken);
        
        result = true;
      }
      
      // Đánh dấu hoạt động đăng xuất thành công
      if (userId) {
        authEventEmitter.emit('user:logout', { userId });
      }
      
      return result;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    }
  }
  
  /**
   * Đăng xuất khỏi tất cả thiết bị
   * @param {number|string} userId - ID người dùng
   * @returns {Promise<boolean>} - Kết quả
   */
  async logoutAllDevices(userId) {
    try {
      // Thu hồi tất cả refresh token
      const revokedCount = await tokenRepository.revokeAllUserRefreshTokens(userId);
      
      // Phát sự kiện đăng xuất
      if (revokedCount > 0) {
        authEventEmitter.emit('user:logout_all', { userId, sessionCount: revokedCount });
      }
      
      return revokedCount > 0;
    } catch (error) {
      console.error('Logout all devices error:', error);
      return false;
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
      // Sử dụng AuthenticationService để đổi mật khẩu
      const result = await authenticationService.changePassword(
        userId,
        currentPassword,
        newPassword
      );
      
      // Nếu đổi mật khẩu thành công, đăng xuất tất cả thiết bị
      if (result) {
        await this.logoutAllDevices(userId);
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Yêu cầu đặt lại mật khẩu
   * @param {string} email - Email của người dùng
   * @returns {Promise<Object>} - Thông tin token đặt lại mật khẩu
   */
  async requestPasswordReset(email) {
    // Tìm người dùng bằng email
    const user = await userService.findByEmail(email);
    
    if (!user) {
      // Không tìm thấy user, nhưng vẫn trả về thành công để tránh leak thông tin
      return { success: true, message: 'If the email exists, a password reset link has been sent' };
    }
    
    // Tạo token reset password (JWT với thời gian ngắn)
    const payload = {
      id: user.id,
      email: user.email,
      type: 'password_reset'
    };
    
    const resetToken = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
    
    // Phát sự kiện yêu cầu reset password
    console.log(`[DEBUG] Emitting user:password_reset_request event for email ${email}`);
    authEventEmitter.emit('user:password_reset_request', { userId: user.id, email, token: resetToken });
    console.log(`[DEBUG] Event emitted with token ${resetToken.substring(0, 10)}...`);
    
    // Trực tiếp lưu token vào TestBotService để đảm bảo nó hoạt động
    try {
      const testBotService = require('./test-bot.service.js').default;
      if (testBotService) {
        console.log(`[DEBUG] Directly saving token to TestBotService for ${email}`);
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);
        testBotService.savePasswordResetToken(email, resetToken, expiresAt);
      }
    } catch (err) {
      console.error(`[DEBUG] Error directly saving to TestBotService:`, err);
    }
    
    // Trong môi trường thực tế, sẽ gửi email với đường dẫn reset password
    // nhưng ở đây chỉ trả về token để testing
    return { 
      success: true,
      message: 'Password reset link has been sent to your email',
      resetToken // Trong thực tế KHÔNG nên trả về token này, chỉ gửi qua email
    };
  }
  
  /**
   * Đặt lại mật khẩu bằng token reset
   * @param {string} resetToken - Token reset password
   * @param {string} newPassword - Mật khẩu mới
   * @returns {Promise<boolean>} - Kết quả thực hiện
   */
  async resetPassword(resetToken, newPassword) {
    try {
      // Verify token
      const decoded = jwt.verify(resetToken, config.jwtSecret);
      
      // Kiểm tra loại token
      if (!decoded || decoded.type !== 'password_reset') {
        throw new Error('Invalid reset token');
      }
      
      // Đặt lại mật khẩu
      const success = await userService.resetPassword(decoded.id, newPassword);
      
      if (success) {
        // Phát sự kiện reset password thành công
        authEventEmitter.emit('user:password_reset_complete', { userId: decoded.id });
        
        // Đăng xuất tất cả thiết bị
        await this.logoutAllDevices(decoded.id);
      }
      
      return success;
    } catch (error) {
      console.error('Reset password error:', error);
      
      if (error.name === 'TokenExpiredError') {
        throw new Error('Reset token has expired');
      }
      
      throw new Error('Invalid or expired reset token');
    }
  }
  
  /**
   * Kiểm tra người dùng có vai trò cần thiết
   * @param {Object|number|string} user - User object hoặc user ID
   * @param {string|Array<string>} roles - Vai trò cần kiểm tra
   * @returns {Promise<boolean>} - Kết quả kiểm tra
   */
  async checkRole(user, roles) {
    return authorizationService.hasRole(user, roles);
  }
  
  /**
   * Kiểm tra người dùng có phải là admin
   * @param {Object|number|string} user - User object hoặc user ID
   * @returns {Promise<boolean>} - Kết quả kiểm tra
   */
  async isAdmin(user) {
    return authorizationService.isAdmin(user);
  }
  
  /**
   * Kiểm tra quyền sở hữu tài nguyên
   * @param {Object|number|string} user - User object hoặc user ID
   * @param {Object} resource - Tài nguyên cần kiểm tra
   * @param {string} [ownerField] - Tên trường chứa user ID, mặc định là 'user_id'
   * @returns {Promise<boolean>} - Kết quả kiểm tra
   */
  async checkOwnership(user, resource, ownerField = 'user_id') {
    return authorizationService.isOwner(user, resource, ownerField);
  }
  
  /**
   * Kiểm tra người dùng có quyền truy cập dựa trên vai trò hoặc quyền sở hữu
   * @param {Object|number|string} user - User object hoặc user ID
   * @param {string|Array<string>} roles - Vai trò cần kiểm tra
   * @param {Object} [resource] - Tài nguyên cần kiểm tra
   * @param {string} [ownerField] - Tên trường chứa user ID
   * @returns {Promise<boolean>} - Kết quả kiểm tra
   */
  async checkAccess(user, roles, resource = null, ownerField = 'user_id') {
    return authorizationService.hasAccess(user, roles, resource, ownerField);
  }
  
  /**
   * Lấy lịch sử hoạt động xác thực của người dùng
   * @param {number|string} userId - ID người dùng
   * @param {number} [limit] - Giới hạn số lượng bản ghi
   * @returns {Promise<Array>} - Danh sách hoạt động
   */
  async getUserAuthHistory(userId, limit = 50) {
    return tokenRepository.getUserAuthActivity(userId, limit);
  }
  
  /**
   * Lấy danh sách phiên đăng nhập hiện tại của người dùng
   * @param {number|string} userId - ID người dùng
   * @returns {Promise<Array>} - Danh sách phiên đăng nhập
   */
  async getUserActiveSessions(userId) {
    try {
      const query = `
        SELECT 
          token, created_at, last_used_at, user_agent
        FROM refresh_tokens
        WHERE user_id = @userId AND is_revoked = 0 AND expiry_date > GETDATE()
        ORDER BY last_used_at DESC
      `;
      
      const result = await dbService.executeQuery(query, { userId });
      
      if (result && result.recordset) {
        // Xử lý kết quả để trả về thông tin hữu ích hơn
        return result.recordset.map(session => ({
          id: session.token.substring(0, 8), // Chỉ trả về 8 ký tự đầu làm ID
          createdAt: session.created_at,
          lastUsedAt: session.last_used_at,
          userAgent: session.user_agent
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error getting user active sessions:', error);
      return [];
    }
  }
  
  /**
   * Đăng ký lắng nghe các sự kiện xác thực
   * @private
   */
  _setupEventListeners() {
    // Lưu log hoạt động xác thực vào database
    authEventEmitter.on('auth:activity_log', async (logEntry) => {
      await tokenRepository.saveAuthActivity(logEntry);
    });
    
    // Dọn dẹp tokens sau mỗi sự kiện đăng xuất
    authEventEmitter.on('user:logout_all', async () => {
      // Chạy dọn dẹp tokens bất đồng bộ
      this._asyncCleanupTokens().catch(err => {
        console.error('Error cleaning up tokens after logout:', err);
      });
    });
    
    // Lắng nghe sự kiện yêu cầu đặt lại mật khẩu và lưu token vào TestBotService
    authEventEmitter.on('user:password_reset_request', async (data) => {
      try {
        // Import TestBotService ở đây để tránh circular dependency
        const testBotService = (await import('./test-bot.service.js')).default;
        
        if (testBotService) {
          // Tính toán thời gian hết hạn (1 giờ)
          const expiresAt = new Date();
          expiresAt.setHours(expiresAt.getHours() + 1);
          
          // Lưu token vào TestBotService
          testBotService.savePasswordResetToken(data.email, data.token, expiresAt);
          console.log(`[AUTH] Saved reset token for ${data.email} to TestBotService`);
          
          // Giả lập gửi email
          testBotService.sendPasswordResetEmail({
            email: data.email,
            username: data.email.split('@')[0],
            token: data.token,
            expiryHours: 1
          });
        }
      } catch (error) {
        console.error('Error saving reset token to TestBotService:', error);
      }
    });
  }
  
  /**
   * Khởi tạo job dọn dẹp tokens định kỳ
   * @private
   */
  _startCleanupJob() {
    if (cleanupInterval) {
      clearInterval(cleanupInterval);
    }
    
    cleanupInterval = setInterval(() => {
      this._asyncCleanupTokens().catch(err => {
        console.error('Error in scheduled token cleanup:', err);
      });
    }, CLEANUP_INTERVAL_MS);
    
    // Đảm bảo interval không ngăn chặn process exit
    if (cleanupInterval.unref) {
      cleanupInterval.unref();
    }
  }
  
  /**
   * Dọn dẹp tokens hết hạn
   * @private
   */
  async _asyncCleanupTokens() {
    // Dọn dẹp refresh tokens hết hạn
    const refreshTokensRemoved = await tokenRepository.cleanupExpiredRefreshTokens();
    
    // Dọn dẹp revoked tokens hết hạn
    const revokedTokensRemoved = await tokenRepository.cleanupExpiredRevokedTokens();
    
    console.log(`Cleanup: Removed ${refreshTokensRemoved} expired refresh tokens and ${revokedTokensRemoved} expired revoked tokens`);
  }
  
  /**
   * Gắn thông tin metadata vào log hoạt động
   * @private
   * @param {number|string} userId - ID người dùng
   * @param {Object} metadata - Thông tin metadata
   */
  _attachMetadataToLogs(userId, metadata) {
    // Đăng ký một lần lắng nghe cho sự kiện log tiếp theo
    const handler = (logEntry) => {
      if (logEntry.userId === userId) {
        // Bổ sung metadata
        logEntry.ip = metadata.ipAddress || null;
        logEntry.userAgent = metadata.userAgent || null;
        
        // Gỡ bỏ listener sau khi đã xử lý
        authEventEmitter.off('auth:activity_log', handler);
      }
    };
    
    authEventEmitter.on('auth:activity_log', handler);
  }
  
  /**
   * Lấy thời gian hết hạn của refresh token (ms)
   * @private
   * @returns {number} - Thời gian tính bằng milliseconds
   */
  _getRefreshTokenExpiryMs() {
    // Mặc định là 7 ngày
    return 7 * 24 * 60 * 60 * 1000;
  }
}

export default new AuthService();
