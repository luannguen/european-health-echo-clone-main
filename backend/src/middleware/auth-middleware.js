/**
 * Auth Middleware Module
 * Middleware cho xác thực và phân quyền trong Express
 */

import tokenService from '../services/token.service.js';
import authenticationService from '../services/authentication.service.js';
import authorizationService from '../services/authorization.service.js';
import authEventEmitter from '../events/auth-events.js';

/**
 * Middleware xác thực người dùng
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
export const authenticate = async (req, res, next) => {
  try {
    // Lấy token từ header
    const authHeader = req.headers.authorization || '';
    const token = tokenService.extractTokenFromHeader(authHeader);
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token is missing or invalid'
      });
    }
    
    // Kiểm tra token đã bị thu hồi chưa
    if (tokenService.isTokenRevoked(token)) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token has been revoked'
      });
    }
    
    // Kiểm tra token đã hết hạn chưa
    if (tokenService.isTokenExpired(token)) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token has expired'
      });
    }
    
    try {
      // Xác thực token và lấy thông tin người dùng
      const user = await authenticationService.verify(token);
      
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
      
      next();
    } catch (error) {
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
      // Kiểm tra vai trò người dùng
      const hasAccess = await authorizationService.hasRole(req.user, roles);
      
      if (!hasAccess) {
        // Log hoạt động truy cập bị từ chối
        authorizationService.logAuthorizationActivity(
          req.user.id,
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
        req.user.id,
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
 * Middleware kiểm tra quyền sở hữu tài nguyên
 * @param {Function} resourceGetter - Hàm lấy tài nguyên từ request
 * @param {string} [ownerField] - Tên trường chứa ID chủ sở hữu
 * @returns {Function} - Express middleware
 */
export const checkOwnership = (resourceGetter, ownerField = 'user_id') => {
  return async (req, res, next) => {
    // Đảm bảo middleware authenticate đã chạy trước đó
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    try {
      // Lấy tài nguyên từ request
      const resource = await resourceGetter(req);
      
      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found'
        });
      }
      
      // Kiểm tra quyền sở hữu
      const isOwner = await authorizationService.isOwner(req.user, resource, ownerField);
      
      if (!isOwner) {
        // Log hoạt động truy cập bị từ chối
        authorizationService.logAuthorizationActivity(
          req.user.id,
          'ownership_check_failed',
          req.path,
          false,
          `Resource ID: ${resource.id}`
        );
        
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to access this resource'
        });
      }
      
      // Log hoạt động truy cập được phép
      authorizationService.logAuthorizationActivity(
        req.user.id,
        'ownership_check_passed',
        req.path,
        true,
        `Resource ID: ${resource.id}`
      );
      
      // Gắn tài nguyên vào request để route handler có thể sử dụng
      req.resource = resource;
      
      // Tiếp tục đến middleware hoặc route handler tiếp theo
      next();
    } catch (error) {
      console.error('Ownership check error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error during ownership check',
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
    if (tokenService.isTokenRevoked(token) || tokenService.isTokenExpired(token)) {
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
    
    // Luôn tiếp tục đến middleware hoặc route handler tiếp theo
    next();
  } catch (error) {
    // Lỗi xử lý, bỏ qua và tiếp tục
    console.error('Optional auth middleware error:', error);
    next();
  }
};

/**
 * Middleware cho các route yêu cầu admin hoặc chủ sở hữu
 * @param {Function} [resourceGetter] - Hàm tùy chọn để lấy tài nguyên cho kiểm tra quyền sở hữu
 * @param {string} [ownerField] - Tên trường chứa ID chủ sở hữu
 * @returns {Function} - Express middleware
 */
export const authorizeAdminOrOwner = (resourceGetter, ownerField = 'user_id') => {
  return async (req, res, next) => {
    // Đảm bảo middleware authenticate đã chạy trước đó
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    try {
      // Kiểm tra người dùng có phải là admin
      const isAdmin = await authorizationService.isAdmin(req.user);
      
      // Nếu là admin, cho phép truy cập
      if (isAdmin) {
        // Log hoạt động truy cập admin
        authorizationService.logAuthorizationActivity(
          req.user.id,
          'admin_access',
          req.path,
          true
        );
        
        return next();
      }
      
      // Nếu không phải admin và không có hàm lấy tài nguyên
      if (!resourceGetter) {
        // Log từ chối truy cập
        authorizationService.logAuthorizationActivity(
          req.user.id,
          'admin_required',
          req.path,
          false
        );
        
        return res.status(403).json({
          success: false,
          message: 'Administrator permission required'
        });
      }
      
      // Lấy tài nguyên để kiểm tra quyền sở hữu
      const resource = await resourceGetter(req);
      
      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found'
        });
      }
      
      // Kiểm tra quyền sở hữu
      const isOwner = await authorizationService.isOwner(req.user, resource, ownerField);
      
      if (!isOwner) {
        // Log từ chối truy cập
        authorizationService.logAuthorizationActivity(
          req.user.id,
          'ownership_required',
          req.path,
          false,
          `Not admin and not owner of resource ID: ${resource.id}`
        );
        
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to access this resource'
        });
      }
      
      // Log cho phép truy cập dựa trên quyền sở hữu
      authorizationService.logAuthorizationActivity(
        req.user.id,
        'owner_access',
        req.path,
        true,
        `Resource ID: ${resource.id}`
      );
      
      // Gắn tài nguyên vào request
      req.resource = resource;
      
      next();
    } catch (error) {
      console.error('Admin/Owner authorization error:', error);
      return res.status(500).json({
        success: false,
        message: 'Authorization error',
        error: error.message
      });
    }
  };
};
