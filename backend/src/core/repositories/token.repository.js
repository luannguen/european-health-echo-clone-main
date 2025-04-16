/**
 * TokenRepository
 * Repository cho việc lưu trữ và quản lý tokens trong database
 */

import dbService from '../services/db.service.js';

class TokenRepository {
  /**
   * Lưu refresh token vào database
   * @param {string} token - Refresh token
   * @param {number|string} userId - ID người dùng
   * @param {Date} expiryDate - Ngày hết hạn
   * @param {string} [userAgent] - Thông tin thiết bị người dùng
   * @returns {Promise<boolean>} - Kết quả lưu
   */
  async saveRefreshToken(token, userId, expiryDate, userAgent = null) {
    try {
      const query = `
        INSERT INTO refresh_tokens (token, user_id, expiry_date, created_at, user_agent)
        VALUES (@token, @userId, @expiryDate, GETDATE(), @userAgent)
      `;

      await dbService.executeQuery(query, {
        token,
        userId,
        expiryDate,
        userAgent: userAgent || ''
      });

      return true;
    } catch (error) {
      console.error('Error saving refresh token:', error);
      return false;
    }
  }

  /**
   * Tìm refresh token trong database
   * @param {string} token - Refresh token cần tìm
   * @returns {Promise<Object|null>} - Thông tin token hoặc null
   */
  async findRefreshToken(token) {
    try {
      const query = `
        SELECT 
          id, token, user_id, expiry_date, created_at, 
          last_used_at, is_revoked, revoked_at, user_agent
        FROM refresh_tokens
        WHERE token = @token
      `;

      const result = await dbService.executeQuery(query, { token });

      if (result && result.recordset && result.recordset.length > 0) {
        return result.recordset[0];
      }

      return null;
    } catch (error) {
      console.error('Error finding refresh token:', error);
      return null;
    }
  }

  /**
   * Cập nhật thời gian sử dụng cuối của refresh token
   * @param {string} token - Refresh token
   * @returns {Promise<boolean>} - Kết quả cập nhật
   */
  async updateRefreshTokenLastUsed(token) {
    try {
      const query = `
        UPDATE refresh_tokens
        SET last_used_at = GETDATE()
        WHERE token = @token
      `;

      await dbService.executeQuery(query, { token });
      return true;
    } catch (error) {
      console.error('Error updating refresh token last_used_at:', error);
      return false;
    }
  }

