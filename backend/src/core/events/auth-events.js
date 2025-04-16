/**
 * Auth Events Module
 * Quản lý sự kiện liên quan đến xác thực và phân quyền
 */

import { EventEmitter } from 'events';

// Tạo một instance của EventEmitter
class AuthEventEmitter extends EventEmitter {
  constructor() {
    super();
    this._setupLogging();
  }
  
  /**
   * Thiết lập logging cho các sự kiện quan trọng
   * @private
   */
  _setupLogging() {
    // Log các sự kiện quan trọng
    this.on('user:login', ({ userId }) => {
      console.log(`[AuthEvent] User logged in: ${userId}`);
    });
    
    this.on('user:logout', ({ userId }) => {
      console.log(`[AuthEvent] User logged out: ${userId}`);
    });
    
    this.on('user:logout_all', ({ userId, sessionCount }) => {
      console.log(`[AuthEvent] User logged out from all devices: ${userId}, sessions: ${sessionCount}`);
    });
    
    this.on('user:register', ({ userId }) => {
      console.log(`[AuthEvent] New user registered: ${userId}`);
    });
    
    this.on('user:password_change', ({ userId }) => {
      console.log(`[AuthEvent] User changed password: ${userId}`);
    });
    
    this.on('user:password_reset_request', ({ userId, email }) => {
      console.log(`[AuthEvent] Password reset requested for: ${email || userId}`);
    });
    
    this.on('user:password_reset_complete', ({ userId }) => {
      console.log(`[AuthEvent] Password reset completed for: ${userId}`);
    });
  }
}

// Export một instance duy nhất của AuthEventEmitter
export default new AuthEventEmitter();
