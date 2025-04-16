/**
 * TestBotService.js
 * Service để hỗ trợ testing và debugging trong môi trường development
 * - Lưu trữ token reset password
 * - Mô phỏng gửi email
 * - Theo dõi hoạt động xác thực
 */

class TestBotService {
  constructor() {
    this.resetTokens = new Map(); // Map để lưu trữ tokens - email -> {token, expiresAt}
    this.emailLog = [];           // Log các email "gửi đi"
    this.authLogs = [];           // Log các hoạt động xác thực
    this.maxLogSize = 100;       // Giới hạn kích thước log
    this.config = {};            // Cấu hình cho TestBotService
    this.userSessions = new Map(); // Lưu trữ phiên đăng nhập của người dùng
  }

  /**
   * Cập nhật cấu hình cho TestBotService
   * @param {Object} config - Cấu hình mới
   * @returns {TestBotService} - Instance của TestBotService (this)
   */
  updateConfig(config) {
    this.config = {...this.config, ...config};
    return this;
  }

  /**
   * Tạo một phiên đăng nhập mới cho người dùng
   * @param {number} userId - ID của người dùng
   * @param {string} username - Tên đăng nhập
   * @param {string} role - Vai trò của người dùng
   * @returns {Object} - Thông tin phiên đăng nhập
   */
  createUserSession(userId, username, role = 'user') {
    const session = {
      id: `sess_${Date.now()}_${userId}`,
      userId,
      username,
      role,
      createdAt: new Date(),
      lastActivity: new Date()
    };
    
    this.userSessions.set(userId, session);
    this.logActivity('create_session', { userId, username, role });
    return session;
  }

  /**
   * Xóa phiên đăng nhập của một người dùng
   * @param {number} userId - ID của người dùng
   */
  clearUserSession(userId) {
    if (this.userSessions.has(userId)) {
      this.userSessions.delete(userId);
      this.logActivity('clear_session', { userId });
    }
  }

  /**
   * Xóa tất cả phiên đăng nhập
   */
  clearUserSessions() {
    this.userSessions.clear();
    this.logActivity('clear_all_sessions', {});
  }

  /**
   * Lưu token đặt lại mật khẩu
   * @param {string} email - Email người dùng
   * @param {string} token - Token đặt lại mật khẩu
   * @param {Date} expiresAt - Thời điểm hết hạn
   */
  savePasswordResetToken(email, token, expiresAt) {
    console.log(`[TestBot] Saving password reset token for ${email}: ${token.substring(0, 10)}...`);
    
    this.resetTokens.set(email, {
      token,
      expiresAt,
      createdAt: new Date()
    });
    
    // Ghi log hoạt động
    this.logActivity('save_token', { email, tokenPrefix: token.substring(0, 8) });
  }

  /**
   * Lấy token đặt lại mật khẩu theo email
   * @param {string} email - Email người dùng
   * @returns {Object|null} - Thông tin token hoặc null nếu không tìm thấy
   */
  getPasswordResetToken(email) {
    const tokenInfo = this.resetTokens.get(email);
    
    if (!tokenInfo) {
      return null;
    }
    
    // Kiểm tra token có hết hạn không
    if (new Date() > tokenInfo.expiresAt) {
      // Token hết hạn, xóa khỏi bộ nhớ
      this.resetTokens.delete(email);
      return null;
    }
    
    return tokenInfo;
  }

  /**
   * Giả lập gửi email đặt lại mật khẩu
   * @param {Object} emailData - Dữ liệu email
   */
  sendPasswordResetEmail(emailData) {
    console.log(`[TestBot] Simulating sending password reset email to ${emailData.email}`);
    
    const emailRecord = {
      to: emailData.email,
      subject: 'Password Reset',
      template: 'password-reset',
      data: {
        username: emailData.username || emailData.email.split('@')[0],
        resetToken: emailData.token,
        resetLink: `http://localhost:3000/reset-password?token=${emailData.token}`,
        expiryHours: emailData.expiryHours || 1
      },
      sentAt: new Date()
    };
    
    // Thêm vào log email
    this.emailLog.unshift(emailRecord);
    
    // Giới hạn kích thước log
    if (this.emailLog.length > this.maxLogSize) {
      this.emailLog = this.emailLog.slice(0, this.maxLogSize);
    }
    
    // Ghi log hoạt động
    this.logActivity('send_email', { email: emailData.email, template: 'password-reset' });
    
    return emailRecord;
  }

  /**
   * Lấy danh sách email đã "gửi"
   * @param {number} limit - Số lượng tối đa
   * @returns {Array} - Danh sách email
   */
  getEmailLog(limit = 10) {
    return this.emailLog.slice(0, limit);
  }

  /**
   * Ghi log hoạt động
   * @private
   * @param {string} action - Hành động
   * @param {Object} data - Dữ liệu bổ sung
   */
  logActivity(action, data) {
    const logEntry = {
      action,
      timestamp: new Date(),
      ...data
    };
    
    this.authLogs.unshift(logEntry);
    
    // Giới hạn kích thước log
    if (this.authLogs.length > this.maxLogSize) {
      this.authLogs = this.authLogs.slice(0, this.maxLogSize);
    }
  }

  /**
   * Lấy log hoạt động
   * @param {number} limit - Số lượng tối đa
   * @returns {Array} - Danh sách hoạt động
   */
  getActivityLog(limit = 20) {
    return this.authLogs.slice(0, limit);
  }

  /**
   * Xóa tất cả dữ liệu test
   */
  clearAllData() {
    this.resetTokens.clear();
    this.emailLog = [];
    this.authLogs = [];
    console.log('[TestBot] All test data cleared');
  }
}

// Tạo và export singleton instance
export default new TestBotService();