  /**
   * Thu hồi refresh token
   * @param {string} token - Refresh token
   * @returns {Promise<boolean>} - Kết quả thu hồi
   */
  async revokeRefreshToken(token) {
    try {
      const query = `
        UPDATE refresh_tokens
        SET is_revoked = 1, revoked_at = GETDATE()
        WHERE token = @token
      `;

      const result = await dbService.executeQuery(query, { token });
      
      if (result && result.rowsAffected && result.rowsAffected[0] > 0) {
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error revoking refresh token:', error);
      return false;
    }
  }

  /**
   * Thu hồi tất cả refresh token của một user
   * @param {number|string} userId - ID người dùng
   * @returns {Promise<number>} - Số lượng token đã thu hồi
   */
  async revokeAllUserRefreshTokens(userId) {
    try {
      const query = `
        UPDATE refresh_tokens
        SET is_revoked = 1, revoked_at = GETDATE()
        WHERE user_id = @userId AND is_revoked = 0
      `;

      const result = await dbService.executeQuery(query, { userId });
      
      if (result && result.rowsAffected) {
        return result.rowsAffected[0];
      }

      return 0;
    } catch (error) {
      console.error('Error revoking all user refresh tokens:', error);
      return 0;
    }
  }

  /**
   * Lưu token đã bị thu hồi vào database
   * @param {string} token - JWT token bị thu hồi
   * @param {Date} expiryDate - Thời gian hết hạn của token
   * @param {number|string} [userId] - ID người dùng
   * @returns {Promise<boolean>} - Kết quả lưu
   */
  async saveRevokedToken(token, expiryDate, userId = null) {
    try {
      const query = `
        INSERT INTO revoked_tokens (token, user_id, expiry_date, revoked_at)
        VALUES (@token, @userId, @expiryDate, GETDATE())
      `;

      await dbService.executeQuery(query, {
        token,
        userId,
        expiryDate
      });

      return true;
    } catch (error) {
      console.error('Error saving revoked token:', error);
      return false;
    }
  }

  /**
   * Kiểm tra token có bị thu hồi không
   * @param {string} token - JWT token
   * @returns {Promise<boolean>} - true nếu token đã bị thu hồi
   */
  async isTokenRevoked(token) {
    try {
      const query = `
        SELECT 1 FROM revoked_tokens
        WHERE token = @token
      `;

      const result = await dbService.executeQuery(query, { token });
      
      return result && result.recordset && result.recordset.length > 0;
    } catch (error) {
      console.error('Error checking if token is revoked:', error);
      return false; // Mặc định coi như token chưa bị thu hồi
    }
  }

  /**
   * Dọn dẹp refresh tokens hết hạn
   * @returns {Promise<number>} - Số lượng record đã xóa
   */
  async cleanupExpiredRefreshTokens() {
    try {
      const query = `
        DELETE FROM refresh_tokens
        WHERE expiry_date < GETDATE()
      `;

      const result = await dbService.executeQuery(query);
      
      if (result && result.rowsAffected) {
        return result.rowsAffected[0];
      }

      return 0;
    } catch (error) {
      console.error('Error cleaning up expired refresh tokens:', error);
      return 0;
    }
  }

  /**
   * Dọn dẹp token đã thu hồi và hết hạn
   * @returns {Promise<number>} - Số lượng record đã xóa
   */
  async cleanupExpiredRevokedTokens() {
    try {
      const query = `
        DELETE FROM revoked_tokens
        WHERE expiry_date < GETDATE()
      `;

      const result = await dbService.executeQuery(query);
      
      if (result && result.rowsAffected) {
        return result.rowsAffected[0];
      }

      return 0;
    } catch (error) {
      console.error('Error cleaning up expired revoked tokens:', error);
      return 0;
    }
  }

  /**
   * Lưu hoạt động xác thực vào database
   * @param {Object} logEntry - Thông tin log
   * @returns {Promise<boolean>} - Kết quả lưu
   */
  async saveAuthActivity(logEntry) {
    try {
      const query = `
        INSERT INTO auth_logs (user_id, username, action, success, details, ip_address, user_agent, created_at)
        VALUES (@userId, @username, @action, @success, @details, @ipAddress, @userAgent, GETDATE())
      `;

      await dbService.executeQuery(query, {
        userId: logEntry.userId,
        username: logEntry.username || '',
        action: logEntry.action || '',
        success: logEntry.success ? 1 : 0,
        details: logEntry.details || '',
        ipAddress: logEntry.ip || '',
        userAgent: logEntry.userAgent || ''
      });

      return true;
    } catch (error) {
      console.error('Error saving auth activity log:', error);
      return false;
    }
  }

  /**
   * Lấy lịch sử hoạt động xác thực của người dùng
   * @param {number|string} userId - ID người dùng
   * @param {number} limit - Giới hạn số lượng bản ghi
   * @returns {Promise<Array>} - Danh sách hoạt động
   */
  async getUserAuthActivity(userId, limit = 50) {
    try {
      const query = `
        SELECT TOP ${limit}
          id, user_id, username, action, success, 
          details, ip_address, user_agent, created_at
        FROM auth_logs
        WHERE user_id = @userId
        ORDER BY created_at DESC
      `;

      const result = await dbService.executeQuery(query, { userId });
      
      if (result && result.recordset) {
        return result.recordset;
      }

      return [];
    } catch (error) {
      console.error('Error getting user auth activity:', error);
      return [];
    }
  }
}

// Export singleton instance
export default new TokenRepository();
