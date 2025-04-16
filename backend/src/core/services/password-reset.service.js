/**
 * Password Reset Service
 * Handles business logic for password reset operations
 */

import crypto from 'crypto';
import bcrypt from 'bcrypt';
import config from '../../config.js';
import testBotService from './test-bot.service.js';
import passwordResetRepository from '../repositories/password-reset.repository.js';

/**
 * PasswordResetService encapsulates all business logic related to password resets
 */
class PasswordResetService {
  constructor() {
    this.repository = passwordResetRepository;
    this.tokenExpiryHours = 24; // Token valid for 24 hours
  }
  /**
   * Create a reset token for a user
   * @param {string} email - User's email
   * @returns {Promise<Object>} - Reset token info or error
   */
  async createResetToken(email) {
    try {
      // Tìm người dùng bằng email sử dụng repository
      const user = await this.repository.findUserByEmail(email);
      
      if (!user) {
        return { success: false, message: 'No active account found with this email' };
      }

      // Tạo token ngẫu nhiên an toàn
      const token = crypto.randomBytes(32).toString('hex');
      // Hash token để lưu trữ trong database (bảo mật)
      const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
      
      // Tính toán thời gian hết hạn
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + this.tokenExpiryHours);
      
      // Tạo token trong database thông qua repository
      await this.repository.createToken(user.id, 'token_exists', tokenHash, expiresAt);
        // Lưu token thực tế trong dịch vụ bot test để có thể truy xuất sau này
      testBotService.savePasswordResetToken(email, token, expiresAt);
      
      // Gửi email giả lập với token thông qua dịch vụ bot test
      testBotService.sendPasswordResetEmail({
        email: user.email,
        username: user.username,
        token: token,
        expiryHours: this.tokenExpiryHours
      });
      
      // Trả về thông tin cần thiết để gửi email
      return {
        success: true,
        data: {
          userId: user.id,
          username: user.username,
          email: user.email,
          token,
          expiresAt
        }
      };
    } catch (error) {
      console.error('Error creating password reset token:', error);
      return {
        success: false,
        message: 'Failed to create password reset token',
        error: error.message
      };
    }
  }
  
  /**
   * Validate a reset token
   * @param {string} token - The token to validate
   * @returns {Promise<Object>} - Validation result
   */
  async validateToken(token) {
    try {
      // Hash the token for lookup
      const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
      
      // Find token in database
      const result = await this.db.executeQuery(
        `SELECT t.id, t.user_id, t.expires_at, t.used,
                u.username, u.email
         FROM password_reset_tokens t
         JOIN users u ON t.user_id = u.id
         WHERE t.token_hash = @tokenHash AND t.used = 0`,
        { tokenHash }
      );
      
      if (!result.recordset || result.recordset.length === 0) {
        return { success: false, message: 'Invalid or expired reset token' };
      }
      
      const tokenInfo = result.recordset[0];
      
      // Check if token is expired
      if (new Date() > new Date(tokenInfo.expires_at)) {
        return { success: false, message: 'Reset token has expired' };
      }
      
      return {
        success: true,
        data: {
          tokenId: tokenInfo.id,
          userId: tokenInfo.user_id,
          username: tokenInfo.username,
          email: tokenInfo.email
        }
      };
    } catch (error) {
      console.error('Error validating reset token:', error);
      return {
        success: false,
        message: 'Failed to validate token',
        error: error.message
      };
    }
  }
  
  /**
   * Reset user password using token
   * @param {string} token - The reset token
   * @param {string} newPassword - The new password
   * @returns {Promise<Object>} - Reset result
   */
  async resetPassword(token, newPassword) {
    try {
      // First validate the token
      const validationResult = await this.validateToken(token);
      
      if (!validationResult.success) {
        return validationResult; // Return validation error
      }
      
      const { userId, tokenId } = validationResult.data;
      
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Update the user's password
      await this.db.executeQuery(
        'UPDATE users SET password = @password, updated_at = GETDATE() WHERE id = @userId',
        {
          userId,
          password: hashedPassword
        }
      );
      
      // Mark token as used
      await this.db.executeQuery(
        'UPDATE password_reset_tokens SET used = 1 WHERE id = @tokenId',
        { tokenId }
      );
      
      return {
        success: true,
        message: 'Password has been reset successfully'
      };
    } catch (error) {
      console.error('Error resetting password:', error);
      return {
        success: false,
        message: 'Failed to reset password',
        error: error.message
      };
    }
  }
  
  /**
   * Clean up expired tokens
   * @returns {Promise<number>} - Number of tokens deleted
   */
  async cleanupExpiredTokens() {
    try {
      const result = await this.db.executeQuery(
        'DELETE FROM password_reset_tokens WHERE expires_at < GETDATE() OR used = 1'
      );
      
      return result.rowsAffected[0] || 0;
    } catch (error) {
      console.error('Error cleaning up expired tokens:', error);
      throw error;
    }
  }
  /**
   * Delete all tokens for a specific user
   * @param {number} userId - The user ID
   * @returns {Promise<number>} - Number of tokens deleted
   */
  async deleteTokensByUserId(userId) {
    try {
      const result = await this.db.executeQuery(
        'DELETE FROM password_reset_tokens WHERE user_id = @userId',
        { userId }
      );
      
      return result.rowsAffected[0] || 0;
    } catch (error) {
      console.error(`Error deleting tokens for user ${userId}:`, error);
      throw error;
    }
  }
    /**
   * Get the most recent reset token for a user by email
   * For testing/debugging purposes only
   * @param {string} email - The user's email
   * @returns {Promise<Object|null>} - Token data or null if not found
   */
  async getTokenByEmail(email) {
    try {
      // Find user ID from email
      const userResult = await this.db.executeQuery(
        'SELECT id FROM users WHERE email = @email',
        { email }
      );
      
      if (!userResult.recordset || userResult.recordset.length === 0) {
        return null;
      }
      
      const userId = userResult.recordset[0].id;
      
      // Get the most recent unused token for this user from database
      const result = await this.db.executeQuery(
        `SELECT id, user_id, token_hash, expires_at, created_at, used
         FROM password_reset_tokens 
         WHERE user_id = @userId AND used = 0 AND expires_at > GETDATE()
         ORDER BY created_at DESC`,
        { userId }
      );
      
      if (!result.recordset || result.recordset.length === 0) {
        return null;
      }
        // Lấy token thực tế từ dịch vụ bot test
      const botTokenInfo = testBotService.getPasswordResetToken(email);
      
      if (!botTokenInfo) {
        console.error(`Không tìm thấy token cho email ${email} trong dịch vụ bot test`);
        return {
          ...result.recordset[0],
          token: null // Trường hợp không tìm thấy token trong dịch vụ bot test
        };
      }
      
      // Trả về thông tin token từ cơ sở dữ liệu kèm theo token thực tế từ dịch vụ bot test
      return {
        ...result.recordset[0],
        token: mockTokenInfo.token
      };
    } catch (error) {
      console.error('Error retrieving token by email:', error);
      return null;
    }
  }
}

// Create and export a singleton instance
const passwordResetService = new PasswordResetService();
export default passwordResetService;