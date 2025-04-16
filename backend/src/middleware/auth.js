/**
 * Authentication Middleware
 * Middleware for JWT authentication and authorization
 */

import authService from '../core/services/auth.service.js';
import tokenService from '../core/services/token.service.js';
import authorizationService from '../core/services/authorization.service.js';
import authenticationService from '../core/services/authentication.service.js';
import authEventEmitter from '../core/events/auth-events.js';

/**
 * Authentication middleware to verify JWT tokens
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const authenticate = async (req, res, next) => {
  try {
    // Lấy token từ header
    const authHeader = req.headers.authorization || '';
    const token = tokenService.extractTokenFromHeader(authHeader);
    
    console.log(`Authentication middleware received token: ${token ? token.substring(0, 15) + '...' : 'undefined'}`);
    console.log(`Auth header: ${authHeader ? authHeader.substring(0, 20) + '...' : 'undefined'}`);
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token is missing or invalid'
      });
    }
    
    // Kiểm tra token đã bị thu hồi chưa
    if (await tokenService.isTokenRevoked(token)) {
      console.log('Token has been revoked, rejecting request');
      return res.status(401).json({
        success: false,
        message: 'Authentication token has been revoked'
      });
    }
      // Kiểm tra token đã hết hạn chưa
    if (tokenService.isTokenExpired(token)) {
      console.log('Token has expired, rejecting request');
      return res.status(401).json({
        success: false,
        message: 'Authentication token has expired'
      });
    }
    
    try {
      // Xác thực token và lấy thông tin người dùng
      const user = await authenticationService.verify(token);
      
      console.log('Authenticated user:', JSON.stringify({
        id: user.id, 
        user_id: user.user_id, 
        username: user.username,
        role: user.role
      }));
      
      // Ensure user_id is available (for backward compatibility)
      if (!user.user_id && user.id) {
        user.user_id = user.id;
      }
      
      // Gắn thông tin user vào request
      req.user = user;
      req.token = token;
      
      // Thu thập metadata cho log (IP, user agent)
      const requestMetadata = {
        ip: req.ip,
        userAgent: req.headers['user-agent'],
        path: req.path
      };
      
      // Phát sự kiện truy cập thành công
      authEventEmitter.emit('auth:access', { 
        userId: user.id,
        username: user.username,
        ...requestMetadata
      });
      
      // Tiếp tục đến middleware hoặc route handler tiếp theo
      next();    } catch (error) {
      console.error('Authentication verification error:', error);
      return res.status(401).json({
        success: false,
        message: error.message || 'Invalid authentication token'
      });
    }
  } catch (error) {
    console.error('Authentication middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication error',
      error: error.message
    });
  }
};

/**
 * Middleware phân quyền theo vai trò
 * @param {string|Array<string>} roles - Vai trò cần thiết để truy cập route
 * @returns {Function} - Express middleware
 */
export const authorize = (roles) => {
  return async (req, res, next) => {
    // Đảm bảo middleware authenticate đã chạy trước đó
    if (!req.user) {
      console.error('Authorization middleware used without authentication');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error: authentication required before authorization'
      });
    }
    
    try {
      // Log detailed user info for debugging
      console.log(`Authorization check for user:`, JSON.stringify({
        id: req.user.id,
        user_id: req.user.user_id,
        role: req.user.role
      }));
      console.log(`Required roles:`, roles);
      
      // Kiểm tra vai trò người dùng - passing the user ID correctly
      // This is key - use either user_id or id, whichever is available
      const userId = req.user.user_id || req.user.id;
      const hasAccess = await authorizationService.hasRole(userId, roles);
      
      console.log(`Authorization result:`, hasAccess);
      
      if (!hasAccess) {
        // Log hoạt động truy cập bị từ chối
        authorizationService.logAuthorizationActivity(
          userId,
          'access_denied',
          req.path,
          false,
          `Required roles: ${Array.isArray(roles) ? roles.join(', ') : roles}`
        );
        
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to access this resource'
        });
      }
      
      // Log hoạt động truy cập được phép
      authorizationService.logAuthorizationActivity(
        userId,
        'access_granted',
        req.path,
        true
      );
      
      // Tiếp tục đến middleware hoặc route handler tiếp theo
      next();
    } catch (error) {
      console.error('Authorization error:', error);
      return res.status(500).json({
        success: false,
        message: 'Authorization error',
        error: error.message
      });
    }
  };
};

/**
 * Middleware xác thực tùy chọn
 * Xác thực người dùng nếu có token nhưng không bắt buộc
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const optionalAuth = async (req, res, next) => {
  try {
    // Lấy token từ header
    const authHeader = req.headers.authorization || '';
    const token = tokenService.extractTokenFromHeader(authHeader);
    
    if (!token) {
      // Không có token, tiếp tục mà không xác thực
      return next();
    }
    
    // Kiểm tra token đã bị thu hồi hoặc hết hạn
    if (await tokenService.isTokenRevoked(token) || tokenService.isTokenExpired(token)) {
      // Token không hợp lệ, tiếp tục mà không xác thực
      return next();
    }
    
    try {
      // Xác thực token và lấy thông tin người dùng
      const user = await authenticationService.verify(token);
      
      // Gắn thông tin user vào request
      req.user = user;
      req.token = token;
    } catch (error) {
      // Lỗi xác thực, bỏ qua và tiếp tục
      console.warn('Optional auth: Invalid token', error.message);
    }
    
    // Tiếp tục đến middleware hoặc route handler tiếp theo
    next();
  } catch (error) {
    // Log error but continue without user
    console.error('Error in optional authentication:', error);
    next();
  }
};