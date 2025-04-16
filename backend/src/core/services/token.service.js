/**
 * TokenService
 * Service quản lý JWT access tokens và refresh tokens
 */

import jwt from 'jsonwebtoken';
import config from '../../config.js';

class TokenService {
  constructor() {
    this.refreshTokens = new Map(); // Lưu trữ tạm thời refresh tokens (userId -> tokens[])
    this.revokedTokens = new Set(); // Lưu trữ tạm thời các token bị thu hồi
    this.tokenRepository = null;    // Repository để lưu trữ vĩnh viễn
  }

  /**
   * Thiết lập tham chiếu đến tokenRepository
   * @param {Object} repository - Token repository instance
   */
  setTokenRepository(repository) {
    this.tokenRepository = repository;
  }

  /**
   * Trích xuất token JWT từ header Authorization
   * @param {string} authHeader - Header Authorization từ request
   * @returns {string|null} Token JWT hoặc null nếu không tìm thấy
   */
  extractTokenFromHeader(authHeader) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7); // Bỏ qua 'Bearer ' để lấy token
  }

  /**
   * Tạo JWT access token mới
   * @param {Object} user - Thông tin người dùng
   * @param {Object} [options] - Tùy chọn
   * @param {number} [options.expiresIn] - Thời gian hết hạn (giây)
   * @returns {string} - JWT token
   */
  generateAccessToken(user, options = {}) {
    const payload = {
      id: user.id || user.user_id,
      username: user.username,
      email: user.email,
      role: user.role
    };

    const expiresIn = options.expiresIn || '2h'; // Mặc định 2 giờ

    return jwt.sign(payload, config.jwtSecret, { expiresIn });
  }

  /**
   * Tạo refresh token mới
   * @param {Object|number|string} user - User object hoặc user ID
   * @returns {string} - Refresh token
   */
  generateRefreshToken(user) {
    const userId = typeof user === 'object' ? (user.id || user.user_id) : user;
    const token = this._generateRandomToken();

    // Đăng ký token vào bộ nhớ tạm thời
    this.registerRefreshToken(token, userId);

    return token;
  }

  /**
   * Đăng ký refresh token vào bộ nhớ tạm thời
   * @param {string} token - Refresh token
   * @param {number|string} userId - ID người dùng
   */
  registerRefreshToken(token, userId) {
    if (!this.refreshTokens.has(userId)) {
      this.refreshTokens.set(userId, new Set());
    }
    this.refreshTokens.get(userId).add(token);
  }

  /**
   * Xác thực JWT access token
   * @param {string} token - JWT token
   * @returns {Object} - Payload của token
   * @throws {Error} - Nếu token không hợp lệ
   */
  verifyAccessToken(token) {
    try {
      // Kiểm tra token có trong danh sách bị thu hồi
      if (this.isTokenRevoked(token)) {
        throw new Error('Token has been revoked');
      }

      // Xác thực token
      const decoded = jwt.verify(token, config.jwtSecret);
      return decoded;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token has expired');
      }
      throw new Error('Invalid token');
    }
  }

  /**
   * Lấy user ID từ refresh token
   * @param {string} refreshToken - Refresh token
   * @returns {number|string|null} - User ID hoặc null nếu token không hợp lệ
   */
  getUserIdFromRefreshToken(refreshToken) {
    // Duyệt qua tất cả các entry trong Map
    for (const [userId, tokens] of this.refreshTokens.entries()) {
      if (tokens.has(refreshToken)) {
        return userId;
      }
    }

    return null;
  }

  /**
   * Thu hồi access token (thêm vào blacklist)
   * @param {string} token - JWT access token
   * @returns {boolean} - Kết quả thu hồi
   */
  revokeAccessToken(token) {
    this.revokedTokens.add(token);

    // Nếu có repository, lưu vào database
    if (this.tokenRepository) {
      try {
        const decoded = jwt.decode(token);
        if (decoded) {
          const userId = decoded.id;
          const expiryDate = new Date(decoded.exp * 1000);
          
          // Không đợi promise trả về
          this.tokenRepository.saveRevokedToken(token, expiryDate, userId).catch(err => {
            console.error('Error saving revoked token to database:', err);
          });
        }
      } catch (error) {
        console.error('Error decoding token for revocation:', error);
      }
    }

    return true;
  }

  /**
   * Xóa refresh token
   * @param {string} refreshToken - Refresh token
   * @returns {boolean} - Kết quả xóa
   */
  removeRefreshToken(refreshToken) {
    const userId = this.getUserIdFromRefreshToken(refreshToken);

    if (userId && this.refreshTokens.has(userId)) {
      const tokens = this.refreshTokens.get(userId);
      const result = tokens.delete(refreshToken);

      // Nếu không còn token nào, xóa entry
      if (tokens.size === 0) {
        this.refreshTokens.delete(userId);
      }

      return result;
    }

    return false;
  }

  /**
   * Kiểm tra token có bị thu hồi không
   * @param {string} token - JWT token
   * @returns {Promise<boolean>} - true nếu đã bị thu hồi
   */
  async isTokenRevoked(token) {
    // Kiểm tra trong memory cache
    if (this.revokedTokens.has(token)) {
      return true;
    }

    // Nếu có repository, kiểm tra trong database
    if (this.tokenRepository) {
      try {
        return await this.tokenRepository.isTokenRevoked(token);
      } catch (error) {
        console.error('Error checking token revocation in database:', error);
      }
    }

    return false;
  }

  /**
   * Kiểm tra token đã hết hạn chưa
   * @param {string} token - JWT token
   * @returns {boolean} - true nếu đã hết hạn
   */
  isTokenExpired(token) {
    try {
      jwt.verify(token, config.jwtSecret);
      return false; // Nếu không có lỗi, token còn hiệu lực
    } catch (error) {
      return error.name === 'TokenExpiredError';
    }
  }

  /**
   * Tạo một token ngẫu nhiên
   * @private
   * @returns {string} - Token ngẫu nhiên
   */
  _generateRandomToken() {
    const tokenLength = 40;
    const buffer = Buffer.allocUnsafe(tokenLength);
    
    for (let i = 0; i < tokenLength; i++) {
      buffer[i] = Math.floor(Math.random() * 256);
    }
    
    return buffer.toString('hex');
  }
}

// Export singleton instance
export default new TokenService();
