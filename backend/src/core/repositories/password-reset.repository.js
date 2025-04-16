/**
 * Password Reset Repository
 * Repository để lưu trữ và quản lý password reset tokens trong database
 */

import BaseRepository from './base.repository.js';

/**
 * PasswordResetRepository xử lý các thao tác cơ sở dữ liệu liên quan đến tokens đặt lại mật khẩu
 * Kế thừa từ BaseRepository để sử dụng các thao tác CRUD cơ bản
 */
class PasswordResetRepository extends BaseRepository {
  constructor() {
    // Chỉ định tên bảng và cột khóa chính
    super('password_reset_tokens', 'id');
  }

  /**
   * Tạo một token đặt lại mật khẩu mới
   * @param {number} userId - ID của người dùng
   * @param {string} token - Token hiển thị (giả, không phải token thực tế)
   * @param {string} tokenHash - Token hash thực tế để lưu trữ
   * @param {Date} expiresAt - Thời gian hết hạn
   * @returns {Promise<Object>} - Token được tạo
   */
  async createToken(userId, token, tokenHash, expiresAt) {
    // Xóa các token cũ của người dùng này trước
    await this.deleteByUserId(userId);
    
    // Tạo token mới
    return await this.create({
      user_id: userId,
      token: token, // Thường là 'token_exists' cho bảo mật
      token_hash: tokenHash,
      expires_at: expiresAt,
      created_at: new Date(),
      used: 0
    });
  }

  /**
   * Tìm token theo token hash
   * @param {string} tokenHash - Hash của token cần tìm
   * @returns {Promise<Object|null>} - Thông tin token hoặc null nếu không tìm thấy
   */
  async findByTokenHash(tokenHash) {
    const query = `
      SELECT t.id, t.user_id, t.expires_at, t.used,
             u.username, u.email
      FROM ${this.tableName} t
      JOIN users u ON t.user_id = u.id
      WHERE t.token_hash = @tokenHash AND t.used = 0
    `;
    
    const result = await this.db.executeQuery(query, { tokenHash });
    return result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;
  }

  /**
   * Tìm token mới nhất cho người dùng theo email
   * @param {string} email - Email của người dùng
   * @returns {Promise<Object|null>} - Thông tin token hoặc null nếu không tìm thấy
   */
  async findLatestByEmail(email) {
    const query = `
      SELECT t.id, t.user_id, t.token_hash, t.expires_at, t.created_at, t.used
      FROM ${this.tableName} t
      JOIN users u ON t.user_id = u.id
      WHERE u.email = @email AND t.used = 0 AND t.expires_at > GETDATE()
      ORDER BY t.created_at DESC
    `;
    
    const result = await this.db.executeQuery(query, { email });
    return result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;
  }

  /**
   * Tìm token mới nhất cho người dùng theo ID
   * @param {number} userId - ID của người dùng
   * @returns {Promise<Object|null>} - Thông tin token hoặc null nếu không tìm thấy
   */
  async findLatestByUserId(userId) {
    return await this.findOneWhere({ user_id: userId, used: 0 }, { orderBy: 'created_at', orderDir: 'DESC' });
  }

  /**
   * Đánh dấu token đã được sử dụng
   * @param {number} tokenId - ID của token
   * @returns {Promise<boolean>} - Kết quả cập nhật
   */
  async markAsUsed(tokenId) {
    try {
      await this.update(tokenId, { used: 1 });
      return true;
    } catch (error) {
      console.error('Error marking token as used:', error);
      return false;
    }
  }

  /**
   * Xóa tất cả token của một người dùng
   * @param {number} userId - ID của người dùng
   * @returns {Promise<number>} - Số lượng token đã xóa
   */
  async deleteByUserId(userId) {
    const query = `
      DELETE FROM ${this.tableName}
      WHERE user_id = @userId
    `;
    
    const result = await this.db.executeQuery(query, { userId });
    return result.rowsAffected[0] || 0;
  }

  /**
   * Xóa các token đã hết hạn hoặc đã sử dụng
   * @returns {Promise<number>} - Số lượng token đã xóa
   */
  async cleanupExpiredTokens() {
    const query = `
      DELETE FROM ${this.tableName}
      WHERE expires_at < GETDATE() OR used = 1
    `;
    
    const result = await this.db.executeQuery(query);
    return result.rowsAffected[0] || 0;
  }

  /**
   * Tìm kiếm id của người dùng theo email
   * @param {string} email - Email của người dùng
   * @returns {Promise<number|null>} - ID của người dùng hoặc null nếu không tìm thấy
   */
  async findUserIdByEmail(email) {
    const query = `
      SELECT id FROM users
      WHERE email = @email AND is_active = 1
    `;
    
    const result = await this.db.executeQuery(query, { email });
    return result.recordset && result.recordset.length > 0 ? result.recordset[0].id : null;
  }

  /**
   * Tìm kiếm thông tin cơ bản của người dùng theo email
   * @param {string} email - Email của người dùng
   * @returns {Promise<Object|null>} - Thông tin người dùng hoặc null nếu không tìm thấy
   */
  async findUserByEmail(email) {
    const query = `
      SELECT id, username, email 
      FROM users
      WHERE email = @email AND is_active = 1
    `;
    
    const result = await this.db.executeQuery(query, { email });
    return result.recordset && result.recordset.length > 0 ? result.recordset[0] : null;
  }
}

// Tạo và xuất instance singleton
const passwordResetRepository = new PasswordResetRepository();
export default passwordResetRepository;
